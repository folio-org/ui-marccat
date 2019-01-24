import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { reduxForm } from 'redux-form';
import {
  Pane,
  Paneset,
  AccordionSet,
  Row,
  Callout,
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

class EditMarcRecord extends React.Component {
  constructor(props) {
    super(props);
    this.callout = React.createRef();
  }

  handleClose = () => {
    const { dispatch, router, toggleFilterPane } = this.props;
    dispatch({ type: ActionTypes.FILTERS, payload: {}, filterName: '', filterChecked: false });
    toggleFilterPane();
    router.push('/marccat/search');
  };

  saveRecord = () => {
    const body = { bibliographicRecord: this.composeBodyJson() };
    post(buildUrl(C.ENDPOINT.BIBLIOGRAPHIC_RECORD, 'lang=ita&view=1'), body, () => {
      this.showMessage('Record update with success');
      setTimeout(() => {
        this.handleClose();
      }, 2000);
    });
  };

  composeBodyJson = () => {
    const { recordDetail, store: { getState } } = this.props;
    const formData = getState().form.bibliographicRecordForm.values;
    const tagVariableData = getState().form.marcEditableListForm.values.items;
    const initialTag = getState().form.marcEditableListForm.values.items.length;
    const tag006Values = [];
    const tag007Values = [];
    const tag008Values = [];

    // Set leader
    const bibliographicRecord = recordDetail;
    bibliographicRecord.leader.value = formData.Leader;

    // populate tag 006 tag 007 tag 008
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
    if (initialTag < tagVariableData.length) {
      tagVariableData.forEach(t => {
        if (t.code !== '040') {
          let keyNumber = '';
          let category = '';
          if (t.code === '245') {
            keyNumber = 2215279;
            category = 3;
          } else if (t.code === '100') {
            keyNumber = 1000;
            category = 2;
          }
          t.mandatory = false;
          t.added = true;
          t.fieldStatus = 'changed';
          t.variableField = {
            keyNumber,
            ind1: (t.code === '100') ? 1 : 0,
            ind2: (t.code === '100') ? 1 : 4,
            code: t.code,
            categoryCode: category,
            displayValue: t.displayValue,
            functionCode: '-1',
            headingTypeCode: '1',
            itemTypeCode: '-1',
            sequenceNumber: 0,
            skipInFiling: 0,
          };
        }
      });
    }
    if (initialTag < tagVariableData.length) { bibliographicRecord.fields = _.union(bibliographicRecord.fields, tagVariableData); }
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

  showMessage(message) {
    this.callout.current.sendCallout({
      type: 'success',
      message: (
        <span>
          {message}
        </span>
      )
    });
  }

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
        <Callout ref={this.callout} />
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
  ({ marccat: { data, leaderData, settings, headerTypes006, headerTypes007, headerTypes008 } }) => ({
    recordDetail: StoreReducer.resolve(data, 'marcRecordDetail').bibliographicRecord,
    queryBib: settings.queryBib,
    queryAuth: settings.queryAuth,
    headerTypes006Result: headerTypes006.records,
    leaderData: leaderData.records,
    headerTypes006IsLoading: headerTypes006.isLoading,
    headerTypes007Result: headerTypes007.records,
    headerTypes007IsLoading: headerTypes007.isLoading,
    headerTypes008Result: headerTypes008.records,
    headerTypes008IsLoading: headerTypes008.isLoading
  }),
)(injectCommonProp(EditMarcRecord)));
