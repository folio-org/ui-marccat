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
        dismissible
        defaultWidth="24%"
        actionMenu={() => <PanelHistory {...props} />}
        onClose={toggleFilterPane}
        paneTitle={localized('searchAndFilter', false)}
        paneSub={EMPTY_STRING}
      >
        {component}
      </Pane>}
      {children}
    </Paneset>
  );
}
