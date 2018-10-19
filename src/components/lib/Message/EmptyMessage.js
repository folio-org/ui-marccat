/**
 * @format
 * @flow
 */
import * as React from 'react';
import Icon from '@folio/stripes-components/lib/Icon';
import css from './EmptyMessage.css';
import type { Props } from '../../../core';

type P = Props & {};

const EmptyMessage = ({ ...props }:P) => {
  return (
    <div className={css.emptyMessage}>
      <div className={css.emptyMessageLabelWrap}>
        <Icon iconRootClass={css.emptyMessageIcon} icon="left-arrow" />
        <span className={css.emptyMessageLabel}>{props.translate({
          id: 'ui-marccat.initial.title',
        })}
        </span>
      </div>
    </div>
  );
};
export default EmptyMessage;
