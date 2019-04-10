import { ENDPOINT } from '../../shared/Constants';
import { post } from './HttpService';
import { buildUrl } from '../../redux';


export async function ensureResolvedProps(prop) {
  const value = await prop;
  if (value instanceof Error) {
    throw value;
  } else {
    return value;
  }
}

export class AsyncComputation {
  async getRes() {
    return ensureResolvedProps(this.res);
  }
}

export async function asyncChangeDisplayValue(asyncReuestObj) {
  const response = await post(buildUrl(ENDPOINT.CHANGE_DISPLAY_VALUE, ENDPOINT.DEFAULT_LANG_VIEW), asyncReuestObj);
  response.then((r) => { return r.json(); }).then(() => {
  });
}

const getValue = async v => v;
export async function Caller(...fn) {
  fn.forEach(async (value) => {
    await getValue(value);
  });
}
