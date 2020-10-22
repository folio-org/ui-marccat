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
    const { detailPaneMeta, queryMoreBib, queryMoreAuth, dispatch, store, router, reset, translate, bibsOnly } = this.props;
    const endPoint = bibsOnly ? C.ENDPOINT.BIBLIOGRAPHIC_RECORD : C.ENDPOINT.AUTHORITY_RECORD;

    const resp = await del(
      buildUrl(
        store.getState(),
        endPoint + '/' + detailPaneMeta.meta['001'],
        C.ENDPOINT.DEFAULT_LANG_VIEW
      ),
      detailPaneMeta.meta['001'],
      store.getState()
    );
    const statusCode = resp.status;
    this.setState({
      modalDeleteShow: false,
    });
    if (statusCode === 204) {
      showValidationMessage(this.callout, translate({ id: 'ui-marccat.search.record.deletemodal.deletesuccess' }), 'success');
      const promise = new Promise((resolve) => {
        setTimeout(() => {
          reset();
          dispatch({
            type: ACTION.SEARCHBIB,
            isFromCat: 'N',
            moreData: 'N',
            queryBib: queryMoreBib,
            queryAuth: queryMoreAuth,
            from: '1',
            to: '30',
          });
          dispatch({ type: ACTION.CLOSE_PANELS, closePanels: true });
          resolve(true);
        }, 2000);
        promise.then(router.push('/marccat/search'));
      });
    } else if (statusCode === 423) {
      const msg423 = bibsOnly
        ? translate({ id: 'ui-marccat.search.record.deletemodal.notdeletedrecordused.bib' })
        : translate({ id: 'ui-marccat.search.record.deletemodal.notdeletedrecordused.auth' });
      showValidationMessage(this.callout, msg423, 'error');
    } else {
      showValidationMessage(this.callout, translate({ id: 'ui-marccat.search.record.deletemodal.deletewrong' }), 'error');
    }
  };

  handleClickDelete = () => {
    this.setState({
      modalDeleteShow: true,
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
          id="data-test-record-detail-pane-delete"
        />
      </Fragment>
    );
  };

  render() {
    const { translate, detailPaneMeta, detail, onClose, bibsOnly } = this.props;
    const { modalDeleteShow } = this.state;
    return (
      <Pane
        id="record-pane-details"
        defaultWidth="40%"
        renderHeader={renderProps => (
          <PaneHeader
            {...this.props}
            {...renderProps}
            actionMenu={this.getActionMenu}
            paneTitle={detailPaneMeta.title}
            paneSub={detailPaneMeta.subTitle}
            appIcon={
              bibsOnly ? (
                <AppIcon size="large" app="marccat" iconKey="marc-bib" />
              ) : (
                <AppIcon size="large" app="marccat" iconKey="marc-authority" />
              )
            }
            dismissible
            onClose={onClose}
            id="data-test-search-detail-pane"
          />
        )}
      >
        {!detail ? (
          <Icon icon="spinner-ellipsis" />
        ) : (
          <RecordDetails {...this.props} detail={detail} />
        )}

        <ConfirmationModal
          id="record-detail-delete-confirmation-modal"
          buttonStyle="danger"
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
          onConfirm={this.deleteRecord}
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
