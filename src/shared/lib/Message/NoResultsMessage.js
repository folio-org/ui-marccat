// @flow
import * as React from 'react';
import { Icon } from '@folio/stripes/components';
import type { Props } from '../../../flow/types.js.flow';
import css from '../Style/NoResultsMessage.css';

const NoResultsMessage = ({ ...props }: Props) => {
  const { translate, store } = props;
  const filterText = store.getState().form.searchForm.values.searchTextArea;

  let query = `${translate({ id: 'ui-marccat.error.noresults.message' })}. `;
  if (filterText.length > 0) {
    query = `${translate({ id: 'ui-marccat.error.noresultsfoundfor.message' })} "${filterText}". `;
  }

  return (
    <div className={css.noResultsMessage}>
      <div className={css.noResultsMessageLabelWrap}>
        <Icon iconRootClass={css.noResultsMessageIcon} icon="search" />
        <span className={css.noResultsMessageLabel}>
          {query}
          { translate({
            id: 'ui-marccat.error.checkspellingfilters.message',
          })}
        </span>
      </div>
    </div>
  );
};
export default NoResultsMessage;
