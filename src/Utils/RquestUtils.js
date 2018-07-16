export const toParams = obj => Object.entries(obj)
  .map(([key, val]) => `${key}=${val}`)
  .join('&');
