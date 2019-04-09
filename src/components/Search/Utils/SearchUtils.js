/* eslint-disable no-console */
import { languageFilterMap, formatFilterMap } from '../Filter/FilterMapper';
import { EMPTY_STRING } from '../../../shared/Constants';
import { FixedFields, BaseFixedFields } from '../../../models';

export const getLanguageFilterQuery = (languageFilter) => {
  return languageFilter
    .map(e => {
      return 'LAN "' + languageFilterMap[Object.keys(e)[0]] + '"';
    }).join(' OR ');
};

export const getFormatFilterQuery = (formatFilter) => {
  return formatFilter
    .map(f => {
      return formatFilterMap[Object.keys(f)[0]];
    }).join(' OR ');
};

export const isAuthorityRecord = (meta) => {
  return meta.recordView === -1;
};

export const transitionToParams = (key, value) => {
  const url = window.location.pathname;
  return url.concat(`${key}=${value}`);
};

export const If = (k) => (k) || undefined;
export const safeString = str => (str) || EMPTY_STRING;
export const safeObject = (obj, prop) => ((obj) ? obj[prop] : {});
export const safefields = (arr:[]) => ((arr.length > 0) ? arr : []);


export class RecordFixed {
   key: string;
   val: string;
}

export const getObjectKeys = (obj, prefix = EMPTY_STRING) => {
  return Object.entries(obj).reduce((collector, [key, val]) => {
    const newKeys = [...collector, prefix ? `${prefix}.${key}` : key];
    if (Object.prototype.toString.call(val) === '[object Object]') {
      const newPrefix = prefix ? `${prefix}.${key}` : key;
      const otherKeys = getObjectKeys(val, newPrefix);
      return [...newKeys, ...otherKeys];
    }
    return newKeys;
  }, []);
};

/**
 *
 * @param {*} fields
 * @returns fixedFields - an array of record tag populated in order
 */
export const mapFields = (fields: []) :FixedFields<String, String, String, Array<any>> => {
  const fixedFields: FixedFields<String, String, String, Array<any>> = [];
  for (let i = 0; i < fields.length; i++) {
    for (const code in fields[i]) {
      const tag = fields[i][code];
      if (tag.length) {
        fixedFields.push(new BaseFixedFields(Object.keys(fields[i])[0], tag));
      } else {
        const fixedField = new FixedFields(code, tag.ind1, tag.ind2, tag.subfields);
        const subfieldArray = [];
        fixedField.subfield.forEach((f, codex) => subfieldArray.push(
          new BaseFixedFields(
            Object.keys(Object.entries(fixedField.subfield)[codex][1])[0], Object.values(Object.entries(fixedField.subfield)[codex][1])[0]
          )
        ));
        fixedField.subfield = (subfieldArray);
        fixedFields.push(fixedField);
      }
    }
  }
  return fixedFields;
};
