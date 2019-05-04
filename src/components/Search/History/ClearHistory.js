// @flow
import * as React from 'react';
import { Headline, Row, IconButton } from '@folio/stripes/components';
import { Localize } from '../../../utils/Function';
import style from '../../../shared/lib/Style/Dropdown.css';

export default ({ ...props }) => {
  const { searchPerformed, resetHistory } = props;
  return (
    <Row>
      <div className={style.dropdownContainer}>
        <Headline size="small" margin="medium" tag="h3">
          {Localize({ key: 'search.history.title', value: searchPerformed })}
        </Headline>
      </div>
      <div className={style.clearHistoryContainer}>
        <IconButton
          key="icon-trash-history"
          icon="trash"
          badgeCount={searchPerformed}
          onClick={resetHistory}
          className={style.clearHistory}
        />
      </div>
    </Row>
  );
};
