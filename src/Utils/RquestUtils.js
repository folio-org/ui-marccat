import queryString from 'qs';

export const qs = {
  parse: path =>
    queryString.parse(path, { ignoreQueryPrefix: true }),
  stringify: params =>
    queryString.stringify(params, {
      encodeValuesOnly: true,
    }),
};

export const toParams = obj => {
  return Object.entries(obj)
    .map(([key, val]) => `${key}=${val}`)
    .join('&');
};
