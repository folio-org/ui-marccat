/* @flow */
export type CallableObj<K, Z> = {
    (K, Z): any,
};

export function Callable<K>(): K {
  return this;
}

export function clone<K>(obj: K) {
  const cloned = K;

  Object.keys(obj).forEach(key => {
    cloned[key] = obj[key];
  });

  return ((cloned: any): typeof obj);
}
