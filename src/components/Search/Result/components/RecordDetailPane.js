// @flow
import React, { Fragment } from 'react';
import {
  Button,
  Icon,
  Checkbox,
  RadioButton,
  MenuSection,
  PaneHeader,
  Pane,
} from '@folio/stripes/components';
import { AppIcon } from '@folio/stripes-core';
import RecordDetails from '../RecordDetails';
import { injectProps, Localize, findParam } from '../../../../shared';
import { duplicaRecordAction } from '../../Actions';
import { EditRecordButton } from '../..';

class RecordDetailPane extends React.Component {

  duplicaRecord = props => {
    const id = findParam('id') || findParam('savedId');
    const { store } = props;
    const cb = r => this.onDuplicate(r);
    store.dispatch(duplicaRecordAction(id, cb));
  };

  onDuplicate = response => {
    const { router, toggleFilterPane } = this.props;
    setTimeout(() => {
      toggleFilterPane();
      router.push(
        `/marccat/cataloging?id=${response.bibliographicRecord.id}&mode=duplicate`
      );
    }, 3000);
  };

  // A simple action menu
  getActionMenu = ({ onToggle } = this.props) => (
    <Fragment>
      <EditRecordButton {...this.props} />
      <hr />
      <Button buttonStyle="dropdownItem">
        <Icon icon="duplicate">
          {Localize({
            key: 'search.actionmenu.duplicate',
            action: () => this.duplicaRecord(props),
          })}
        </Icon>
      </Button>
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
