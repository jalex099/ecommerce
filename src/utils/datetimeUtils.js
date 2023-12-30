import differenceInHours from "date-fns/differenceInHours";

export function hoursRemainingUntilDate(dateStringValue, now = new Date()) {
  const date = new Date(dateStringValue);
  return differenceInHours(date, now);
}
