import React from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import TextArea from '@folio/stripes-components/lib/TextArea';
import Pane from '@folio/stripes-components/lib/Pane';
import * as C from '../Utils/Constant';

type Props= {
    items:Array<any>,
}

function RowDetails(props:Props) {
  return (
    <Pane
      defaultWidth="30%"
      paneTitle={<FormattedMessage id="ui-marccat.browsing.detail" />}
      appIcon={{ app: C.META.ICON_TITLE }}
    >
      <TextArea
        value={props.items}
      />
    </Pane>
  );
}


export default (connect(
  ({ marccat: { details, scan } }) => ({
    items: details.records,
    headings: scan.records
  })
)(RowDetails));
