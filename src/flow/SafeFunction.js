/**
 * @format
 * @flow
 */
/**
 *
 * @param {*} value
 * @param {K} value
 */
export function safeArray<K>(value: Array<K>): Array<K> { return value; }

/**
 * @description:
 * null accetta valori anche null e non va in errore
 * void accetta valori anche undefined e non va in errore
 * @param {T} value
 */
export function safe<T>(value: T | void | null): T | void | null { return value; }
