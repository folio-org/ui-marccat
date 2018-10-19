import React from 'react';
import Pane from '@folio/stripes-components/lib/Pane';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { ToolbarButtonMenu, DotLoader } from '../../lib';
import * as C from '../../../utils/Constant';


function DetailResult({ ...props }) {
  const { actionMenuItems, rightButton, headings, detailPanelIsVisible } = props; // eslint-disable-line
  const rightMenuEdit = <ToolbarButtonMenu create {...props} label="ui-marccat.search.record.edit" style={rightButton} />;
  return (
    <Pane
      id="pane-details"
      paneTitle={<FormattedMessage id="ui-marccat.search.record.preview" />}
      paneSub={(headings) ? headings.length : 'No results'}
      appIcon={{ app: C.META.ICON_TITLE }}
      dismissible
      onClose={() => this.setState({ detailPanelIsVisible: false })}
      actionMenuItems={actionMenuItems}
      lastMenu={rightMenuEdit}
    >
      {(this.props.fetchingDetail) ? <DotLoader {...props} /> : <div />}
    </Pane>
  );
}

export default (connect(
  ({ marccat: { details } }) => ({
    fetchingDetail: details.isLoadingDetail
  })
)(DetailResult));
