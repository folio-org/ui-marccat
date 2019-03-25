import { range, union } from 'lodash';

export const RECORD_FIELD_STATUS = {
  NEW: 'new',
  UNCHANGED: 'unchanged',
  CHANGED: 'changed',
  DELETED: 'deleted'
};

export const TAGS = {
  _001: '001',
  _003: '003',
  _005: '005',
  _006: '006',
  _007: '007',
  _008: '008',
  _040: '040'
};

/*
 * Create array with all tags code in a range
 * for instance tag from 300 to 399: range(300, 399, 1);
 */
export const TAG_1XX = range(100, 200, 1);
export const TAG_2XX = range(200, 300, 1);
export const TAG_3XX = range(300, 400, 1);
export const TAG_4XX = range(400, 500, 1);
export const TAG_5XX = range(500, 600, 1);
export const TAG_6XX = range(600, 700, 1);
export const TAG_7XX = range(700, 800, 1);
export const TAG_8XX = range(800, 900, 1);
export const TAG_9XX = range(900, 1000, 1);

/*
 * Create array all tags width category 7
 */
export const TAG_WIDH_CAT_7 = [
  '018', '033', '040', '034', '037', '250', '254', '255', '256', '257',
  '258', '260', '261', '262', '264', '265', '270', '300', '306', '307', '308', '310',
  '315', '321', '336', '337', '338', '340', '342', '343', '344', '345', '346', '347',
  '348', '350', '351', '352', '355', '357', '359', '362', '363', '365', '366', '370',
  '377', '380', '381', '382', '383', '384', '385', '386', '388', '490', '500', '501',
  '502', '503', '504', '505', '506', '507', '508', '510', '511', '512', '513', '514',
  '515', '516', '517', '518', '520', '521', '522', '523', '524', '525', '526', '527',
  '530', '533', '534', '535', '536', '537', '538', '540', '541', '542', '544', '545',
  '546', '547', '550', '552', '555', '556', '561', '562', '563', '565', '567', '570',
  '580', '581', '583', '584', '585', '586', '588', '590', '591', '592', '593', '594',
  '595', '596', '597', '598', '599', '751', '752', '753', '754', '882', '883', '856',
  '886', '887'];


/*
 * Create array all tags width category 8
 */
export const TAG_WIDH_CAT_8 = [
  '760', '762', '765', '767', '770', '772', '773', '774', '775',
  '776', '777', '780', '785', '786', '787', '791', '792'];

export const TAG_WITH_NO_HEADING_ASSOCIATED = union(TAG_WIDH_CAT_7, TAG_WIDH_CAT_8);

export const FIXED_FIELD_TEMPLATE = (code, typeCode) => {
  return {
    'code': code,
    'mandatory': true,
    'fixedField': {
      'categoryCode': 1,
      'headerTypeCode': typeCode,
      'code': code,
      'displayValue': '',
      'sequenceNumber': 0
    },
    'added': true
  };
};

export const VARIABLE_EMPTY_TEMPLATE = (tag) => {
  return {
    'code': tag.code,
    'mandatory': false,
    'variableField': {
      'keyNumebr': 0,
      'code': tag.code,
      'displayValue': tag.displayValue,
      'sequenceNumber': 0
    },
    'added': true
  };
};

export const RECORD_ACTION = {
  CREATION_MODE: 'new',
  EDIT_MODE: 'edit'
};

export const LOCK_ENTITY_TYPE = {
  R: 'R',
  H: 'H',
  C: 'C'
};
export const SUBFIELD_DELIMITER = '\u001f';
export const withSeparator = (s) => ((s) ? s.replace(SUBFIELD_DELIMITER, '$') : '');
