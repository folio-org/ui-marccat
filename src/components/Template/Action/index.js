import { ACTION } from '../../../redux';
import { ENDPOINT } from '../../../config/constants';

/**
 *
 * @return {*} payload
 */
export const loadTemplatesAction = () => {
  return {
    type: ACTION.QUERY,
    data: {
      path: ENDPOINT.AUTOSUGGESTION_TAG_URL,
      type: 'tags',
      params: 'lang=eng',
    },
  };
};

/**
 *
 * @return {*} payload
 */
export const createTemplateAction = () => {
  return {
    type: ACTION.QUERY,
    data: {
      path: ENDPOINT.VIEW_TEMPLATE_URL,
      type: 'template',
      params: 'lang=eng&type=B',
    },
  };
};
