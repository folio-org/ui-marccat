// @flow
import * as React from 'react';
import { Icon } from '@folio/stripes/components';
import type { Props } from '../../../flow/types.js.flow';
import css from '../Style/EmptyMessage.css';

const EmptyMessage = ({ ...props }: Props) => {
  const { translate } = props;
  return (
    <div className={css.emptyMessage}>
      <div className={css.emptyMessageLabelWrap}>
        <Icon iconRootClass={css.emptyMessageIcon} icon="arrow-left" />
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
