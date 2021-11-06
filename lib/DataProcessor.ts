import {
  addDays,
  addWeeks,
  compareAsc,
  differenceInDays,
  getWeek,
  getWeekYear,
  isSameDay,
} from 'date-fns';
import mem from 'mem';
import {GraphAccuracy} from './Types/GraphAccuracy';
import HistoryItem from './Types/HistoryItem';

const memorize = (fun: any) =>
  mem(fun, {
    cacheKey: (arguments_) => JSON.stringify(arguments_),
  });

function getDayYearAndMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function getYearAndWeek(date: Date) {
  return addWeeks(new Date(getWeekYear(date), 0, 0), getWeek(date) - 1);
}

function getYearAndMonth(date: Date) {
  return new Date(date.getUTCFullYear(), date.getUTCMonth() + 1, 0);
}

export default class DataProcessor {
  constructor(private streamingHistory: HistoryItem[]) { }

  getTotalTracksPlayed = memorize((artistFilter: string[], trackFilter: string[]) => {
    if (!artistFilter && !trackFilter) return this.streamingHistory.length;

    return this.streamingHistory.reduce((sum, { trackName, artistName }) => {
      if (artistFilter.length !== 0 && !artistFilter.includes(artistName))
        return sum;
      if (trackFilter.length !== 0 && !trackFilter.includes(trackName))
        return sum;
      return sum + 1;
    }, 0);
  });

  getTotalSkippedSongs = memorize((tolerance = 5_000) => {
    return this.streamingHistory.filter(({ msPlayed }) => msPlayed < tolerance)
      .length;
  });

  getAverageSongPlaytime = memorize(() => {
    return this.getTotalPlaytime() / this.getTotalTracksPlayed();
  });

  getTotalPlaytime = memorize(() => {
    return this.streamingHistory.reduce(
      (acc, { msPlayed }) => acc + msPlayed,
      0
    );
  });

  getTopArtists = memorize((max = 10) => {
    return this.getAllArtistsPlaytime()
      .slice(0, max)
      .map(({ artistName, msPlayed }) => ({
        artistName,
        hoursPlayed: msPlayed / 1000 / 60 / 60,
      }));
  });

  getAllArtistsPlaytime = memorize(() => {
    const artistMap = new Map();

    this.streamingHistory.forEach(({ artistName, msPlayed }) => {
      const current = artistMap.get(artistName);
      artistMap.set(
        artistName,
        typeof current === 'undefined' ? msPlayed : current + msPlayed
      );
    });

    return Array.from(artistMap, ([artistName, msPlayed]) => ({
      artistName,
      msPlayed,
    })).sort((a, b) => b.msPlayed - a.msPlayed);
  });

  getTopTracks = memorize((max = 10) => {
    return this.getAllTracksByPlaytime()
      .slice(0, max)
      .map(({ trackName, msPlayed, artistName }) => ({
        trackName,
        hoursPlayed: msPlayed / 1000 / 60 / 60,
        artistName,
      }));
  });

  getAllTracksByPlaytime = memorize(() => {
    const songMap = new Map();

    this.streamingHistory.forEach(({ trackName, msPlayed, artistName }) => {
      const value = songMap.get(trackName) || { artistName, msPlayed: 0 };
      value.msPlayed += msPlayed;
      songMap.set(trackName, value);
    });

    return Array.from(songMap, ([trackName, { msPlayed, artistName }]) => ({
      trackName,
      msPlayed,
      artistName,
    })).sort((a, b) => b.msPlayed - a.msPlayed);
  });

  getMinAndMaxDate = memorize(() => {
    let minDate: Date, maxDate: Date;
    this.streamingHistory.forEach(({ endTime }) => {
      const endDate = new Date(endTime);

      if (!minDate || compareAsc(endDate, minDate) < 0) minDate = endDate;
      if (!maxDate || compareAsc(endDate, maxDate) > 0) maxDate = endDate;
    });
    return [minDate, maxDate];
  });

  getMinDate = memorize(() => {
    return this.getMinAndMaxDate()[0];
  });

  getMaxDate = memorize(() => {
    return this.getMinAndMaxDate()[1];
  });

  getTotalDays = memorize(() => {
    return differenceInDays(this.getMaxDate(), this.getMinDate()) + 1;
  });

