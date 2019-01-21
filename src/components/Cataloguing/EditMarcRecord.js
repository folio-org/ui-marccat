import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import {
  Pane,
  Paneset,
  AccordionSet,
  Row,
  PaneMenu,
  Button,
  Accordion,
  KeyValue,
  Icon
} from '@folio/stripes/components';
import { ActionMenuTemplate, SingleCheckboxIconButton } from '../../lib';
import { MarcLeader, FixedFields } from '.';
import { injectCommonProp } from '../../core';
import { ActionTypes } from '../../redux/actions';
import { buildUrl } from '../../redux/helpers/Utilities';
import * as C from '../../utils/Constant';
import style from './Style/style.css';
import { remove, post } from '../../core/api/HttpService';
import { uuid } from './Utils/MarcUtils';
import VariableFields from './Marc/VariableFields';
import { StoreReducer } from '../../redux';

class EditMarcRecord extends Component {
  handleClose = () => {
    const { dispatch, router, toggleFilterPane } = this.props;
    dispatch({ type: ActionTypes.FILTERS, payload: {}, filterName: '', filterChecked: false });
    toggleFilterPane();
    router.push('/marccat/search');
  };

  saveRecord = () => {
    const body = { bibliographicRecord: this.composeBodyJson() };
    post(buildUrl(C.ENDPOINT.BIBLIOGRAPHIC_RECORD, 'lang=ita&view=1'), body);
  };

  composeBodyJson = () => {
    const { recordDetail: { bibliographicRecord }, store: { getState } } = this.props;
    const formData = getState().form.bibliographicRecordForm.values;
    const tagVariableData = getState().form.marcEditableListForm.values.items;

    const tag006Values = [];
    const tag007Values = [];
    const tag008Values = [];

    // Set leader
    bibliographicRecord.leader.value = formData.Leader;

    Object.keys(formData)
      .forEach((z) => {
        if (z.split('-')[0] === 'Tag006' || z === 'Tag006') {
          tag006Values.push({
            name: z.split('-')[1] || 'headerTypeCode',
            value: formData[z]
          });
        }
        if (z.split('-')[0] === 'Tag007' || z === 'Tag007') {
          tag007Values.push({
            name: z.split('-')[1] || 'headerTypeCode',
            value: formData[z]
          });
        }
        if (z.split('-')[0] === 'Tag008' || z === 'Tag008') {
          tag008Values.push({
            name: z.split('-')[1] || 'headerTypeCode',
            value: formData[z]
          });
        }
      });

    bibliographicRecord.fields
      .filter(f => f.code !== '001' || f.code !== '003' || f.code !== '005')
      .forEach(f => {
        if (f.code === '006') {
          tag006Values.forEach(v => {
            f.fixedField[v.name] = v.value;
          });
        }
        if (f.code === '007') {
          tag007Values.forEach(v => {
            f.fixedField[v.name] = v.value;
          });
        }
        if (f.code === '008') {
          tag008Values.forEach(v => {
            f.fixedField[v.name] = v.value;
          });
        }
      });

    tagVariableData.forEach(t => {
      if (t.code === '100' || t.code === '110' || t.code === '700') {
        t.categoryCode = '2';
        t.mandatory = false;
      }
    });
    return bibliographicRecord;
  }


  deleteRecord = () => {
    const { store, recordDetail } = this.props;
    const okapi = store.getState().okapi;
    const userName = okapi.currentUser.username;
    const id = recordDetail.id;
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
      data,
      headerTypes006IsLoading,
      headerTypes007IsLoading,
      headerTypes008IsLoading,
      recordDetail,
      leaderData,
    } = this.props;
    let bibliographicRecord;
    if (recordDetail) {
      bibliographicRecord = recordDetail;
    }
    return (!bibliographicRecord) ? <Icon icon="spinner-ellipsis" /> : (
      <React.Fragment>
        <Paneset static>
          <Pane
            defaultWidth="fullWidth"
            dismissible
            paneTitle="Edit Record"
            appIcon={{ app: C.META.ICON_TITLE }}
            actionMenu={ActionMenuTemplate}
            paneSub={(bibliographicRecord) ? 'id. ' + bibliographicRecord.id : ''}
            onClose={this.handleClose}
            lastMenu={this.renderButtonMenu()}
          >
            <Row center="xs">
              <div className={style.recordContainer}>
                <AccordionSet>
                  <KeyValue />
                  <form name="bibliographicRecordForm" onSubmit={this.saveRecord} formKey="bibliograficKey">
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
                        recordDetail={data.recordDetail}
                        headerTypes006IsLoading={headerTypes006IsLoading}
                        headerTypes007IsLoading={headerTypes007IsLoading}
                        headerTypes008IsLoading={headerTypes008IsLoading}
                        record={bibliographicRecord}
                      />
                    </Accordion>
                  </form>
                  <Accordion label={translate({ id: 'ui-marccat.cataloging.variablefield.section.label' })} id="variable-field">
                    <VariableFields
                      {...this.props}
                      fields={bibliographicRecord.fields.filter(f => f.fixedField === undefined || !f.fixedField)}
                    />
                  </Accordion>
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
  ({ marccat: { data, leaderData, headerTypes006, headerTypes007, headerTypes008 } }) => ({
    recordDetail: StoreReducer.resolve(data, 'marcRecordDetail').bibliographicRecord,
    headerTypes006Result: headerTypes006.records,
    leaderData: leaderData.records,
    headerTypes006IsLoading: headerTypes006.isLoading,
    headerTypes007Result: headerTypes007.records,
    headerTypes007IsLoading: headerTypes007.isLoading,
    headerTypes008Result: headerTypes008.records,
    headerTypes008IsLoading: headerTypes008.isLoading
  }),
)(injectCommonProp(EditMarcRecord)));
