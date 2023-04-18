export const arrayToString = (array: string[]): string => {
  if (array.length === 1) {
    return array[0] as string;
  } else if (array.length === 2) {
    return `${array[0]} & ${array[1]}`;
  } else {
    return array.join(', ');
  }
};

export const minutesToHoursAndMinutesString = (seconds: number): string => {
  if (seconds < 1) {
    return '';
  }
  const numOfHours = Math.floor(seconds / 60);
  const leftMinutes = seconds % 60;
  let resultString;
  if (numOfHours === 0) {
    resultString = `${leftMinutes}min`;
  } else if (leftMinutes === 0) {
    resultString = `${numOfHours}h`;
  } else {
    resultString = `${numOfHours}h ${leftMinutes}min`;
  }
  return resultString;
};