  getPlaytimeOverYear = memorize(
    (artistFilter = [], trackFilter = [], accuracy: GraphAccuracy = 'weeks') => {
      const playtimeOverYear = this._getPlaytimePerDayOverYear(
        artistFilter,
        trackFilter
      );
      return this.convertToTimeRange(playtimeOverYear, accuracy);
    }
  );

  _getPlaytimePerDayOverYear = memorize((artistFilter: string[], trackFilter: string[]) => {
    const dailyActivity = new Map();
    const minDate = this.getMinDate();
    const maxDate = this.getMaxDate();
    const maxLoopDate = addDays(maxDate, 1);

    let currentDate = getDayYearAndMonth(minDate);
    do {
      dailyActivity.set(String(currentDate), 0);
      currentDate = addDays(currentDate, 1);
    } while (!isSameDay(currentDate, maxLoopDate));

    this.streamingHistory.forEach(
      ({ msPlayed, endTime, trackName, artistName }) => {
        if (artistFilter.length !== 0 && !artistFilter.includes(artistName))
          return;
        if (trackFilter.length !== 0 && !trackFilter.includes(trackName))
          return;

        const endDate = String(getDayYearAndMonth(new Date(endTime)));

        const current = dailyActivity.get(endDate);
        dailyActivity.set(endDate, current + msPlayed);
      }
    );

    return Array.from(dailyActivity, ([date, msPlayed]) => ({
      date: new Date(date),
      hoursPlayed: msPlayed / 1000 / 60 / 60,
    }));
  });

  convertToTimeRange = (playtimeOverYear: any, accuracy: GraphAccuracy) => {
    if (accuracy === 'weeks') {
      const weeklyActivity = new Map();
      playtimeOverYear.forEach(({ date, hoursPlayed }) => {
        const weekDate = getYearAndWeek(date);
        const key = String(weekDate);
        const value = weeklyActivity.get(key) || 0;
        weeklyActivity.set(key, value + hoursPlayed);
      });
      return Array.from(weeklyActivity, ([date, hoursPlayed]) => ({
        date: new Date(date),
        hoursPlayed,
      }));
    } else if (accuracy === 'months') {
      const monthlyActivity = new Map();
      playtimeOverYear.forEach(({ date, hoursPlayed }) => {
        const monthDate = getYearAndMonth(date);
        const key = String(monthDate);
        const value = monthlyActivity.get(key) || 0;
        monthlyActivity.set(key, value + hoursPlayed);
      });
      return Array.from(monthlyActivity, ([date, hoursPlayed]) => ({
        date: new Date(date),
        hoursPlayed,
      }));
    }
    return playtimeOverYear;
  };

  getAveragePlaytimePerDay = memorize(() => {
    return this.getTotalPlaytime() / this.getTotalDays();
  });

  getTimeslots = memorize((filter = []) => {
    const timeslotsMap = new Map();
    for (let timeslot = 0; timeslot < 24; timeslot++) {
      timeslotsMap.set(timeslot, 0);
    }

    this.streamingHistory.forEach(({ msPlayed, endTime }) => {
      const currentDate = new Date(endTime);
      if (filter.length !== 0 && !filter.includes(currentDate.getDay())) return;
      const currentHour = currentDate.getHours();
      const playtimeInCurrentHour = timeslotsMap.get(currentHour);
      timeslotsMap.set(currentHour, playtimeInCurrentHour + msPlayed);
    });

    return Array.from(timeslotsMap, ([hour, msPlayed]) => ({
      hour,
      msPlayed,
    })).sort((a, b) => a.hour - b.hour);
  });

  getWeekdays = memorize(() => {
    const weekdaysMap = new Map();
    for (let weekday = 0; weekday < 7; weekday++) {
      weekdaysMap.set(weekday, 0);
    }

    this.streamingHistory.forEach(({ msPlayed, endTime }) => {
      const currentDay = new Date(endTime).getDay();
      const playtimeInCurrentDay = weekdaysMap.get(currentDay);
      weekdaysMap.set(currentDay, playtimeInCurrentDay + msPlayed);
    });

    return Array.from(weekdaysMap, ([weekday, msPlayed]) => ({
      weekday,
      msPlayed,
    })).sort((a, b) => a.weekday - b.weekday);
  });

