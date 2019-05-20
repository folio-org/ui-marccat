// @flow
import * as React from 'react';
import { Paneset, Pane } from '@folio/stripes/components';
import PanelHistory from '../History/PanelHistory';
import { EMPTY_STRING } from '../../../config/constants';
import { Localize } from '../../../shared';

export default function SearchPane(props) {
  const { component, filterPaneIsVisible, toggleFilterPane, children } = props;
  return (
    <Paneset static>
      {filterPaneIsVisible &&
        <Pane
          dismissible
          defaultWidth="24%"
          actionMenu={() => <PanelHistory {...props} />}
          onClose={toggleFilterPane}
          paneTitle={Localize({ key: 'searchAndFilter' })}
          paneSub={EMPTY_STRING}
        >
          {component}
        </Pane>}
      {children}
    </Paneset>
  );
}
