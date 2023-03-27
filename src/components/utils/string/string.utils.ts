export const stringListToString = (stringList: string[]): string => {
  let resultString: string;
  if (stringList.length === 1) {
    resultString = stringList[0]!;
  } else if (stringList.length === 2) {
    resultString = `${stringList[0]} & ${stringList[1]}`;
  } else {
    resultString = stringList.join(', ');
  }
  return resultString;
};

export const secondsToHoursAndMinutesString = (seconds: number): string => {
  if (seconds < 1) {
    return '';
  }
  const numOfHours = Math.floor(seconds / 3600);
  const leftMinutes = Math.floor((seconds % 3600) / 60);
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
