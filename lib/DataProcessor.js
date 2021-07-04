import { compareAsc, differenceInDays } from 'date-fns';

export default class DataProcessor {
  constructor(streamingHistory) {
    this.streamingHistory = streamingHistory;
  }

  getTotalTracksPlayed() {
    if (!this.hasOwnProperty('totalTracksPlayed')) {
      this.totalTracksPlayed = this.streamingHistory.length;
    }

    return this.totalTracksPlayed;
  }

  getTotalSkippedSongs(tolerance = 5_000) {
    if (!this.hasOwnProperty('totalSkippedSongs')) {
      this.totalSkippedSongs = this.streamingHistory.filter(
        ({ msPlayed }) => msPlayed < tolerance
      ).length;
    }

    return this.totalSkippedSongs;
  }

  getAverageSongPlaytime() {
    if (!this.hasOwnProperty('averageSongPlaytime')) {
      this.averageSongPlaytime =
        this.getTotalPlaytime() / this.getTotalTracksPlayed();
    }

    return this.averageSongPlaytime;
  }

  getTotalPlaytime() {
    if (!this.hasOwnProperty('totalPlaytime')) {
      this.totalPlaytime = this.streamingHistory.reduce(
        (acc, { msPlayed }) => acc + msPlayed,
        0
      );
    }

    return this.totalPlaytime;
  }

  getTopArtists(max = 10) {
    this.topArtists = this.getAllArtistsPlaytime()
      .slice(0, max)
      .map(({ artistName, msPlayed }) => ({
        artistName,
        hoursPlayed: msPlayed / 1000 / 60 / 60,
      }));
    return this.topArtists;
  }

  getTopArtist() {
    if (!this.hasOwnProperty('topArtist')) {
      this.topArtist = this.getAllArtistsPlaytime()[0];
    }
    return this.topArtist;
  }

  getAllArtistsPlaytime() {
    if (!this.hasOwnProperty('allArtistsPlaytime')) {
      const artistMap = new Map();
      this.streamingHistory.forEach(({ artistName, msPlayed }) => {
        const current = artistMap.get(artistName);
        artistMap.set(
          artistName,
          typeof current === 'undefined' ? msPlayed : current + msPlayed
        );
      });
      this.allArtistsPlaytime = Array.from(
        artistMap,
        ([artistName, msPlayed]) => ({ artistName, msPlayed })
      ).sort((a, b) => b.msPlayed - a.msPlayed);
    }

    return this.allArtistsPlaytime;
  }

  getTopTracks(max = 10) {
    this.topTracks = this.getAllTracksByPlaytime()
      .slice(0, max)
      .map(({ trackName, msPlayed, artistName }) => ({
        trackName,
        hoursPlayed: msPlayed / 1000 / 60 / 60,
        artistName,
      }));
    return this.topTracks;
  }

  getTopTrack() {
    if (!this.hasOwnProperty('topTrack')) {
      this.topTrack = this.getAllArtistsPlaytime()[0];
    }
    return this.topTrack;
  }

  getAllTracksByPlaytime() {
    if (!this.hasOwnProperty('allTracksByPlaytime')) {
      const songMap = new Map();
      this.streamingHistory.forEach(({ trackName, msPlayed, artistName }) => {
        const current = songMap.get(trackName);
        const value =
          typeof current === 'undefined'
            ? { artistName, msPlayed }
            : { artistName, msPlayed: msPlayed + current.msPlayed };
        songMap.set(trackName, value);
      });
      this.allTracksByPlaytime = Array.from(
        songMap,
        ([trackName, { msPlayed, artistName }]) => ({
          trackName,
          msPlayed,
          artistName,
        })
      ).sort((a, b) => b.msPlayed - a.msPlayed);
    }

    return this.allTracksByPlaytime;
  }

  getMinDate() {
    if (!this.hasOwnProperty('minDate')) {
      this.getPlaytimeOverYear();
    }
    return this.minDate;
  }

