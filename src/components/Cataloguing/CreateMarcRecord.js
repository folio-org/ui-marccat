/**
 * @format
 * @flow
 */
import React from 'react';
import { connect } from 'react-redux';
import {
  Pane,
  Paneset,
  AccordionSet,
  Callout,
  Row,
  PaneMenu,
  Button,
  Accordion,
  KeyValue,
  Icon
} from '@folio/stripes/components';
import { reduxForm } from 'redux-form';
import _ from 'lodash';
import { Props, injectCommonProp } from '../../core';
import { ActionMenuTemplate, SingleCheckboxIconButton } from '../../lib';
import { VariableFields, MarcLeader, FixedFields } from '.';
import { ActionTypes } from '../../redux/actions/Actions';
import { put, remove, post } from '../../core/api/HttpService';
import { buildUrl } from '../../redux/helpers/Utilities';
import * as C from '../../utils/Constant';

import style from './Style/style.css';
import { uuid } from './Utils/MarcUtils';

export class CreateMarcRecord extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isEditingMode: false,
    };
    this.renderDropdownLabels = this.renderDropdownLabels.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.saveRecord = this.saveRecord.bind(this);
    this.editRecord = this.editRecord.bind(this);
    this.deleteRecord = this.deleteRecord.bind(this);
    this.callout = React.createRef();
  }

  componentDidMount() {
    const { toggleFilterPane } = this.props;
    toggleFilterPane();
  }

  renderDropdownLabels = () => {
    const { translate } = this.props;
    return [
      {
        label: translate({ id: 'ui-marccat.button.new.auth' }),
        shortcut: translate({ id: 'ui-marccat.button.new.short.auth' }),
        onClick: () => { },
      },
      {
        label: translate({ id: 'ui-marccat.button.new.bib' }),
        shortcut: translate({ id: 'ui-marccat.button.new.short.bib' }),
        onClick: () => { },
      }];
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
              {translate({ id: 'ui-marccat.template.record.create' })}
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
              {translate({ id: 'ui-marccat.template.record.delete' })}
            </Icon>
          </Button>
        </PaneMenu>
      </React.Fragment>
    );
  };


  lockRecord = (lock) => {
    const { store, bibliographicRecord } = this.props;
    const okapi = store.getState().okapi;
    const userName = okapi.currentUser.username;
    const id = bibliographicRecord.id;
    const uid = uuid();
    if (lock) remove(buildUrl(C.ENDPOINT.LOCK_MARC_RECORD + id, `uuid=${uid}&userName=${userName}&lang=ita&view=1&type=R`), bibliographicRecord, null);
    else remove(buildUrl(C.ENDPOINT.UNLOCK_MARC_RECORD + id, `uuid=${uid}&userName=${userName}&lang=ita&view=1&type=R`), bibliographicRecord, null);
  };

  saveRecord = () => {
    const { isEditingMode } = this.state;
    const body = { bibliographicRecord: this.composeBodyJson() };
    post(buildUrl(C.ENDPOINT.BIBLIOGRAPHIC_RECORD, 'lang=ita&view=1'), body, () => {
      this.showMessage('Record saved with success');
      setTimeout(() => {
        this.handleClose();
      }, 2000);
    });
    if (isEditingMode) this.lockRecord(false);
  };

  editRecord = () => {
    const { store, bibliographicRecord } = this.props;
    put(buildUrl(C.ENDPOINT.BIBLIOGRAPHIC_RECORD, 'lang=ita&view=1'), bibliographicRecord, store);
  };

  deleteRecord = () => {
    const { store, bibliographicRecord } = this.props;
    const okapi = store.getState().okapi;
    const userName = okapi.currentUser.username;
    const id = bibliographicRecord.id;
    const uid = uuid();
    remove(buildUrl(C.ENDPOINT.BIBLIOGRAPHIC_RECORD + '/' + id, `uuid=${uid}&userName=${userName}&lang=ita&view=1`), bibliographicRecord, this.showMessage('Record delete successfully'));
    setTimeout(() => {
      this.handleClose();
    }, 2000);
  };


  composeBodyJson = () => {
    const { bibliographicRecord, store: { getState } } = this.props;
    const formData = getState().form.bibliographicRecordForm.values;
    const tagVariableData = getState().form.marcEditableListForm.values.items;

    const tag006Values = [];
    const tag007Values = [];
    const tag008Values = [];

    // Set leader
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
          displayValue: '\u001fa' + t.displayValue,
          functionCode: '-1',
          headingTypeCode: '1',
          itemTypeCode: '-1',
          sequenceNumber: 0,
          skipInFiling: 0,
        };
      }
    });
    bibliographicRecord.fields = _.union(bibliographicRecord.fields, tagVariableData);
    bibliographicRecord.fields.splice(bibliographicRecord.fields.length - 1, 1);
    return bibliographicRecord;
  }

  handleClose = () => {
    const { dispatch, router, toggleFilterPane } = this.props;
    dispatch({ type: ActionTypes.FILTERS, payload: {}, filterName: '', filterChecked: false });
    toggleFilterPane();
    router.push('/marccat/search');
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

  render() {
    const {
      bibliographicRecord,
      settings,
      translate,
      headerTypes006IsLoading,
      headerTypes007IsLoading,
      headerTypes008IsLoading,
      leaderData
    } = this.props;
    const {
      editable,
    } = this.state;
    const defaultTemplate = (settings) ? settings.defaultTemplate : C.SETTINGS.DEFAULT_TEMPLATE;

    return (!bibliographicRecord) ? <Icon icon="spinner-ellipsis" /> : (
      <React.Fragment>
        <Paneset static>
          <Pane
            defaultWidth="fullWidth"
            paneTitle={(bibliographicRecord) ? 'New Monograph' : 'New Monograph'}
            paneSub={(bibliographicRecord) ? 'id. ' + bibliographicRecord.id : 'id. ' + defaultTemplate.id}
            appIcon={{ app: C.META.ICON_TITLE }}
            actionMenu={ActionMenuTemplate}
            dismissible
            onClose={this.handleClose}
            lastMenu={this.renderButtonMenu()}
          >
            <Row center="xs">
              <div className={style.recordContainer}>
                <AccordionSet>
                  <KeyValue
                    value={<h2>{bibliographicRecord.name}</h2>}
                  />
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
                        headerTypes006IsLoading={headerTypes006IsLoading}
                        headerTypes007IsLoading={headerTypes007IsLoading}
                        headerTypes008IsLoading={headerTypes008IsLoading}
                        record={bibliographicRecord}
                      />
                    </Accordion>
                  </form>
                  <Accordion label={translate({ id: 'ui-marccat.cataloging.variablefield.section.label' })} id="variable-field">
                    <VariableFields
                      fields={bibliographicRecord.fields.filter(f => f.fixedField === undefined || !f.fixedField)}
                      {...this.props}
                      editable={editable}
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
  destroyOnUnmount: false,
})(connect(
  ({ marccat: { template, recordDetail, leaderData, headerTypes006, headerTypes007, headerTypes008 } }) => ({
    bibliographicRecord: template.recordsById,
    recordDetail: recordDetail.isReady,
    defaultTemplate: template.records,
    leaderData: leaderData.records,
    tagIsLoading: leaderData.isLoading,
    tagIsReady: leaderData.isReady,
    headerTypes006Result: headerTypes006.records,
    headerTypes006IsLoading: headerTypes006.isLoading,
    headerTypes007Result: headerTypes007.records,
    headerTypes007IsLoading: headerTypes007.isLoading,
    headerTypes008Result: headerTypes008.records,
    headerTypes008IsLoading: headerTypes008.isLoading
  }),
)(injectCommonProp(CreateMarcRecord)));
