import React from 'react';
import * as C from '../../constant';

class NewTagContainer extends React.Component {
    static manifest = Object.freeze({
      query: { initialValue: {} },
      resultCount: { initialValue: C.INITIAL_RESULT_COUNT },
      categories: {
        type: C.RESOURCE_TYPE,
        root: C.ENDPOINT.BASE_URL,
        path: C.ENDPOINT.CATEGORY_URL,
        headers: { 'x-okapi-tenant': 'tnx' },
        records: C.API_RESULT_JSON_KEY.CATEGORIES,
        GET: {
          params: { lang: 'ita' },
        },
      }
    });

    /* static propTypes = {
      stripes: PropTypes.shape({
        connect: PropTypes.func,
      }).isRequired
    }; */


    render() {
      return (
        <div> New tag container</div>
      );
    }
}

export default NewTagContainer;
