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
import { FormattedMessage } from 'react-intl';
import _ from 'lodash';
import type { Props } from '../../core';
import { ActionMenuTemplate, SingleCheckboxIconButton } from '../../lib';
import { VariableFields, MarcLeader, FixedFields } from '.';
import { ActionTypes } from '../../redux/actions/Actions';
import { post } from '../../core/api/HttpService';
import { buildUrl } from '../../redux/helpers/Utilities';
import * as C from '../../utils/Constant';

import style from './Style/style.css';
import { StoreReducer } from '../../redux';
import { SUBFILED_DELIMITER } from './Utils/MarcUtils';

type P = {
  callout: Object,
  isEditingMode: boolean
} & Props;

export class CreateMarcRecord extends React.Component<P, {}> {
  constructor(props: P) {
    super(props);
    this.renderDropdownLabels = this.renderDropdownLabels.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.saveRecord = this.saveRecord.bind(this);
    this.callout = React.createRef();
    this.onSave = this.onSave.bind(this);
    this.onUpdate = this.onUpdate.bind(this);
    this.onCreate = this.onCreate.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }

  renderDropdownLabels = () => {
    return [
      {
        label: <FormattedMessage id="ui-marccat.button.new.auth" />,
        shortcut: <FormattedMessage id="ui-marccat.button.new.short.auth" />,
        onClick: () => { },
      },
      {
        label: <FormattedMessage id="ui-marccat.button.new.bib" />,
        shortcut: <FormattedMessage id="ui-marccat.button.new.short.bib" />,
        onClick: () => { },
      }];
  };

