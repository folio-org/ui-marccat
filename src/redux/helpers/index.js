import { ENDPOINT } from '../../utils/Constant';

export default function Resolver() {}
export const buildUrl = (url:string, params?:string) => {
  return ENDPOINT.BASE_URL
    .concat(url)
    .concat('?')
    .concat(params);
};
