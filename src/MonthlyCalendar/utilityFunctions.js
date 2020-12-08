export function isLeapYear(year) {
  return year % 4 === 0 && (year % 400 === 0 || year % 100 !== 0);
}

export function getDaysInTheMonth(month, year) {
  switch (month) {
    case 4:
      return 30;
    case 6:
      return 30;
    case 9:
      return 30;
    case 11:
      return 30;
    case 2:
      return isLeapYear(year) ? 29 : 28;
    default:
      return 31;
  }
}

export function getDayOfWeek(m, y, d) {
  const date = new Date(y, m - 1, d);
  return date.getDay();
}

export function partition(array, filter) {
  let pass = [],
    fail = [];
  array.forEach((e, idx, arr) => (filter(e, idx, arr) ? pass : fail).push(e));
  return [pass, fail];
}
