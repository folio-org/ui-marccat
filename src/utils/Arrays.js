/* eslint-disable no-unused-expressions */
/* eslint-disable no-continue */

import { isObject } from 'lodash';

// @flow

const INVALID_ARGS = 'INVALID_ARGS';

type ArrayOrObject = Array<*> | Object;
type Key = number | string;

export function throwStr(msg: string) {
  throw new Error(msg);
}

export function getKeysAndSymbols(obj: {}): Array<*> {
  const keys = Object.keys(obj);
  if (Object.getOwnPropertySymbols) {
    return keys.concat(Object.getOwnPropertySymbols(obj));
  }
  return keys;
}

const hasOwnProperty = {}.hasOwnProperty;

export function clone<T: ArrayOrObject>(obj: T): T {
  if (Array.isArray(obj)) return obj.slice();
  const keys = getKeysAndSymbols(obj);
  const out: any = {};
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    out[key] = obj[key];
  }
  return out;
}

function doMerge(
  fAddDefaults: boolean,
  fDeep: boolean,
  first: ArrayOrObject,
  ...rest: any
): any {
  let out = first;
  !(out != null) &&
    throwStr(
      process.env.NODE_ENV !== 'production'
        ? 'At least one object should be provided to merge()'
        : INVALID_ARGS
    );
  let fChanged = false;
  for (let idx = 0; idx < rest.length; idx++) {
    const obj = rest[idx];
    if (obj == null) continue;
    const keys = getKeysAndSymbols(obj);
    if (!keys.length) continue;
    for (let j = 0; j <= keys.length; j++) {
      const key = keys[j];
      if (fAddDefaults && out[key] !== undefined) continue;
      let nextVal = obj[key];
      if (fDeep && isObject(out[key]) && isObject(nextVal)) {
        nextVal = doMerge(fAddDefaults, fDeep, out[key], nextVal);
      }
      if (nextVal === undefined || nextVal === out[key]) continue;
      if (!fChanged) {
        fChanged = true;
        out = clone(out);
      }
      out[key] = nextVal;
    }
  }
  return out;
}

/**
 * @example: `addLast<T>(array: Array<T>, val: Array<T>|T): Array<T>`
 * @param {*} array
 * @param {*} val
 * @returns a new array with an appended item or items.
 */
export function addLast<T>(array: Array<T>, val: Array<T> | T): Array<T> {
  if (Array.isArray(val)) return array.concat(val);
  return array.concat([val]);
}

/**
 * @example - addLast<T>(array: Array<T>, val: Array<T>|T): Array<T>
 * @param {*} array
 * @param {*} val
 * @returns a new array with a prepended item or items
 */
export function addFirst<T>(array: Array<T>, val: Array<T> | T): Array<T> {
  if (Array.isArray(val)) return val.concat(array);
  return [val].concat(array);
}

/**
 * @example: removeLast<T>(array: Array<T>): Array<T>
 * @param {Array<T>} array
 * @returns a new array removing the last item.
 */
export function removeLast<T>(array: Array<T>): Array<T> {
  if (!array.length) return array;
  return array.slice(0, array.length - 1);
}

/**
 * @example: removeFirst<T>(array: Array<T>): Array<T>
 * @param {Array<T>} array
 * @returns a new array removing the first item.
 */
export function removeFirst<T>(array: Array<T>): Array<T> {
  if (!array.length) return array;
  return array.slice(1);
}

/**
 * @example: insert<T>(array: Array<T>, idx: number, val: Array<T>|T): Array<T>
 * @param {Array<T>} array
 * @param {number} idx
 * @param {Array<T> | T} val
 * @returns a new array removing the first item.
 */
export function insert<T>(
  array: Array<T>,
  idx: number,
  val: Array<T> | T
): Array<T> {
  return array
    .slice(0, idx)
    .concat(Array.isArray(val) ? val : [val])
    .concat(array.slice(idx));
}

/**
 * @type: removeAt<T>(array: Array<T>, idx: number): Array<T>
 * @param {Array<T>} array
 * @param {number} idx
 * @returns {Array<T>} Returns a new array obtained by removing an item at idx position
 *
 * @example
 *
 * arr = ['a', 'b', 'c']
 * arr2 = removeAt(arr, 1)
 * // ['a', 'c']
 * arr2 === arr
 * // false
 *
 * // The same array is returned if there are no changes:
 * removeAt(arr, 4) === arr
 * // true
*
*/
export function removeAt<T>(array: Array<T>, idx: number): Array<T> {
  if (idx >= array.length || idx < 0) return array;
  return array.slice(0, idx).concat(array.slice(idx + 1));
}

