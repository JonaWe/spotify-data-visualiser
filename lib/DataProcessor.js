import { compareAsc, format } from 'date-fns';

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

  getTopArtists() {
    if (!this.hasOwnProperty('topArtists')) {
      this.topArtists = this.getAllArtistsPlaytime()
        .slice(0, 10)
        .map(({ artistName, msPlayed }) => ({
          artistName,
          hoursPlayed: Number((msPlayed / 1000 / 60 / 60).toFixed(2)),
        }));
    }
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

  getTopTracks() {
    if (!this.hasOwnProperty('topTracks')) {
      this.topTracks = this.getAllTracksByPlaytime()
        .slice(0, 10)
        .map(({ trackName, msPlayed }) => ({
          trackName,
          hoursPlayed: Number((msPlayed / 1000 / 60 / 60).toFixed(2)),
        }));
    }
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
      this.streamingHistory.forEach(({ trackName, msPlayed }) => {
        const current = songMap.get(trackName);
        songMap.set(
          trackName,
          typeof current === 'undefined' ? msPlayed : current + msPlayed
        );
      });
      this.allTracksByPlaytime = Array.from(
        songMap,
        ([trackName, msPlayed]) => ({ trackName, msPlayed })
      ).sort((a, b) => b.msPlayed - a.msPlayed);
    }

    return this.allTracksByPlaytime;
  }

  getPlaytimeOverYear() {
    if (!this.hasOwnProperty('playtimeOverYear')) {
      const monthlyActivity = new Map();
      this.streamingHistory.forEach(({ msPlayed, endTime }) => {
        const endDate = new Date(endTime);
        const dateKey = String(
          new Date(endDate.getUTCFullYear(), endDate.getUTCMonth())
        );
        const current = monthlyActivity.get(dateKey);
        monthlyActivity.set(
          dateKey,
          typeof current === 'undefined' ? msPlayed : current + msPlayed
        );
      });
      this.playtimeOverYear = Array.from(
        monthlyActivity,
        ([date, msPlayed]) => ({
          date: new Date(date),
          hours: Number(Math.floor(msPlayed / 1000 / 60 / 60)),
        })
      )
        .sort((a, b) => compareAsc(a.date, b.date))
        .map(({ date, hours }) => ({ date: format(date, 'MMM yy'), hours }))
        .slice(1, -1);
    }

    return this.playtimeOverYear;
  }

  getAveragePlaytimePerDay() {
    if (!this.hasOwnProperty('averagePlaytimePerDay')) {
      this.averagePlaytimePerDay = this.getTotalPlaytime() / 265;
    }
    return this.averagePlaytimePerDay;
  }

  getTimeslots() {
    if (!this.hasOwnProperty('timeslots')) {
      const timeslots = [
        6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 0,
        1, 2, 3, 4, 5,
      ];

      this.timeslots = timeslots.map((timeslot) => {
        const totalTimeInTimeslot = this.streamingHistory
          .filter(({ endTime }) => {
            let endHour = new Date(endTime).getHours();
            return timeslot - 0.5 <= endHour && timeslot + 0.5 >= endHour;
          })
          .reduce((acc, { msPlayed }) => acc + msPlayed, 0);

        return {
          timeslot: timeslot + " o'clock",
          totalTimeSpent: Number(
            (totalTimeInTimeslot / 1000 / 60 / 60).toFixed(1)
          ),
        };
      });
    }

    return this.timeslots;
  }

  getWeekdays() {
    if (!this.hasOwnProperty('weekdays')) {
      const weekdays = [
        [1, 'Monday'],
        [2, 'Tuesday'],
        [3, 'Wednesday'],
        [4, 'Thursday'],
        [5, 'Friday'],
        [6, 'Saturday'],
        [0, 'Sunday'],
      ];

      this.weekdays = weekdays.map(([dayIndex, dayName]) => {
        const totalTimeInWeekday = this.streamingHistory
          .filter(({ endTime }) => new Date(endTime).getDay() === dayIndex)
          .reduce((acc, { msPlayed }) => acc + msPlayed, 0);

        return {
          timeslot: dayName,
          totalTimeSpent: Number(
            (totalTimeInWeekday / 1000 / 60 / 60).toFixed(1)
          ),
        };
      });
    }

    return this.weekdays;
  }
}