  renderButtonMenu = () => {
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
              {<FormattedMessage id="ui-marccat.template.record.create" />}
            </Icon>
          </Button>
        </PaneMenu>
      </React.Fragment>
    );
  };

  onSave = () => {}

  onUpdate = (item) => {
    const { store: { getState } } = this.props;
    const tagVariableData = getState().form.marcEditableListForm.values.items;
    const heading = {
      indicator1: item.ind1 || '',
      indicator2: item.ind2 || '',
      stringText: SUBFILED_DELIMITER + item.displayValue,
      tag: item.code
    };
    post(buildUrl(C.ENDPOINT.CREATE_HEADING_URL, 'lang=ita&view=1'), heading)
      .then((r) => {
        return r.json();
      }).then((data) => {
        tagVariableData.filter(t => t.code === item.code).map(k => {
          k.headingNumber = data.headingNumber;
          k.fieldStatus = 'new';
          return k;
        });
      });
  }

  onCreate = () => { this.showMessage('Tag Saved sucesfully'); }

  onDelete = () => {};


  saveRecord = () => {
    const body = this.composeBodyJson();
    post(buildUrl(C.ENDPOINT.BIBLIOGRAPHIC_RECORD, 'lang=ita&view=1'), body).then(() => {
      this.showMessage('Record saved with success');
      setTimeout(() => {
        this.handleClose();
      }, 2000);
    });
  };

  composeBodyJson = () => {
    const { emptyRecord, store: { getState } } = this.props;
    let { bibliographicRecord } = this.props;
    const formData = getState().form.bibliographicRecordForm.values;
    const tagVariableData = getState().form.marcEditableListForm.values.items;

    const tag006Values = [];
    const tag007Values = [];
    const tag008Values = [];

    // Set leader
    if (!bibliographicRecord) bibliographicRecord = emptyRecord;
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
        let category = '';
        if (t.code === '245') {
          category = 3;
        } else if (t.code === '300') {
          category = 7;
        } else if (t.code === '500') {
          category = 7;
        } else if (t.code === '700') {
          category = 2;
        } else if (t.code === '997') {
          category = 6;
        } else if (t.code === '100') {
          category = 2;
        }
        t.mandatory = false;
        t.added = true;
        t.fieldStatus = 'new';
        t.variableField = {
          keyNumber: t.headingNumber,
          ind1: (t.code === '100') ? 1 : 0,
          ind2: (t.code === '100') ? 1 : 4,
          code: t.code,
          categoryCode: category,
          displayValue: SUBFILED_DELIMITER + t.displayValue,
          functionCode: '-1',
          headingTypeCode: '1',
          itemTypeCode: '-1',
          sequenceNumber: 0,
          skipInFiling: 0,
        };
      }
    });
    const recordTemplate = Object.assign({}, emptyRecord);
    recordTemplate.id = 408;
    bibliographicRecord.fields = _.union(bibliographicRecord.fields, tagVariableData);
    bibliographicRecord.fields = Object.values(bibliographicRecord.fields.reduce((acc, cur) => Object.assign(acc, { [cur.code]: cur }), {}));
    bibliographicRecord.fields = _.sortBy(bibliographicRecord.fields, 'code');
    bibliographicRecord.verificationLevel = 1;
    return {
      bibliographicRecord,
      recordTemplate
    };
  }

  handleClose = () => {
    const { dispatch, router, toggleFilterPane } = this.props;
    dispatch({ type: ActionTypes.FILTERS, payload: {}, filterName: '', filterChecked: false });
    toggleFilterPane();
    router.push('/marccat/search');
  };

  showMessage(message: string) {
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
      settings,
      headerTypes006IsLoading,
      headerTypes007IsLoading,
      headerTypes008IsLoading,
      leaderData,
      emptyRecord
    } = this.props;
    let { bibliographicRecord } = this.props;
    const defaultTemplate = (settings) ? settings.defaultTemplate : C.SETTINGS.DEFAULT_TEMPLATE;
    if (!_.isEmpty(emptyRecord)) {
      bibliographicRecord = emptyRecord;
      bibliographicRecord.fields = Object.values(bibliographicRecord.fields.reduce((acc, cur) => Object.assign(acc, { [cur.code]: cur }), {}));
    }
    return (!bibliographicRecord) ?
      (
        <Paneset static>
          <Pane
            defaultWidth="fullWidth"
            paneTitle={(bibliographicRecord) ? 'New Monograph' : 'New Monograph'}
            paneSub={(bibliographicRecord) ? 'id. ' + bibliographicRecord.id : 'id. ' + defaultTemplate.id}
            appIcon={{ app: C.META.ICON_TITLE }}
            actionMenu={ActionMenuTemplate}
            dismissible
            onClose={() => this.handleClose()}
            lastMenu={this.renderButtonMenu()}
          >
            <Icon icon="spinner-ellipsis" />
          </Pane>
        </Paneset>
      ) :
      (
        <React.Fragment>
          <Paneset static>
            <Pane
              defaultWidth="fullWidth"
              paneTitle={(bibliographicRecord) ? 'New Monograph' : 'New Monograph'}
              paneSub={(bibliographicRecord) ? 'id. ' + bibliographicRecord.id : 'id. ' + defaultTemplate.id}
              appIcon={{ app: C.META.ICON_TITLE }}
              actionMenu={ActionMenuTemplate}
              dismissible
              onClose={() => this.handleClose()}
              lastMenu={this.renderButtonMenu()}
            >
              <Row center="xs">
                <div className={style.recordContainer}>
                  <AccordionSet>
                    <KeyValue
                      value={<h2>{bibliographicRecord.name}</h2>}
                    />
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
                          headerTypes006IsLoading={headerTypes006IsLoading}
                          headerTypes007IsLoading={headerTypes007IsLoading}
                          headerTypes008IsLoading={headerTypes008IsLoading}
                          record={bibliographicRecord}
                        />
                      </Accordion>
                    </form>
                    <Accordion label="variable fields" id="variable-field">
                      <VariableFields
                        fields={bibliographicRecord.fields.filter(f => f.fixedField === undefined || !f.fixedField)}
                        onDelete={this.onDelete}
                        onSave={this.onSave}
                        onUpdate={this.onUpdate}
                        onCreate={this.onCreate}
                        {...this.props}
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
  ({ marccat: { data, template, recordDetail, leaderData, headerTypes006, headerTypes007, headerTypes008 } }) => ({
    emptyRecord: StoreReducer.resolve(data, 'emptyRecord'),
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
)(CreateMarcRecord));
