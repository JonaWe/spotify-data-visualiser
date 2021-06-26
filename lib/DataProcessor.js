export default class DataProcessor {
  constructor(streamingHistory) {
    this.streamingHistory = streamingHistory;
  }

  getTimeslots() {
    const timeslots = [
      6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 0, 1,
      2, 3, 4, 5,
    ];

    return timeslots.map((timeslot) => {
      const totalTimeInTimeslot = this.streamingHistory
        .filter(({ endTime }) => {
          let endHour = new Date(endTime).getHours();
          return timeslot - 0.5 <= endHour && timeslot + 0.5 >= endHour;
        })
        .reduce((acc, { msPlayed }) => acc + msPlayed, 0);

      return {
        timeslot: timeslot + " o'clock",
        totalTimeSpent: (totalTimeInTimeslot / 1000 / 60 / 60).toFixed(1),
      };
    });
  }

  getWeekdays() {
    const weekdays = [
      [1, 'Monday'],
      [2, 'Tuesday'],
      [3, 'Wednesday'],
      [4, 'Thursday'],
      [5, 'Friday'],
      [6, 'Saturday'],
      [0, 'Sunday'],
    ];

    return weekdays.map(([dayIndex, dayName]) => {
      const totalTimeInWeekday = this.streamingHistory
        .filter(({ endTime }) => new Date(endTime).getDay() === dayIndex)
        .reduce((acc, { msPlayed }) => acc + msPlayed, 0);

      return {
        timeslot: dayName,
        totalTimeSpent: (totalTimeInWeekday / 1000 / 60 / 60).toFixed(1),
      };
    });
  }
}
