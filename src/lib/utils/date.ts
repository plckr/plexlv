import { page } from '$app/stores';
import { get } from 'svelte/store';

export const msToHourMinutes = (ms: string | number) => {
  const minutes = Math.floor(+ms / 1000 / 60);

  const decimalHour = minutes / 60;
  const hour = Math.floor(decimalHour);

  const relativeMinutes = Math.round((decimalHour - hour) * 60);

  return [hour, relativeMinutes, minutes];
};

export const formatDate = (
  date: string | number | Date,
  options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }
) => {
  const lang = get(page).data.lang;

  return new Date(date).toLocaleDateString(lang, options);
};
