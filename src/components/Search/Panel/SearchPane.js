// @flow
import * as React from 'react';
import { Paneset, Pane } from '@folio/stripes/components';
import PanelHistory from '../History/PanelHistory';
import { EMPTY_STRING } from '../../../config/constants';

export default function SearchPane(props) {
  const { component, localized, filterPaneIsVisible, toggleFilterPane, children } = props;
  return (
    <Paneset static>
      {filterPaneIsVisible &&
        <Pane
          data-test-history-search
          defaultWidth="320px"
          actionMenu={() => <PanelHistory {...props} />}
          onClose={toggleFilterPane}
          paneTitle={localized('searchAndFilter', false)}
          paneSub={EMPTY_STRING}
        >
          {component}
        </Pane>}
      {!filterPaneIsVisible &&
        <Pane
          defaultWidth="0px"
          onClose={toggleFilterPane}
          paneTitle={localized('searchAndFilter', false)}
          paneSub={EMPTY_STRING}
        />}
      {children}
    </Paneset>
  );
}
