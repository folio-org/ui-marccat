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
import { buildUrl, findParam } from '../../redux/helpers/Utilities';
import { post, put } from '../../core/api/HttpService';
import { SUBFIELD_DELIMITER } from './Utils/MarcUtils';
import VariableFields from './Marc/VariableFields';
import { StoreReducer } from '../../redux';
import { deleteRecordAction } from './Utils/MarcApiUtils';
import * as C from '../../utils/Constant';
import style from './Style/style.css';
import { If } from '../Search';

class EditMarcRecord extends React.Component {
  constructor(props) {
    super(props);
    this.callout = React.createRef();
    this.onSave = this.onSave.bind(this);
    this.onUpdate = this.onUpdate.bind(this);
    this.onCreate = this.onCreate.bind(this);
    this.onDelete = this.onDelete.bind(this);

    this.id = findParam('id');
  }

  handleClose = () => {
    const { dispatch, router, toggleFilterPane } = this.props;
    dispatch({ type: ActionTypes.FILTERS, payload: {}, filterName: '', filterChecked: false });
    toggleFilterPane();
    router.push('/marccat/search');
    // router.push(`/marccat/search?edited=${true}`);
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

  saveHeading = item => {
    const { store: { getState } } = this.props;
    const tagVariableData = getState().form.marcEditableListForm.values.items;
    const heading = {
      indicator1: item.ind1 || '',
      indicator2: item.ind2 || '',
      stringText: SUBFIELD_DELIMITER + item.displayValue,
      tag: item.code
    };
    post(buildUrl(C.ENDPOINT.CREATE_HEADING_URL, 'lang=ita&view=1'), heading)
      .then((r) => {
        return r.json();
      }).then((data) => {
        tagVariableData.filter(t => t.code === item.code)[0].variableField.ind1 = data.tag;
        tagVariableData.filter(t => t.code === item.code)[0].variableField.ind1 = data.indicator1;
        tagVariableData.filter(t => t.code === item.code)[0].variableField.ind2 = data.indicator2;
        tagVariableData.filter(t => t.code === item.code)[0].variableField.displayValue = data.stringText;
        tagVariableData.filter(t => t.code === item.code)[0].variableField.keyNumber = data.headingNumber;
        tagVariableData.filter(t => t.code === item.code)[0].fieldStatus = 'new';
        return data;
      }).catch(() => this.showMessage('Error on save heading'));
  };

  editHeading = item => {
    const { store: { getState } } = this.props;
    const tagVariableData = getState().form.marcEditableListForm.values.items;
    const tagSelected = tagVariableData.filter(t => t.code === item.code)[0];
    const heading = {
      indicator1: item.ind1 || tagSelected.variableField.ind1,
      indicator2: item.ind2 || tagSelected.variableField.ind2,
      stringText: item.displayValue || tagSelected.variableField.displayValue,
      category: item.categoryCode || tagSelected.variableField.categoryCode,
      headingNumber: item.keyNumber || tagSelected.variableField.keyNumber,
      tag: item.code || tagSelected.code,
    };
    put(buildUrl(C.ENDPOINT.UPDATE_HEADING_URL, 'lang=ita&view=1'), heading)
      .then((r) => {
        return r.json();
      }).then((data) => {
        tagVariableData.filter(t => t.code === item.code)[0].variableField.code = data.tag;
        tagVariableData.filter(t => t.code === item.code)[0].variableField.ind1 = data.indicator1;
        tagVariableData.filter(t => t.code === item.code)[0].variableField.ind2 = data.indicator2;
        tagVariableData.filter(t => t.code === item.code)[0].variableField.oldKeyNumber = tagVariableData.filter(t => t.code === item.code)[0].variableField.keyNumber;
        tagVariableData.filter(t => t.code === item.code)[0].variableField.displayValue = data.stringText;
        tagVariableData.filter(t => t.code === item.code)[0].variableField.keyNumber = data.headingNumber;
        tagVariableData.filter(t => t.code === item.code)[0].fieldStatus = 'changed';
        return data;
      });
  };

  onUpdate = (item) => {
    if (item.variableField && item.variableField.keyNumber) {
      this.editHeading(item);
    } else {
      this.saveHeading(item);
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
    // const id = bibliographicRecord.id;
    // dispatch({
    //   type: '@@ui-marccat/QUERY',
    //   data: {
    //     path: C.ENDPOINT.BIBLIOGRAPHIC_RECORD + '/' + id,
    //     id,
    //     meta: data.data.marcRecordDetail.meta,
    //     panelOpen: true,
    //     type: 'marcRecordDetail',
    //     params: 'type=B&lang=ita&view=1',
    //   } });
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
    return (
      <PaneMenu>
        <Button
          buttonStyle="primary"
          onClick={this.saveRecord}
          buttonClass={style.rightPosition}
          type="button"
          marginBottom0
        >
          <Icon icon="plus-sign">
            {translate({ id: 'ui-marccat.search.record.edit' })}
          </Icon>
        </Button>
        <Button
          buttonStyle="primary"
          buttonClass={style.rightPosition}
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
    );
  };


  render() {
    const {
      translate,
      data,
      leaderData,
      store: { getState }
    } = this.props;

    const bibliographicRecord = getState().marccat.search.bibliographicResults.filter(item => this.id === item.data.fields[0]['001'])[0];
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
                    <form name="bibliographicRecordForm" onSubmit={this.saveRecord} formkey="bibliograficFormKey">
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
                      <Accordion label="Control fields (001, 003, 005, 008)" id="control-field">
                        <FixedFields
                          {...this.props}
                          recordDetail={data.recordDetail}
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
  ({ marccat: { data, leaderData, settings } }) => ({
    recordDetail: StoreReducer.resolve(data, 'marcRecordDetail').bibliographicRecord,
    queryBib: settings.queryBib,
    queryAuth: settings.queryAuth,
    id: settings.id,
    leaderData: leaderData.records,
  }),
)(injectCommonProp(EditMarcRecord)));
