/* MARCCAT DB ACTIONS TYPES */
export const actionTypes = {
  QUERY: '@@ui-marccat/db/QUERY',
  FIND: '@@ui-marccat/db/FIND',
  SAVE: '@@ui-marccat/db/SAVE',
  CREATE: '@@ui-marccat/db/CREATE',
  DELETE: '@@ui-marccat/db/DELETE',
  RESOLVE: '@@ui-marccat/db/RESOLVE',
  REJECT: '@@ui-marccat/db/REJECT',
  UNLOAD: '@@ui-marccat/db/UNLOAD'
};


/* MARCCAT DB ACTIONS CREATOR */


/**
 * Action creator for querying a set of records
 * @param {String} type - resource type
 * @param {Object} params - query params
 * @param {String} options.path - path to use for the query
 */
export const query = (type, params, { path }) => ({
  type: actionTypes.QUERY,
  data: {
    type,
    path,
    params,
    timestamp: Date.now()
  }
});

/**
 * Action creator for finding a single record
 * @param {String} type - resource type
 * @param {String} id - record id
 * @param {String} options.path - path to use for the request
 * @param {String|[String]} [options.include] - additional resources
 * to include via the `?include` query param
 */
export const find = (type, id, { path, include }) => ({
  type: actionTypes.FIND,
  data: {
    type,
    path,
    params: { id, include },
    timestamp: Date.now()
  }
});

/**
 * Action creator for saving a record
 * @param {String} type - resource type
 * @param {Object} payload - record payload
 * @param {String} [options.path] - path to use
 */
export const save = (type, payload, { path }) => ({
  type: actionTypes.SAVE,
  data: {
    type,
    path,
    params: { id: payload.data.id },
    timestamp: Date.now()
  },
  payload
});

/**
 * Action creator for creating a record
 * @param {String} type - resource type
 * @param {Object} payload - record payload
 * @param {String} [options.path] - path to use
 */
export const create = (type, payload, { path }) => ({
  type: actionTypes.CREATE,
  data: {
    type,
    path,
    params: {},
    timestamp: Date.now()
  },
  payload
});


/**
 * Action creator for destroying a record
 * @param {String} type - resource type
 * @param {Object} payload - record payload
 * @param {String} [options.path] - path to use
 */
export const destroy = (type, payload, { path }) => ({
  type: actionTypes.DELETE,
  data: {
    type,
    path,
    params: {
      id: payload.data.id,
      isTitleCustom: payload.data.attributes.isTitleCustom
    },
    timestamp: Date.now()
  }
});

/**
 * Action creator for uloading a record
 * @param {String} type - resource type
 * @param {String|[String]} ids - one or more record ids
 */
export const unload = (type, ids) => ({
  type: actionTypes.UNLOAD,
  data: {
    type,
    ids: [].concat(ids)
  }
});