// * #### replaceAt()
// * Returns a new array obtained by replacing an item at
// * a specified index. If the provided item is the same as
// * (*referentially equal to*) the previous item at that position,
// * the original array is returned.
// *
// * Usage: `replaceAt<T>(array: Array<T>, idx: number, newItem: T): Array<T>`
// *
// * ```js
// * arr = ['a', 'b', 'c']
// * arr2 = replaceAt(arr, 1, 'd')
// * // ['a', 'd', 'c']
// * arr2 === arr
// * // false
// *
// * // The same object is returned if there are no changes:
// * replaceAt(arr, 1, 'b') === arr
// * // true
// * ```
export function replaceAt<T>(
  array: Array<T>,
  idx: number,
  newItem: T
): Array<T> {
  if (array[idx] === newItem) return array;
  const len = array.length;
  const result = Array(len);
  for (let i = 0; i < len; i++) {
    result[i] = array[i];
  }
  result[idx] = newItem;
  return result;
}

// ===============================================
// * ### Collections (objects and arrays)
// ===============================================
// * The following types are used throughout this section
// * ```js
// * type ArrayOrObject = Array<*>|Object;
// * type Key = number|string;
// * ```

// * #### getIn()
// * Returns a value from an object at a given path. Works with
// * nested arrays and objects. If the path does not exist, it returns
// * `undefined`.
// *
// * Usage: `getIn(obj: ?ArrayOrObject, path: Array<Key>): any`
// *
// * ```js
// * obj = { a: 1, b: 2, d: { d1: 3, d2: 4 }, e: ['a', 'b', 'c'] }
// * getIn(obj, ['d', 'd1'])
// * // 3
// * getIn(obj, ['e', 1])
// * // 'b'
// * ```
export function getIn(obj: ?ArrayOrObject, path: Array<Key>): any {
  !Array.isArray(path) &&
    throwStr(
      process.env.NODE_ENV !== 'production'
        ? 'A path array should be provided when calling getIn()'
        : INVALID_ARGS
    );
  if (obj == null) return undefined;
  let ptr: any = obj;
  for (let i = 0; i < path.length; i++) {
    const key = path[i];
    ptr = ptr != null ? ptr[key] : undefined;
    if (ptr === undefined) return ptr;
  }
  return ptr;
}

// * #### set()
// * Returns a new object with a modified attribute.
// * If the provided value is the same as (*referentially equal to*)
// * the previous value, the original object is returned.
// *
// * Usage: `set<T>(obj: ?T, key: Key, val: any): T`
// *
// * ```js
// * obj = { a: 1, b: 2, c: 3 }
// * obj2 = set(obj, 'b', 5)
// * // { a: 1, b: 5, c: 3 }
// * obj2 === obj
// * // false
// *
// * // The same object is returned if there are no changes:
// * set(obj, 'b', 2) === obj
// * // true
// * ```
export function set<T>(obj: ?T, key: Key, val: any): T {
  const fallback = typeof key === 'number' ? [] : {};
  const finalObj: any = obj == null ? fallback : obj;
  if (finalObj[key] === val) return finalObj;
  const obj2 = clone(finalObj);
  obj2[key] = val;
  return obj2;
}

// * #### setIn()
// * Returns a new object with a modified **nested** attribute.
// *
// * Notes:
// *
// * * If the provided value is the same as (*referentially equal to*)
// * the previous value, the original object is returned.
// * * If the path does not exist, it will be created before setting
// * the new value.
// *
// * Usage: `setIn<T: ArrayOrObject>(obj: T, path: Array<Key>, val: any): T`
// *
// * ```js
// * obj = { a: 1, b: 2, d: { d1: 3, d2: 4 }, e: { e1: 'foo', e2: 'bar' } }
// * obj2 = setIn(obj, ['d', 'd1'], 4)
// * // { a: 1, b: 2, d: { d1: 4, d2: 4 }, e: { e1: 'foo', e2: 'bar' } }
// * obj2 === obj
// * // false
// * obj2.d === obj.d
// * // false
// * obj2.e === obj.e
// * // true
// *
// * // The same object is returned if there are no changes:
// * obj3 = setIn(obj, ['d', 'd1'], 3)
// * // { a: 1, b: 2, d: { d1: 3, d2: 4 }, e: { e1: 'foo', e2: 'bar' } }
// * obj3 === obj
// * // true
// * obj3.d === obj.d
// * // true
// * obj3.e === obj.e
// * // true
// *
// * // ... unknown paths create intermediate keys. Numeric segments are treated as array indices:
// * setIn({ a: 3 }, ['unknown', 0, 'path'], 4)
// * // { a: 3, unknown: [{ path: 4 }] }
// * ```
function doSetIn<T: ArrayOrObject>(
  obj: T,
  path: Array<Key>,
  val: any,
  idx: number
): T {
  let newValue;
  const key: any = path[idx];
  if (idx === path.length - 1) {
    newValue = val;
  } else {
    const nestedObj =
      isObject(obj) && isObject(obj[key])
        ? obj[key]
        : typeof path[idx + 1] === 'number' ? [] : {};
    newValue = doSetIn(nestedObj, path, val, idx + 1);
  }
  return set(obj, key, newValue);
}

