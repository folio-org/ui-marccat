import querystring from 'query-string';

/**
 * Helper for creating headers when making a request
 * @param {String} method - request method
 * @param {String} state.okapi.tenant - the Okapi tenant
 * @param {String} state.okapi.token - the Okapi user token
 * @returns {Object} headers for a new request
 */
export const querystringgetHeaders = (method, { okapi }) => {
  const headers = {
    'X-Okapi-Tenant': okapi.tenant,
    'X-Okapi-Token': okapi.token
  };

  if (method === 'PUT' || method === 'POST') {
    headers['Content-Type'] = 'application/vnd.api+json';
  }

  return headers;
};

  /**
   * Sometimes the response from the server (or mirage) does not include a
   * body (null). This causes `response.json()` to error with something like
   * "unexpected end of input". This workaround uses `response.text()` and
   * when there are any errors parsing it using `JSON.parse`, the text is
   * returned instead.
   */
export const parseResponseBody = (response) => {
  return response.text().then((text) => {
    try { return JSON.parse(text); } catch (e) { return text; }
  });
};

export const buildQuery = (store) => {
  const { form } = store.getState();
  const { values } = form.searchForm;
  return querystring.stringify(
    values.selectIndexes
      .concat(' ')
      .concat(values.searchTextArea)
  );
};
