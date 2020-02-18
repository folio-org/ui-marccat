// @flow
import React, { Fragment } from 'react';
import {
  Icon,
  PaneHeader,
  Pane,
} from '@folio/stripes/components';
import { AppIcon } from '@folio/stripes-core';
import RecordDetails from '../RecordDetails';
import { injectProps } from '../../../../shared';
import DuplicateRecord from '../../Button/DuplicateRecord';
import { EditRecordButton, DuplicaRecordButton } from '../..';

class RecordDetailPane extends React.Component {
  // A simple action menu
  getActionMenu = (detail, { onToggle } = this.props) => (
    <Fragment>
      <EditRecordButton {...this.props} />
      <hr />
      <DuplicateRecord {...this.props} />
    </Fragment>
  );

  render() {
    const { detailPaneMeta, detail, onClose } = this.props;
    return (
      <Pane
        id="pane-details"
        defaultWidth="35%"
        renderHeader={renderProps => (
          <PaneHeader
            {...this.props}
            {...renderProps}
            actionMenu={this.getActionMenu}
            paneTitle={detailPaneMeta.title}
            paneSub={detailPaneMeta.subTitle}
            appIcon={
              detailPaneMeta.title.startsWith('Bib') ? (
                <AppIcon size="large" app="marccat" iconKey="marc-bib" />
              ) : (
                <AppIcon size="large" app="marccat" iconKey="marc-authority" />
              )
            }
            dismissible
            onClose={onClose}
          />
        )}
      >
        {!detail ? (
          <Icon icon="spinner-ellipsis" />
        ) : (
          <RecordDetails {...this.props} detail={detail} />
        )}
      </Pane>
    );
  }
}
export default injectProps(RecordDetailPane);