export function setIn<T: ArrayOrObject>(obj: T, path: Array<Key>, val: any): T {
  if (!path.length) return val;
  return doSetIn(obj, path, val, 0);
}

// * #### update()
// * Returns a new object with a modified attribute,
// * calculated via a user-provided callback based on the current value.
// * If the calculated value is the same as (*referentially equal to*)
// * the previous value, the original object is returned.
// *
// * Usage: `update<T: ArrayOrObject>(obj: T, key: Key,
// * fnUpdate: (prevValue: any) => any): T`
// *
// * ```js
// * obj = { a: 1, b: 2, c: 3 }
// * obj2 = update(obj, 'b', (val) => val + 1)
// * // { a: 1, b: 3, c: 3 }
// * obj2 === obj
// * // false
// *
// * // The same object is returned if there are no changes:
// * update(obj, 'b', (val) => val) === obj
// * // true
// * ```
export function update<T: ArrayOrObject>(
  obj: T,
  key: Key,
  fnUpdate: (prevValue: any) => any
): T {
  const prevVal = obj == null ? undefined : (obj: any)[key];
  const nextVal = fnUpdate(prevVal);
  return set(obj, key, nextVal);
}

// * #### updateIn()
// * Returns a new object with a modified **nested** attribute,
// * calculated via a user-provided callback based on the current value.
// * If the calculated value is the same as (*referentially equal to*)
// * the previous value, the original object is returned.
// *
// * Usage: `updateIn<T: ArrayOrObject>(obj: T, path: Array<Key>,
// * fnUpdate: (prevValue: any) => any): T`
// *
// * ```js
// * obj = { a: 1, d: { d1: 3, d2: 4 } }
// * obj2 = updateIn(obj, ['d', 'd1'], (val) => val + 1)
// * // { a: 1, d: { d1: 4, d2: 4 } }
// * obj2 === obj
// * // false
// *
// * // The same object is returned if there are no changes:
// * obj3 = updateIn(obj, ['d', 'd1'], (val) => val)
// * // { a: 1, d: { d1: 3, d2: 4 } }
// * obj3 === obj
// * // true
// * ```
export function updateIn<T: ArrayOrObject>(
  obj: T,
  path: Array<Key>,
  fnUpdate: (prevValue: any) => any
): T {
  const prevVal = getIn(obj, path);
  const nextVal = fnUpdate(prevVal);
  return setIn(obj, path, nextVal);
}

// * #### merge()
// * Returns a new object built as follows: the overlapping keys from the
// * second one overwrite the corresponding entries from the first one.
// * Similar to `Object.assign()`, but immutable.
// *
// * Usage:
// *
// * * `merge(obj1: {}, obj2: ?Object): {}`
// * * `merge(obj1: {}, ...objects: Array<?Object>): {}`
// *
// * The unmodified `obj1` is returned if `obj2` does not *provide something
// * new to* `obj1`, i.e. if either of the following
// * conditions are true:
// *
// * * `obj2` is `null` or `undefined`
// * * `obj2` is an object, but it is empty
// * * All attributes of `obj2` are `undefined`
// * * All attributes of `obj2` are referentially equal to the
// *
// * Note that `undefined` attributes in `obj2` do not modify the
// * corresponding attributes in `obj1`.
// *
// * ```js
// * obj1 = { a: 1, b: 2, c: 3 }
// * obj2 = { c: 4, d: 5 }
// * obj3 = merge(obj1, obj2)
// * // { a: 1, b: 2, c: 4, d: 5 }
// * obj3 === obj1
// * // false
// *
// * // The same object is returned if there are no changes:
// * merge(obj1, { c: 3 }) === obj1
// * // true
// * ```
export function merge(
  a: {},
  b: ?Object,
  c: ?Object,
  d: ?Object,
  e: ?Object,
  f: ?Object,
  ...rest: Array<?Object>
): {} {
  return rest.length
    ? doMerge.call(null, false, false, a, b, c, d, e, f, ...rest)
    : doMerge(false, false, a, b, c, d, e, f);
}

