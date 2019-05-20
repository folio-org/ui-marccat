import React, { memo } from 'react';
import classNames from 'classnames';

import { Icon } from '@folio/stripes/components';

import css from './Preloader.css';

const Preloader = memo(props => {
  const {
    preloaderClassName,
    message,
  } = props;

  return (
    <div className={classNames(css.preloader, preloaderClassName)}>
      {message}
      <Icon
        icon="spinner-ellipsis"
        size="small"
        iconClassName={css.spinner}
      />
    </div>
  );
});


export default Preloader;
