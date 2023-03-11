export type Split<S extends string, D extends string> = string extends S
  ? string[]
  : S extends ''
  ? []
  : S extends `${infer T}${D}${infer U}`
  ? [T, ...Split<U, D>]
  : [S];

export const removeTrailingSlash = (url: string) => {
  return url.replace(/\/+$/g, '');
};

export const slugify = (str: string) => {
  str = str.replace(/^\s+|\s+$/g, ''); // trim
  str = str.toLowerCase();

  const from = 'àáäâèéëêìíïîòóöôùúüûñç·/_,:;';
  const to = 'aaaaeeeeiiiioooouuuunc------';
  for (let i = 0, l = from.length; i < l; i++) {
    str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
  }

  str = str
    .replace(/[^a-z0-9 -]/g, '') // remove invalid chars
    .replace(/\s+/g, '-') // collapse whitespace and replace by -
    .replace(/-+/g, '-'); // collapse dashes

  return str;
};

export const getNameInitials = (str: string) => {
  const parts = str.trim().split(' ');
  const length = parts.length;

  if (length === 1) {
    return parts[0][0].toUpperCase();
  }

  if (length > 1) {
    return (parts[0][0] + parts[length - 1][0]).toUpperCase();
  }

  return '';
};

export const pixelToNumber = (pixel: string) => {
  return parseInt(pixel.trim(), 10);
};
