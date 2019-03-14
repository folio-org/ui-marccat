import queryString from 'qs';
import { ENDPOINT } from '../../components/Shared/Constants';

export function findParam(param) {
  const params = new URLSearchParams(document.location.search.substring(1));
  return params.get(param);
}
export const buildUrl = (url:string, params?:string) => {
  return ENDPOINT.BASE_URL
    .concat(url)
    .concat('?')
    .concat(params);
};
export const qs = {
  parse: path => queryString.parse(path, { ignoreQueryPrefix: true }),
  stringify: params => queryString.stringify(params, { encodeValuesOnly: true })
};
