import { format, formatDistanceToNow, isToday } from 'date-fns';

export const formatAlmanaxDate = (date: Date) => {
  const almanaxDateObject = new Date(date);
  const nextDate = format(almanaxDateObject, 'MMM do, yyyy');
  const daysAhead = formatDistanceToNow(almanaxDateObject);
  if (isToday(almanaxDateObject)) {
    return `${nextDate} (${'Today'})`;
  }
  return `${nextDate} (${daysAhead})`;
};
