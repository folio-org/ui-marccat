/**
 * @format
 * @flow
 */
import * as React from 'react';
import { Icon } from '@folio/stripes/components';
import type { Props } from '../../core';
import css from '../Style/EmptyMessage.css';

type P = Props & {};

const EmptyMessage = ({ ...props }:P) => {
  const { translate } = props;
  return (
    <div className={css.emptyMessage}>
      <div className={css.emptyMessageLabelWrap}>
        <Icon iconRootClass={css.emptyMessageIcon} icon="left-arrow" />
        <span className={css.emptyMessageLabel}>
          {translate({
            id: 'ui-marccat.initial.title',
          })}
        </span>
      </div>
    </div>
  );
};
export default EmptyMessage;
