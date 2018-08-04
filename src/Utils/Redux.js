// ACTIONS
export const actionTypes = {
  START: '@@ui-marccat/ad-search/START',
  PENDING: '@@ui-marccat/ad-search/PENDING',
  SUCCESS: '@@ui-marccat/ad-search/SUCCESS',
  FAILURE: '@@ui-marccat/ad-search/FAILURE',
};

/**
 * Helper for creating headers when making a request
 * @param {String} method - request method
 * @param {String} state.okapi.tenant - the Okapi tenant
 * @param {String} state.okapi.token - the Okapi user token
 * @returns {Object} headers for a new request
 */
export const getHeaders = (method, { okapi }) => {
  const headers = {
    'X-Okapi-Tenant': okapi.tenant,
    'X-Okapi-Token': okapi.token
  };

  if (method === 'PUT' || method === 'POST') {
    headers['Content-Type'] = 'application/vnd.api+json';
  }

  return headers;
};

export const parseResponseBody = (response) => {
  return response.text().then((text) => {
    try { return JSON.parse(text); } catch (e) { return text; }
  });
};
