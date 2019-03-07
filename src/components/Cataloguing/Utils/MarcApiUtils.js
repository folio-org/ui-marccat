import { ACTION } from '../../../redux/helpers/Action';
import { ENDPOINT } from './Constant';
import { EMPTY_STRING } from '../../../utils/Constant';

// MARC action creator

/**
 *
 * @param {*} payload
 */
export const headingAction = (payload) => {
  return {
    type: ACTION.CREATE,
    data: {
      path: ENDPOINT.CREATE_HEADING_URL,
      type: `${payload.id}-${payload.tag}-`,
      params: ENDPOINT.DEFAULT_LANG_VIEW,
    },
    payload
  };
};
/**
 *
 * @param {*} id
 * @param {*} payload
 */
export const deleteRecordAction = (id, payload) => {
  return {
    type: ACTION.DELETE,
    data: {
      path: ENDPOINT.BIBLIOGRAPHIC_RECORD + '/' + id,
      type: `deleteRecord-${id}`,
      params: 'view=1',
      id,
      payload
    }
  };
};

/**
 *
 * @param {*} item
 * @param {*} props
 */
export const createNewHeading = (item, props) => {
  const { dispatch } = props;
  const heading = {
    indicator1: item.ind1 || EMPTY_STRING,
    indicator2: item.ind2 || EMPTY_STRING,
    stringText:  item.displayValue,
    tag: item.code
  };
  dispatch(headingAction(heading));
};
