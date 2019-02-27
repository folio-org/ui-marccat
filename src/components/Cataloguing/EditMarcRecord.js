/* eslint-disable quotes */
import React from 'react';
import { connect } from 'react-redux';
import { includes, difference, union, sortBy } from 'lodash';
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
import { SUBFIELD_DELIMITER, TAG_WITH_NO_HEADING_ASSOCIATED, RECORD_FIELD_STATUS } from './Utils/MarcUtils';
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
    // const { dispatch } = this.props;
    const body = this.composeBodyJson();
    post(buildUrl(C.ENDPOINT.BIBLIOGRAPHIC_RECORD, C.ENDPOINT.DEFAULT_LANG_VIEW), body).then(() => {
      this.showMessage('Record update with success');
      // dispatch({ type: ActionTypes.DETAILS, query: id, recordType: 1 });
      setTimeout(() => {
        this.handleClose();
      }, 2000);
    });
  };

  onSave = () => {}


  saveHeading = item => {
    const { store: { getState } } = this.props;
    const tagVariableData = getState().form.marcEditableListForm.values.items;
    const cretaeHeadingForTag = includes(TAG_WITH_NO_HEADING_ASSOCIATED, item.code);
    const heading = {
      indicator1: item.ind1 || '',
      indicator2: item.ind2 || '',
      stringText: SUBFIELD_DELIMITER + item.displayValue,
      tag: item.code
    };
    if (!cretaeHeadingForTag) {
      post(buildUrl(C.ENDPOINT.CREATE_HEADING_URL, C.ENDPOINT.DEFAULT_LANG_VIEW), heading)
        .then((r) => {
          return r.json();
        }).then((data) => {
          tagVariableData.filter(t => t.code === item.code).map(k => {
            k.variableField = {
              ind1: data.indicator1 || " ",
              ind2: data.indicator2 || " ",
              displayValue: data.stringText,
              keyNumber: data.headingNumber,
            };
            k.fieldStatus = RECORD_FIELD_STATUS.NEW;
            return data;
          });
        });
    } else {
      tagVariableData.filter(t => t.code === item.code).map(k => {
        k.variableField = {
          ind1: item.ind1 || " ",
          ind2: item.ind2 || " ",
          displayValue: item.displayValue || " ",
          keyNumber: 0,
        };
        k.fieldStatus = RECORD_FIELD_STATUS.NEW;
        return k;
      });
    }
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
    put(buildUrl(C.ENDPOINT.UPDATE_HEADING_URL, C.ENDPOINT.DEFAULT_LANG_VIEW), heading)
      .then((r) => {
        return r.json();
      }).then((data) => {
        tagVariableData.filter(t => t.code === item.code).map(k => {
          k.fieldStatus = 'changed';
          k.variableField = {
            ind1: data.indicator1 || " ",
            ind2: data.indicator2 || " ",
            oldKeyNumber: k.variableField.keyNumber,
            displayValue: data.stringText,
            keyNumber: data.headingNumber,
          };
          return k;
        });
      });
  }

  onUpdate = (item) => {
    const updateHeadingOnTag = includes(TAG_WITH_NO_HEADING_ASSOCIATED, item.code);
    if (item.variableField && item.variableField.keyNumber && !updateHeadingOnTag) {
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

    // Set leader
    const bibliographicRecord = recordDetail;
    bibliographicRecord.leader.value = formData.Leader;

    const recordTemplate = {
      id: data.settings.defaultTemplate.id,
      name: data.settings.defaultTemplate.name,
      type: 'B',
      fields: recordDetail.fields.filter(f => f.code === '001' || f.code === '005' || f.code === '008' || f.code === '040')
    };
    const differenceValue = difference(bibliographicRecord.fields, getState().form.marcEditableListForm.values.items);
    let tagToDeleted = differenceValue.filter(f => f.code !== '001' || f.code !== '005' || f.code !== '008' || f.code !== '040');
    tagToDeleted = tagToDeleted.filter(f => f.code !== '001' && f.code !== '005' && f.code !== '008');
    tagToDeleted.forEach(f => {
      f.fieldStatus = 'deleted';
    });
    bibliographicRecord.fields = union(recordTemplate.fields, tagToDeleted, getState().form.marcEditableListForm.values.items);
    bibliographicRecord.fields = sortBy(bibliographicRecord.fields, 'code');
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
      recordDetail,
      leaderData,
    } = this.props;
    const bibliographicRecord = If(recordDetail);
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
                      <Accordion label="Control fields (001, 003, 005, 008)" id="control-field-edit-record">
                        <FixedFields
                          {...this.props}
                          record={bibliographicRecord}
                          fidexFields={bibliographicRecord.fields}
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
    leaderData: leaderData.records,
  }),
)(injectCommonProp(EditMarcRecord)));
