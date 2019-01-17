import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field, change } from 'redux-form';
import {
  Pane,
  Paneset,
  AccordionSet,
  Row,
  TextField,
  PaneMenu,
  Col,
  Button,
  Accordion,
  KeyValue,
  Icon
} from '@folio/stripes/components';
import MarcField from './Marc/MarcField';
import { ActionMenuTemplate, SingleCheckboxIconButton } from '../../lib';
import { MarcLeader, FixedFields } from '.';
import { injectCommonProp } from '../../core';
import { ActionTypes } from '../../redux/actions';
import { findParam, buildUrl } from '../../redux/helpers';
import * as C from '../../utils/Constant';
import style from './Style/style.css';
import { remove, put } from '../../core/api/HttpService';
import { uuid } from './Utils/MarcUtils';
import VariableFields from './Marc/VariableFields';

class EditMarcRecord extends Component {
  // eslint-disable-next-line react/no-deprecated
  componentWillMount() {
    const { store } = this.props;
    const id = findParam('id');
    store.dispatch({ type: ActionTypes.LOCK_RECORD, id });
  }

  handleClose = () => {
    const { dispatch, router, toggleFilterPane } = this.props;
    dispatch({ type: ActionTypes.FILTERS, payload: {}, filterName: '', filterChecked: false });
    toggleFilterPane();
    router.push('/marccat/search');
  };

  saveRecord = () => {
    const { isEditingMode } = this.state;
    const body = { bibliographicRecord: this.composeBodyJson() };
    put(buildUrl(C.ENDPOINT.BIBLIOGRAPHIC_RECORD, 'lang=ita&view=1'), body);
    if (isEditingMode) this.lockRecord(false);
  };

  deleteRecord = () => {
    const { store, recordDetail } = this.props;
    const okapi = store.getState().okapi;
    const userName = okapi.currentUser.username;
    const id = recordDetail.bibliographicRecord.id;
    const uid = uuid();
    remove(buildUrl(C.ENDPOINT.BIBLIOGRAPHIC_RECORD + '/' + id, `id=${id}&uuid=${uid}&userName=${userName}&lang=ita&view=1`), null);
    setTimeout(() => {
      this.handleClose();
    });
  };

  renderButtonMenu = () => {
    const { translate } = this.props;
    const rightButton = {
      marginRight: '10px',
      float: 'right',
    };
    return (
      <React.Fragment>
        <PaneMenu>
          <Button
            style={rightButton}
            buttonStyle="primary"
            onClick={this.saveRecord}
            type="button"
            marginBottom0
          >
            <Icon icon="plus-sign">
              {translate({ id: 'ui-marccat.template.record.edit' })}
            </Icon>
          </Button>
          <Button
            style={rightButton}
            buttonStyle="primary"
            onClick={this.deleteRecord}
            type="button"
            disabled={false}
            marginBottom0
          >
            <Icon icon="trash">
              Delete Record
            </Icon>
          </Button>
        </PaneMenu>
      </React.Fragment>
    );
  };


  render() {
    const {
      translate,
      recordDetail,
      headerTypes006IsLoading,
      headerTypes007IsLoading,
      headerTypes008IsLoading,
      leaderData,
      dispatch,
    } = this.props;
    let bibliographicRecord;
    let variableFields;
    let displayVal;
    let pippo;
    if (recordDetail) {
      bibliographicRecord = recordDetail.bibliographicRecord;
      variableFields = bibliographicRecord.fields.filter(f => f.fixedField === undefined || !f.fixedField);
      displayVal = variableFields.map(v => v.variableField.displayValue);
      pippo = displayVal[0];
    }
    const fieldStyle = { flex: '0 0 20%', width: ' 20%', padding: '6px' };
    const lastFieldStyle = { flex: '0 0 40%', width: ' 40%', padding: '6px' };
    return (!bibliographicRecord) ? <Icon icon="spinner-ellipsis" /> : (
      <React.Fragment>
        <Paneset static>
          <Pane
            defaultWidth="fullWidth"
            dismissible
            paneTitle="Edit Record"
            appIcon={{ app: C.META.ICON_TITLE }}
            actionMenu={ActionMenuTemplate}
            onClose={this.handleClose}
            lastMenu={this.renderButtonMenu()}
          >
            <Row center="xs">
              <div className={style.recordContainer}>
                <AccordionSet>
                  <KeyValue />
                  <form name="bibliographicRecordForm" onSubmit={this.saveRecord}>
                    <Accordion label="Suppress" id="suppress" separator={false}>
                      <SingleCheckboxIconButton labels={['Suppress from Discovery']} pullLeft widthPadding />
                    </Accordion>
                    <Accordion label="Leader" id="leader">
                      <MarcLeader
                        {...this.props}
                        readOnly
                        leaderData={leaderData}
                        leaderCode={bibliographicRecord.leader.code}
                        leaderValue={bibliographicRecord.leader.value}
                      />
                    </Accordion>
                    <Accordion label="Control fields (001, 003, 005)" id="control-field">
                      <FixedFields
                        {...this.props}
                        recordDetail={recordDetail}
                        headerTypes006IsLoading={headerTypes006IsLoading}
                        headerTypes007IsLoading={headerTypes007IsLoading}
                        headerTypes008IsLoading={headerTypes008IsLoading}
                        record={bibliographicRecord}
                      />
                    </Accordion>
                    <Accordion label={translate({ id: 'ui-marccat.cataloging.variablefield.section.label' })} id="variable-field">
                      <Row between="xs" className={style.marcEditableListFormHeader}>
                        <Col xs>
                          <Row end="xs" style={{ float: 'right' }}>
                            <Col xs>
                              <Button
                                buttonStyle="primary"
                                onClick={() => {}}
                              >
                                <Icon icon="edit">Edit</Icon>
                              </Button>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                      {variableFields.map((f, i) => (
                        <VariableFields
                          {...this.props}
                          record={f || {}}
                          idx={i}
                        />
                      ))}
                    </Accordion>
                  </form>
                </AccordionSet>
              </div>
            </Row>
          </Pane>
        </Paneset>
      </React.Fragment>
    );
  }
}

export default reduxForm({
  form: 'bibliographicRecordForm',
  navigationCheck: true,
  enableReinitialize: true,
  destroyOnUnmount: false,
})(connect(
  ({ marccat: { recordDetail, leaderData, headerTypes006, headerTypes007, headerTypes008 } }) => ({
    recordDetail: recordDetail.record,
    headerTypes006Result: headerTypes006.records,
    leaderData: leaderData.records,
    headerTypes006IsLoading: headerTypes006.isLoading,
    headerTypes007Result: headerTypes007.records,
    headerTypes007IsLoading: headerTypes007.isLoading,
    headerTypes008Result: headerTypes008.records,
    headerTypes008IsLoading: headerTypes008.isLoading
  }),
)(injectCommonProp(EditMarcRecord)));
