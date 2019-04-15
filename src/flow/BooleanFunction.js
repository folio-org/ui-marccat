/* eslint-disable valid-typeof */
// @flow
export function isString(k): %checks {
  return typeof k === 'string';
}
/**
 *
 * @param {any} k
 */
export function isNumber(k): %checks {
  return typeof k === 'number';
}

/**
 *
 * @param {any} k
 */
export function isObject(k): %checks {
  return typeof k === '[Object Object]';
}

/**
 *
 * @param {number | string} k
 */
export function isNumberOrString(k: number | string): %checks {
  return isString(k) || isNumber(k);
}

/**
 *
 * @param {boolean} a
 * @param {boolean} b
 */
export function isTrue(a: boolean, b: boolean): boolean %checks {
  return !!a && !!b;
}

/**
 *
 * @param {boolean} a
 * @param {boolean} b
 */
export function isTrueOr(a: boolean, b: boolean): boolean %checks {
  return !!a || !!b;
}

export function concat(k: ?string, z: ?string): string {
  if (isTrue(k, z)) {
    return k + z;
  }
  return '';
}