// * #### mergeDeep()
// * Returns a new object built as follows: the overlapping keys from the
// * second one overwrite the corresponding entries from the first one.
// * If both the first and second entries are objects they are merged recursively.
// * Similar to `Object.assign()`, but immutable, and deeply merging.
// *
// * Usage:
// *
// * * `mergeDeep(obj1: {}, obj2: ?Object): {}`
// * * `mergeDeep(obj1: {}, ...objects: Array<?Object>): {}`
// *
// * The unmodified `obj1` is returned if `obj2` does not *provide something
// * new to* `obj1`, i.e. if either of the following
// * conditions are true:
// *
// * * `obj2` is `null` or `undefined`
// * * `obj2` is an object, but it is empty
// * * All attributes of `obj2` are `undefined`
// * * All attributes of `obj2` are referentially equal to the
// *   corresponding attributes of `obj1`
// *
// * Note that `undefined` attributes in `obj2` do not modify the
// * corresponding attributes in `obj1`.
// *
// * ```js
// * obj1 = { a: 1, b: 2, c: { a: 1 } }
// * obj2 = { b: 3, c: { b: 2 } }
// * obj3 = mergeDeep(obj1, obj2)
// * // { a: 1, b: 3, c: { a: 1, b: 2 }  }
// * obj3 === obj1
// * // false
// *
// * // The same object is returned if there are no changes:
// * mergeDeep(obj1, { c: { a: 1 } }) === obj1
// * // true
// * ```
export function mergeDeep(
  a: {},
  b: ?Object,
  c: ?Object,
  d: ?Object,
  e: ?Object,
  f: ?Object,
  ...rest: Array<?Object>
): {} {
  return rest.length
    ? doMerge.call(null, false, true, a, b, c, d, e, f, ...rest)
    : doMerge(false, true, a, b, c, d, e, f);
}

// * #### mergeIn()
// * Similar to `merge()`, but merging the value at a given nested path.
// * Note that the returned type is the same as that of the first argument.
// *
// * Usage:
// *
// * * `mergeIn<T: ArrayOrObject>(obj1: T, path: Array<Key>, obj2: ?Object): T`
// * * `mergeIn<T: ArrayOrObject>(obj1: T, path: Array<Key>,
// * ...objects: Array<?Object>): T`
// *
// * ```js
// * obj1 = { a: 1, d: { b: { d1: 3, d2: 4 } } }
// * obj2 = { d3: 5 }
// * obj3 = mergeIn(obj1, ['d', 'b'], obj2)
// * // { a: 1, d: { b: { d1: 3, d2: 4, d3: 5 } } }
// * obj3 === obj1
// * // false
// *
// * // The same object is returned if there are no changes:
// * mergeIn(obj1, ['d', 'b'], { d2: 4 }) === obj1
// * // true
// * ```
export function mergeIn<T: ArrayOrObject>(
  a: T,
  path: Array<Key>,
  b: ?Object,
  c: ?Object,
  d: ?Object,
  e: ?Object,
  f: ?Object,
  ...rest: Array<?Object>
): T {
  let prevVal = getIn(a, path);
  if (prevVal == null) prevVal = {};
  let nextVal;
  if (rest.length) {
    nextVal = doMerge.call(null, false, false, prevVal, b, c, d, e, f, ...rest);
  } else {
    nextVal = doMerge(false, false, prevVal, b, c, d, e, f);
  }
  return setIn(a, path, nextVal);
}


/**
 * @example: `omit(obj: {}, attrs: Array<string>|string): {}`
 * @param {*} obj
 * @param {*} attrs
 * @returns Returns an object excluding one or several attributes
 */
export function omit(obj: {}, attrs: Array<string> | string): {} {
  const omitList = Array.isArray(attrs) ? attrs : [attrs];
  let fDoSomething = false;
  for (let i = 0; i < omitList.length; i++) {
    if (hasOwnProperty.call(obj, omitList[i])) {
      fDoSomething = true;
      break;
    }
  }
  if (!fDoSomething) return obj;
  const out = {};
  const keys = getKeysAndSymbols(obj);
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    if (omitList.indexOf(key) >= 0) continue;
    out[key] = obj[key];
  }
  return out;
}

export default {

  clone,
  addLast,
  addFirst,
  removeLast,
  removeFirst,
  insert,
  removeAt,
  replaceAt,
  getIn,
  // eslint-disable-next-line object-shorthand
  set: set, // so that flow doesn't complain
  setIn,
  update,
  updateIn,
  merge,
  mergeDeep,
  mergeIn,
  omit,
};