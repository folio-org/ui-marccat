import React from 'react';
import Pane from '@folio/stripes-components/lib/Pane';
import Paneset from '@folio/stripes-components/lib/Paneset';
import { connect } from '@folio/stripes-connect';
import * as C from '../Utils';

type IndexListProps = {
};

type IndexListState = {
  open: boolean;
}

class IndexList extends React.Component<IndexListProps, IndexListState> {
  constructor(props) {
    super(props);
    this.state = {
      open: true, // eslint-disable-line react/no-unused-state
    };
  }

  render() {
    return (
      <Paneset
        static
      >
        <Pane
          dismissible
          defaultWidth="100%"
          paneTitle={<h2>INDEX GUIDE</h2>}
        >
          <Paneset static>
            <Pane
              defaultWidth="fill"
              paneTitle={<h3>Main Indexes</h3>}
              paneSub=""
              appIcon={{ app: 'cataloging' }}
            />
            <Pane
              defaultWidth="fill"
              paneTitle={<h3>Secondary Indexes</h3>}
              paneSub=""
              appIcon={{ app: 'cataloging' }}
            />
          </Paneset>
        </Pane>
      </Paneset>
    );
  }
}

export default connect(IndexList, C.META.MODULE_NAME);
