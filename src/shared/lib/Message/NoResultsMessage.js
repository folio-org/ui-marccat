// @flow
import * as React from 'react';
import { Icon } from '@folio/stripes/components';
import type { Props } from '../../../flow/types.js.flow';
import css from '../Style/NoResultsMessage.css';

const NoResultsMessage = ({ ...props }: Props) => {
  const { translate } = props;
  return (
    <div className={css.noResultsMessage}>
      <div className={css.noResultsMessageLabelWrap}>
        <Icon iconRootClass={css.noResultsMessageIcon} icon="exclamation-circle" />
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