  getMaxDate() {
    if (!this.hasOwnProperty('maxDate')) {
      this.getPlaytimeOverYear();
    }
    return this.maxDate;
  }

  getTotalDays() {
    if (!this.hasOwnProperty('totalDays')) {
      this.totalDays = differenceInDays(this.getMaxDate(), this.getMinDate());
    }
    return this.totalDays;
  }

  getPlaytimeOverYear(artistFilter = [], trackFilter = []) {
    const monthlyActivity = new Map();

    this.streamingHistory.forEach(
      ({ msPlayed, endTime, trackName, artistName }) => {
        if (artistFilter.length !== 0 && !artistFilter.includes(artistName))
          return;
        if (trackFilter.length !== 0 && !trackFilter.includes(trackName))
          return;

        const endDate = new Date(endTime);

        if (!this.minDate || compareAsc(endDate, this.minDate) < 0)
          this.minDate = endDate;
        if (!this.maxDate || compareAsc(endDate, this.maxDate) > 0)
          this.maxDate = endDate;

        const dateKey = String(
          new Date(endDate.getUTCFullYear(), endDate.getUTCMonth())
        );
        const current = monthlyActivity.get(dateKey);
        monthlyActivity.set(
          dateKey,
          typeof current === 'undefined' ? msPlayed : current + msPlayed
        );
      }
    );

    this.playtimeOverYear = Array.from(monthlyActivity, ([date, msPlayed]) => ({
      date: new Date(date),
      hours: msPlayed / 1000 / 60 / 60,
    }))
      .sort((a, b) => compareAsc(a.date, b.date))
      .map(({ date, hours }) => ({ date, hours }))
      .slice(1, -1);
    // }

    return this.playtimeOverYear;
  }

  getAveragePlaytimePerDay() {
    if (!this.hasOwnProperty('averagePlaytimePerDay')) {
      this.averagePlaytimePerDay =
        this.getTotalPlaytime() / this.getTotalDays();
    }
    return this.averagePlaytimePerDay;
  }

  getTimeslots(filter = []) {
    const timeslotsMap = new Map();

    this.streamingHistory.forEach(({ msPlayed, endTime }) => {
      const currentDate = new Date(endTime);
      if (filter.length !== 0 && !filter.includes(currentDate.getDay())) return;
      const currentHour = currentDate.getHours();
      const playtimeInCurrentHour = timeslotsMap.get(currentHour);
      timeslotsMap.set(
        currentHour,
        typeof playtimeInCurrentHour === 'undefined'
          ? msPlayed
          : playtimeInCurrentHour + msPlayed
      );
    });

    this.timeslots = Array.from(timeslotsMap, ([hour, msPlayed]) => ({
      hour,
      msPlayed,
    })).sort((a, b) => a.hour - b.hour);

    return this.timeslots;
  }

  getWeekdays() {
    if (!this.hasOwnProperty('weekdays')) {
      const weekdaysMap = new Map();

      this.streamingHistory.forEach(({ msPlayed, endTime }) => {
        const currentDay = new Date(endTime).getDay();
        const playtimeInCurrentDay = weekdaysMap.get(currentDay);
        weekdaysMap.set(
          currentDay,
          typeof playtimeInCurrentDay === 'undefined'
            ? msPlayed
            : playtimeInCurrentDay + msPlayed
        );
      });

      this.weekdays = Array.from(weekdaysMap, ([weekday, msPlayed]) => ({
        weekday,
        msPlayed,
      })).sort((a, b) => a.weekday - b.weekday);
    }

    return this.weekdays;
  }

  getAllTrackNames() {
    if (!this.hasOwnProperty('allTrackNames')) {
      this.allTrackNames = this.getAllTracksByPlaytime().map(
        ({ trackName }) => trackName
      );
    }
    return this.allTrackNames;
  }

  getAllArtistNames() {
    if (!this.hasOwnProperty('allArtistNames')) {
      this.allArtistNames = this.getAllArtistsPlaytime().map(
        ({ artistName }) => artistName
      );
    }
    return this.allArtistNames;
  }
}
