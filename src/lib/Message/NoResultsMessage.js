/**
 * @format
 * @flow
 */
import * as React from 'react';
import Icon from '@folio/stripes-components/lib/Icon';
import css from './NoResultsMessage.css';
import type { Props } from '../../core';

type P = Props & {};

const NoResultsMessage = ({ ...props }:P) => {
  const { translate } = props;
  return (
    <div className={css.noResultsMessage}>
      <div className={css.noResultsMessageLabelWrap}>
        <Icon iconRootClass={css.noResultsMessageIcon} icon="validation-error" />
        <span className={css.noResultsMessageLabel}>
          {translate({
            id: 'ui-marccat.error.noresults.message',
          })}
        </span>
      </div>
    </div>
  );
};
export default NoResultsMessage;
