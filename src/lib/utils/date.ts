export const msToHourMinutes = (ms: string | number) => {
  const minutes = Math.floor(+ms / 1000 / 60);

  const decimalHour = minutes / 60;
  const hour = Math.floor(decimalHour);

  const relativeMinutes = Math.round((decimalHour - hour) * 60);

  return [hour, relativeMinutes, minutes];
};
