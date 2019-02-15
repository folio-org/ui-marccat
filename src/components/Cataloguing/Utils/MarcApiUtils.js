import { ENDPOINT } from '../../../utils/Constant';
import { ACTION } from '../../../redux/helpers/Action';

// MARC action
export const headingAction = (payload) => {
  return {
    type: ACTION.CREATE,
    data: {
      path: ENDPOINT.CREATE_HEADING_URL,
      type: `newHeading-${payload.tag}-` + Date.now(),
      params: 'lang=ita&view=1',
    },
    payload
  };
};

export const deleteRecordAction = (id, payload) => {
  return {
    type: ACTION.DELETE,
    data: {
      path: ENDPOINT.BIBLIOGRAPHIC_RECORD + '/' + id,
      type: `deleteRecord-${id}-` + Date.now(),
      params: 'view=1',
      id,
      payload
    }
  };
};
