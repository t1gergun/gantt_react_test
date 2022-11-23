export const monthDiff = (firstMonth: Date, lastMonth: Date) => {
  let months;
  months = (lastMonth.getFullYear() - firstMonth.getFullYear()) * 12;
  months -= firstMonth.getMonth();
  months += lastMonth.getMonth();
  return months <= 0 ? 0 : months;
};

export const dayDiff = (startDate: string, endDate: string) => {
  const difference =
    new Date(endDate).getTime() - new Date(startDate).getTime();
  const days = Math.ceil(difference / (1000 * 3600 * 24)) + 1;
  return days;
};

export const getDaysInMonth = (year: number, month: number) => {
  return new Date(year, month, 0).getDate();
};

export const createFormattedDateFromStr = (
  year: number,
  month: number,
  day: number
) => {
  let monthStr = month.toString();
  let dayStr = day.toString();

  if (monthStr.length === 1) {
    monthStr = `0${monthStr}`;
  }
  if (dayStr.length === 1) {
    dayStr = `0${dayStr}`;
  }
  return `${year}-${monthStr}-${dayStr}`;
};
