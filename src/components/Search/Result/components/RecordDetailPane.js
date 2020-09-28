// @flow
import React, { Fragment } from 'react';
import {
  Icon,
  PaneHeader,
  Pane,
  ConfirmationModal,
  Callout,
} from '@folio/stripes/components';
import { AppIcon } from '@folio/stripes-core';
import { FormattedMessage } from 'react-intl';
import SafeHTMLMessage from '@folio/react-intl-safe-html';
import { ACTION } from '../../../../redux/actions/Actions';
import { showValidationMessage } from '../../../Cataloguing/Utils/MarcApiUtils';
import * as C from '../../../../config/constants';
import RecordDetails from '../RecordDetails';
import { injectProps, del, buildUrl } from '../../../../shared';
import DuplicateRecord from '../../Button/DuplicateRecord';
import { EditRecordButton, DeleteRecordButton } from '../..';

class RecordDetailPane extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalDeleteShow: false,
    };
    this.callout = React.createRef();
  }

  deleteRecord = async () => {
    let { statusCode } = this.state;
    const { detailPaneMeta, queryMoreBib, queryMoreAuth, dispatch, store, router, reset, translate } = this.props;

    await del(
      buildUrl(
        store.getState(),
        C.ENDPOINT.BIBLIOGRAPHIC_RECORD + '/' + detailPaneMeta.meta['001'],
        C.ENDPOINT.DEFAULT_LANG_VIEW
      ),
      detailPaneMeta.meta['001'],
      store.getState()
    )
      .then(r => {
        statusCode = r.status;
      })
      .then(() => {
        if (statusCode === 204) {
          showValidationMessage(
            this.callout,
            translate({ id: 'ui-marccat.search.record.deletemodal.deletesuccess' }),
            'success'
          );
          setTimeout(() => {
            reset();
            dispatch({ type: ACTION.SEARCHBIB, isFromCat: 'N', moreData: 'N', queryBib: queryMoreBib, queryAuth: queryMoreAuth, from: '1', to: '30' });
            dispatch({ type: ACTION.CLOSE_PANELS, closePanels: true });
            return router.push('/marccat/search');
          }, 2000);
        } if (statusCode === 423) {
          showValidationMessage(
            this.callout,
            translate({ id: 'ui-marccat.search.record.deletemodal.notdeletedrecordused' }),
            'error'
          );
        } else {
          showValidationMessage(
            this.callout,
            translate({ id: 'ui-marccat.search.record.deletemodal.deletewrong' }),
            'error'
          );
        }
      });
  };

  handleClickDelete = () => {
    this.setState({
      modalDeleteShow: true,
    });
  };

  modalConfirm = () => {
    this.deleteRecord();
    this.setState({
      modalDeleteShow: false,
    });
  };

  modalCancel = () => {
    this.setState({
      modalDeleteShow: false,
    });
  };

  // A simple action menu
  getActionMenu = () => {
    return (
      <Fragment>
        <EditRecordButton {...this.props} />
        <DuplicateRecord {...this.props} />
        <DeleteRecordButton
          {...this.props}
          eHandleClickDelete={this.handleClickDelete}
        />
      </Fragment>
    );
  };

  render() {
    const { translate, detailPaneMeta, detail, onClose } = this.props;
    const { modalDeleteShow } = this.state;
    return (
      <Pane
        id="pane-details"
        defaultWidth="40%"
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

        <ConfirmationModal
          id="delete-confirmation-modal"
          buttonStyle="danger"
          data-test-delete-confirmation-modal
          open={modalDeleteShow}
          heading={
            <FormattedMessage id="ui-marccat.search.record.deletemodal.heading" />
          }
          message={
            <SafeHTMLMessage
              id="ui-marccat.search.record.deletemodal.message"
              values={{ name: detailPaneMeta.subTitle }}
            />
          }
          onConfirm={this.modalConfirm}
          onCancel={this.modalCancel}
          cancelLabel={translate({
            id: 'ui-marccat.search.record.deletemodal.cancel',
          })}
          confirmLabel={translate({
            id: 'ui-marccat.search.record.deletemodal.delete',
          })}
        />
        <Callout ref={this.callout} />
      </Pane>
    );
  }
}
export default injectProps(RecordDetailPane);
