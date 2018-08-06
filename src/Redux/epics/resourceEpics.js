// import actionCreatorsFor from '@folio/stripes-connect/RESTResource/actionCreatorsFor';
import { actionTypes as ActionTypes } from '../actions/Actions';

export default function mutationEpics(resource) {
  const options = resource.optionsTemplate;

  return ActionTypes.map(actionName =>
    (action$) => action$
      .ofType(`@@stripes-connect/${actionName}`)
      .filter(action => action.meta.resource === resource.name)
      .map(action => {
        const path = options.path && options.path.replace(/[\/].*$/g, ''); // eslint-disable-line no-useless-escape
        const { name } = resource;
        const meta = Object.assign({}, action.meta, { path, name });
        return { ...action, meta, type: 'REFRESH' };
      }));
}

