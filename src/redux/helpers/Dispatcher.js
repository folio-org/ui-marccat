export default class Dispatcher {
    query = (type, params, { path }) => ({
      type: '@@ui-marccat/QUERY',
      data: {
        type,
        path,
        params,
        timestamp: Date.now()
      }
    });
}
