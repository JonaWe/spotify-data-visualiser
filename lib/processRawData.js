export function getTimeslots(rawData) {
  const timeslots = [
    6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 0, 1, 2,
    3, 4, 5,
  ];
  // console.log(rawData);
  return timeslots.map((timeslot) => {
    return {
      timeslot,
      totalTimeSpent:
        // prettier-ignore
        rawData.filter(({ endTime }) => {
            let endHour = new Date(endTime).getHours();
            return timeslot - 0.5 <= endHour && timeslot + 0.5 >= endHour;
          })
          .reduce((acc, { msPlayed }) => acc + msPlayed, 0) /
        1000 /
        60 /
        60,
    };
  });
}