  getAllTrackNames = memorize(() => {
    return this.getAllTracksByPlaytime().map(({ trackName }) => trackName);
  });

  getAllArtistNames = memorize(() => {
    return this.getAllArtistsPlaytime().map(({ artistName }) => artistName);
  });

  getMostSkippedSongs = memorize((limit = 10) => {
    return this.getSkippedSongs().slice(0, limit);
  });

  getSkippedSongs = memorize(() => {
    const songSkippedMap = this.streamingHistory.reduce(
      (map, { trackName, msPlayed, artistName }) => {
        const previous = map.get(trackName) || {
          artistName,
          timesPlayed: 0,
          timesSkipped: 0,
        };
        previous.timesPlayed += 1;
        previous.timesSkipped += msPlayed <= 5_000 ? 1 : 0;
        map.set(trackName, previous);
        return map;
      },
      new Map()
    );

    return Array.from(
      songSkippedMap,
      ([trackName, { timesPlayed, timesSkipped, artistName }]) => {
        return {
          trackName,
          timesPlayed,
          timesSkipped,
          artistName,
        };
      }
    ).sort((a, b) => b.timesSkipped - a.timesSkipped);
  });

  getLongestTrackInSeconds = memorize((artistFilter: string[], trackFilter: string[]) => {
    return this.streamingHistory.reduce(
      (max, { msPlayed, trackName, artistName }) => {
        if (artistFilter.length !== 0 && !artistFilter.includes(artistName))
          return max;
        if (trackFilter.length !== 0 && !trackFilter.includes(trackName))
          return max;
        const secondsPlayed = Math.round(msPlayed / 1000);
        return Math.max(secondsPlayed, max);
      },
      0
    );
  });

  getSongPlaytime = memorize(
    (artistFilter = [], trackFilter = [], amountOfIntervals = 100) => {
      const LIMIT_IN_SECONDS =
        artistFilter.length === 0 && trackFilter.length === 0
          ? 60 * 5
          : this.getLongestTrackInSeconds(artistFilter, trackFilter);
      const songPlaytime = this._getSongPlaytimeBySeconds(
        artistFilter,
        trackFilter,
        LIMIT_IN_SECONDS
      );
      return this.convertAccuracy(
        songPlaytime,
        amountOfIntervals,
        LIMIT_IN_SECONDS
      );
    }
  );

  _getSongPlaytimeBySeconds = memorize(
    (artistFilter: string[], trackFilter: string[], LIMIT_IN_SECONDS: number) => {
      function getInitialMap() {
        let initialMap = new Map();
        for (let i = 0; i <= LIMIT_IN_SECONDS; i++) initialMap.set(i, 0);
        return initialMap;
      }

      const songPlaytime = this.streamingHistory.reduce(
        (map, { msPlayed, trackName, artistName }) => {
          if (artistFilter.length !== 0 && !artistFilter.includes(artistName))
            return map;
          if (trackFilter.length !== 0 && !trackFilter.includes(trackName))
            return map;

          const secondsPlayed = Math.round(msPlayed / 1000);

          if (secondsPlayed >= LIMIT_IN_SECONDS) return map;

          const previous = map.get(secondsPlayed);
          map.set(secondsPlayed, previous + 1);
          return map;
        },
        getInitialMap()
      );

      const array = Array.from(songPlaytime, ([secondsPlayed, amount]) => {
        return {
          secondsPlayed,
          amount,
        };
      });

      const totalPlaybacks = this.getTotalTracksPlayed(
        artistFilter,
        trackFilter
      );

      return array.reduce((previous, { secondsPlayed, amount }) => {
        amount =
          previous.length === 0
            ? totalPlaybacks - amount
            : previous[previous.length - 1].amount - amount;
        return [
          ...previous,
          {
            secondsPlayed,
            amount,
            percentage: amount / totalPlaybacks,
          },
        ];
      }, []);
    }
  );

  convertAccuracy = (songPlaytime: any, amountOfIntervals: any, LIMIT_IN_SECONDS: any) => {
    // const secondsPerInterval = LIMIT_IN_SECONDS / amountOfIntervals;
    return songPlaytime;
  };
}
