/**
 * @format
 * @flow
 */
import * as React from 'react';
import { Icon } from '@folio/stripes-components';
import type { Props } from '../../core';
import css from '../Style/NoResultsMessage.css';

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
