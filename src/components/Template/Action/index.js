import { ACTION } from '../../../shared';
import { ENDPOINT } from '../../../shared/config/constants';
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
      params: 'lang=ita',
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
      params: 'lang=ita&type=B',
    },
  };
};
