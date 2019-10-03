// @flow
import { union } from 'lodash';
import { EMPTY_STRING, EMPTY_SPACED_STRING } from '../../../config/constants';

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
export const TAGS_NAME = {
  _001: 'Tag001',
  _003: 'Tag003',
  _005: 'Tag005',
  _006: 'Tag006',
  _007: 'Tag007',
  _008: 'Tag008',
  _040: 'Tag040'
};
/*
 * Create array all tags width category 7
 */
export const TAG_WIDH_CAT_7 = [
  '018', '033', '040', '041', '043', '045', '046', '047', '048', '034',
  '037', '250', '254', '255', '256', '257', '258', '263', '270', '300',
  '306', '307', '310', '321', '336', '337', '338', '340', '342', '343',
  '344', '345', '346', '347', '348', '351', '352', '355', '357', '362',
  '363', '365', '366', '370', '377', '380', '381', '382', '383', '384',
  '385', '386', '388', '490', '500', '501', '502', '504', '505', '506',
  '507', '508', '510', '511', '513', '514', '515', '516', '518', '520',
  '521', '522', '523', '524', '525', '526', '530', '533', '534', '535',
  '536', '538', '540', '541', '542', '544', '545', '546', '547', '550',
  '552', '555', '556', '561', '562', '563', '565', '567', '580', '581',
  '583', '584', '585', '586', '588', '590', '591', '592', '593', '594',
  '595', '596', '597', '598', '599', '751', '752', '753', '754', '882',
  '883', '856', '886', '887', '990', '991', '992', '993', '994', '995',
  '996', '997', '998', '999'];


/*
 * Create array all tags width category 8
 */
export const TAG_WIDH_CAT_8 = [
  '760', '762', '765', '767', '770', '772', '773', '774', '775',
  '776', '777', '780', '785', '786', '787', '791', '792'];

export const TAG_NOT_REPEATABLE = [
  '001', '003', '005', '008', '010', '018', '036', '038', '040',
  '042', '043', '044', '045', '066', '100', '110', '111',
  '130', '240', '245', '250', '254', '256', '257', '263',
  '306', '310', '357', '507', '514', '841', '842', '844'
];

export const TAG_MANDATORY = ['001', '005', '008', '040'];

export const TAG_WITH_NO_HEADING_ASSOCIATED = union(TAG_WIDH_CAT_7, TAG_WIDH_CAT_8);

export const VISUAL_RUNNING_TIME = 'visualRunningTime';
export const IMAGE_BIT_DEPTH = 'imageBitDepth';
export const DATE_FIRST_PUBBLICATION = 'dateFirstPublication';
export const DATE_LAST_PUBBLICATION = 'dateLastPublication';


export const RECORD_ACTION = {
  CREATION_MODE: 'new',
  EDIT_MODE: 'edit',
  DUPLICATE_MODE: 'duplicate'
};

export const SORTED_BY = {
  CODE: 'code'
};

export const LOCK_ENTITY_TYPE = {
  R: 'R',
  H: 'H',
  C: 'C'
};
export const SUBFIELD_DELIMITER = '\u001f';
export const SUBFIELD_CHARACTER = '$';

export const EMPTY_FIXED_FIELD = (code: String): Object => {
  return {
    code,
    mandatory: false,
    fieldStatus: RECORD_FIELD_STATUS.NEW,
    fixedField: {
      headerTypeCode: 0,
      code,
      displayValue: EMPTY_STRING,
      sequenceNumber: 0
    },
    added: true
  };
};


export const EMPTY_VARIABLE_FIELD = {
  code: EMPTY_STRING,
  mandatory: false,
  fieldStatus: RECORD_FIELD_STATUS.NEW,
  variableField: {
    keyNumber: 0,
    code: EMPTY_STRING,
    ind1: EMPTY_SPACED_STRING,
    ind2: EMPTY_SPACED_STRING,
    displayValue: EMPTY_STRING,
    headingTypeCode: 0,
    sequenceNumber: 0,
    skipInFiling: 0,
    subfields: [],
  },
  added: true
};

export const COMMON_DISPLAY_VALUE_PROPERTY = {
  jcategoryCode: 1,
  sequenceNumber: 0,
  displayValue: EMPTY_STRING,
  dateFirstPublication: '    ',
  dateLastPublication: '    '
};
