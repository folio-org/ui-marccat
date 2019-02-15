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
import { AppIcon } from '@folio/stripes-core';
import { ActionMenuTemplate, SingleCheckboxIconButton } from '../../lib';
import { MarcLeader, FixedFields } from '.';
import { injectCommonProp } from '../../core';
import { ActionTypes } from '../../redux/actions';
import { buildUrl } from '../../redux/helpers/Utilities';
import * as C from '../../utils/Constant';
import style from './Style/style.css';
import { post, put } from '../../core/api/HttpService';
import { SUBFILED_DELIMITER } from './Utils/MarcUtils';
import VariableFields from './Marc/VariableFields';
import { StoreReducer } from '../../redux';
import { deleteRecordAction } from './Utils/MarcApiUtils';

class EditMarcRecord extends React.Component {
  constructor(props) {
    super(props);
    this.callout = React.createRef();
    this.onSave = this.onSave.bind(this);
    this.onUpdate = this.onUpdate.bind(this);
    this.onCreate = this.onCreate.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }

  handleClose = () => {
    const { dispatch, router, toggleFilterPane } = this.props;
    dispatch({ type: ActionTypes.FILTERS, payload: {}, filterName: '', filterChecked: false });
    toggleFilterPane();
    router.push('/marccat/search');
  };

  saveRecord = () => {
    const body = this.composeBodyJson();
    post(buildUrl(C.ENDPOINT.BIBLIOGRAPHIC_RECORD, 'lang=ita&view=1'), body).then(() => {
      this.showMessage('Record update with success');
      setTimeout(() => {
        this.handleClose();
      }, 2);
    });
  };

  onSave = () => {}
  onUpdate = (item) => {
    const { store: { getState } } = this.props;
    const tagVariableData = getState().form.marcEditableListForm.values.items;
    const heading = {
      indicator1: item.ind1 || '',
      indicator2: item.ind2 || '',
      stringText: SUBFILED_DELIMITER + item.displayValue,
      category: (item.variableField) ? item.variableField.categoryCode : '',
      headingNumber: (item.variableField) ? item.variableField.keyNumber : '',
      tag: item.code
    };
    if (item.variableField && item.variableField.keyNumber) {
      put(buildUrl(C.ENDPOINT.UPDATE_HEADING_URL, 'lang=ita&view=1'), heading)
        .then((r) => {
          return r.json();
        }).then((data) => {
          tagVariableData.filter(t => t.code === item.code).map(k => {
            k.headingNumber = data.headingNumber;
            k.fieldStatus = 'changed';
            return data;
          });
        });
    } else {
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
  }

  onCreate = () => { this.showMessage('Tag Saved sucesfully'); }
  onDelete = () => {};

  composeBodyJson = () => {
    const { data, recordDetail, store: { getState } } = this.props;
    const formData = getState().form.bibliographicRecordForm.values;
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

    const recordTemplate = {
      id: data.settings.defaultTemplate.id,
      name: data.settings.defaultTemplate.name,
      type: 'B',
      fields: recordDetail.fields.filter(f => f.code === '001' || f.code === '005' || f.code === '008' || f.code === '040')
    };
    const difference = _.difference(bibliographicRecord.fields, getState().form.marcEditableListForm.values.items);
    let tagToDeleted = difference.filter(f => f.code !== '001' || f.code !== '005' || f.code !== '008' || f.code !== '040');
    tagToDeleted = tagToDeleted.filter(f => f.code !== '001' && f.code !== '005' && f.code !== '008');
    tagToDeleted.forEach(f => {
      f.fieldStatus = 'deleted';
    });
    bibliographicRecord.fields = _.union(recordTemplate.fields, tagToDeleted, getState().form.marcEditableListForm.values.items);
    bibliographicRecord.fields = _.sortBy(bibliographicRecord.fields, 'code');
    bibliographicRecord.fields = Object.values(bibliographicRecord.fields.reduce((acc, cur) => Object.assign(acc, { [cur.code]: cur }), {}));
    bibliographicRecord.verificationLevel = 1;
    return {
      bibliographicRecord,
      recordTemplate
    };
  }


  deleteRecord = () => {
    const { data, dispatch, recordDetail } = this.props;
    const id = recordDetail.id;
    dispatch(deleteRecordAction(id, recordDetail));
    setTimeout(() => {
      data.search.bibliographicResults = data.search.bibliographicResults
        .filter(item => '' + id !== item.data.fields[0]['001']
          .replace(/^0+/, '')) || {};
      this.handleClose();
    }, 3);
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
              {translate({ id: 'ui-marccat.search.record.edit' })}
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
              {translate({ id: 'ui-marccat.search.record.delete' })}
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
      bibliographicRecord.fields = Object.values(bibliographicRecord.fields.reduce((acc, cur) => Object.assign(acc, { [cur.code]: cur }), {}));
    }
    return (!bibliographicRecord) ?
      (
        <Paneset static>
          <Pane
            defaultWidth="fullWidth"
            paneTitle={(bibliographicRecord) ? 'New Monograph' : 'Edit Record'}
            paneSub={(bibliographicRecord) ? 'id. ' + bibliographicRecord.id : 'Edit Record id. '}
            appIcon={<AppIcon app={C.META.ICON_TITLE} />}
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
              dismissible
              paneTitle="Edit Record"
              appIcon={<AppIcon app={C.META.ICON_TITLE} />}
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
                        onDelete={this.onDelete}
                        onSave={this.onSave}
                        onUpdate={this.onUpdate}
                        onCreate={this.onCreate}
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
