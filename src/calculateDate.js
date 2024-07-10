import { differenceInDays, differenceInSeconds, differenceInMinutes, differenceInHours, differenceInMonths, differenceInWeeks, differenceInYears } from "date-fns";

export default function calculate(date) {
  const now = Date.now();
  const years = differenceInYears(now, date);
  if (years > 1) return years + " years ago";
  if (years === 1) return years + " year ago";
  const months = differenceInMonths(now, date);
  if (months > 1) return months + " months ago";
  if (months === 1) return months + " month ago";
  const weeks = differenceInWeeks(now, date);
  if (weeks > 1) return weeks + " weeks ago";
  const days = differenceInDays(now, date);
  if (days > 1) return days + " days ago";
  if (days === 1) return days + " day ago";
  const hours = differenceInHours(now, date);
  if (hours > 1) return hours + " hours ago";
  if (hours === 1) return hours + " hour ago";
  const minutes = differenceInMinutes(now, date);
  if (minutes > 1) return minutes + " minutes ago";
  if (minutes === 1) return minutes + " minute ago";
  const seconds = differenceInSeconds(now, date);
  if (seconds > 1) return seconds + " seconds ago";
  if (seconds === 1) return seconds + " second ago";
  return "0 seconds ago";
}