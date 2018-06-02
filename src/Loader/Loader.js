import React from 'react';
import Icon from '@folio/stripes-components/lib/Icon';

import css from './Loader.css';

class CatalogingLoader extends React.Component {
  render() {
    return (
      <div className={css.contentLoadingRow}>
        <div className={css.contentLoading}>
          <Icon icon="spinner-ellipsis" width="35px" />
        </div>
      </div>
    );
  }
}

export default CatalogingLoader;
