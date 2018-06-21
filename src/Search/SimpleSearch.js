import React from 'react';
import * as C from '../Utils';

// const filterConfig = [
//   {
//     label: 'Index',
//     name: 'index',
//     cql: 'index',
//     values: [
//       { name: 'NT Parola chiave Nota', cql: 'true' },
//       { name: 'PW Parola chiave Editore', cql: 'false' },
//       { name: 'SW Parola chiave Soggetto', cql: 'false' },
//       { name: 'NW Parola chiave Nome', cql: 'false' },
//       { name: 'TW Parola chiave Titolo', cql: 'false' },
//       { name: 'AW Parola chiave (intero record)', cql: 'false' },
//     ],
//   },
// ];

class SimpleSearch extends React.Component {
  static manifest = Object.freeze({
    initializedFilterConfig: { initialValue: false },
    query: { initialValue: {} },
    resultCount: { initialValue: C.INITIAL_RESULT_COUNT },
    recordsSearch: {

    }
  });
}

export default SimpleSearch;
