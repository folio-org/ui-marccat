/* eslint-disable quotes */
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
import { AppIcon } from '@folio/stripes-core';
import { FormattedMessage } from 'react-intl';
import { isEmpty, union, sortBy, includes, first } from 'lodash';
import { Redux, ReduxForm } from '../../redux/helpers/Redux';
import {
  RECORD_FIELD_STATUS,
  TAG_WITH_NO_HEADING_ASSOCIATED,
  SUBFIELD_DELIMITER,
  replaceAll,
  replaceAllinverted,
  VariableFields, MarcLeader, FixedFields
} from '.';
import { ActionMenuTemplate, SingleCheckboxIconButton } from '../../lib';
import { ActionTypes } from '../../redux/actions/Actions';
import { post, put } from '../../core/api/HttpService';
import * as C from '../../shared/Constants';
import { headingAction, headingDeleteAction, settingsAction } from './Actions/MarcActionCreator';
import { buildUrl } from '../../shared/Function';
import style from './Style/style.css';

export class CreateMarcRecord extends React.Component<{}, {
  callout: React.RefObject<Callout>,
}> {
  constructor(props) {
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

  componentWillMount() {
    const { dispatch, datastore: { emptyRecord: { results: { leader } } } } = this.props;
    dispatch({ type: ActionTypes.LEADER_VALUES_FROM_TAG, leader: leader.value, code: leader.code, typeCode: '15' });
    // const payload = { value: leader.value, code: leader.code, typeCode: 15 };
    // dispatch(leaderAction(payload));
    dispatch(settingsAction({ fromCataloging: true }));
  }


  onSave = () => {}

  editHeading = item => {
    const { store: { getState } } = this.props;
    const tagVariableData = getState().form.marcEditableListForm.values.items;
    const tagSelected = first(tagVariableData.filter(t => t.code === item.code));
    const displayValue = replaceAll(item.displayValue);
    const cretaeHeadingForTag = includes(TAG_WITH_NO_HEADING_ASSOCIATED, item.code);
    const heading = {
      ind1: item.ind1 || tagSelected.variableField.ind1,
      ind2: item.ind2 || tagSelected.variableField.ind2,
      displayValue,
      categoryCode: item.categoryCode || tagSelected.variableField.categoryCode,
      keyNumber: item.keyNumber || tagSelected.variableField.keyNumber,
      tag: item.code || tagSelected.code,
    };
    if (!cretaeHeadingForTag) {
      put(buildUrl(C.ENDPOINT.UPDATE_HEADING_URL, C.ENDPOINT.DEFAULT_LANG_VIEW), heading)
        .then((r) => {
          return r.json();
        }).then((data) => {
          tagVariableData.filter(t => t.code === item.code).map(k => {
            k.fieldStatus = RECORD_FIELD_STATUS.CHANGED;
            k.variableField = {
              ind1: data.ind1 || C.SPACED_STRING_DOUBLE_QUOTE,
              ind2: data.ind2 || C.SPACED_STRING_DOUBLE_QUOTE,
              oldKeyNumber: k.variableField.keyNumber,
              displayValue: replaceAllinverted(data.displayValue),
              keyNumber: data.keyNumber,
            };
            return k;
          });
        });
    } else {
      tagVariableData.filter(t => t.code === item.code).map(k => {
        k.variableField = {
          ind1: item.ind1 || C.SPACED_STRING_DOUBLE_QUOTE,
          ind2: item.ind2 || C.SPACED_STRING_DOUBLE_QUOTE,
          displayValue: displayValue || C.SPACED_STRING_DOUBLE_QUOTE,
          keyNumber: 0,
        };
        k.fieldStatus = RECORD_FIELD_STATUS.CHANGED;
        return k;
      });
    }
  }

  createNewHeading = (item) => {
    const { dispatch, emptyRecord } = this.props;
    const displayValue = replaceAll(item.displayValue);
    item.displayValue = displayValue;
    const id = emptyRecord.id;
    dispatch(headingAction(id, item));
  };

  onUpdate = (item) => {
    const tag = Object.assign({}, item);
    const { store: { getState } } = this.props;
    const cretaeHeadingForTag = includes(TAG_WITH_NO_HEADING_ASSOCIATED, item.code);
    const displayValue: string = replaceAll(item.displayValue);
    const tagSelected = getState().form.marcEditableListForm.values.items;
    const heading = {
      ind1: item.ind1 || C.EMPTY_STRING,
      ind2: item.ind2 || C.EMPTY_STRING,
      displayValue,
      tag: item.code
    };
    if (tag.variableField) {
      this.editHeading(tag);
    } else if (!cretaeHeadingForTag) {
      post(buildUrl(C.ENDPOINT.CREATE_HEADING_URL, C.ENDPOINT.DEFAULT_LANG_VIEW), heading)
        .then((r) => {
          return r.json();
        }).then((data) => {
          tagSelected
            .filter(t => t.code === item.code && !t.variableField)
            .map(k => {
              k.fieldStatus = RECORD_FIELD_STATUS.NEW;
              k.variableField = {
                ind1: data.ind1 || C.SPACED_STRING_DOUBLE_QUOTE,
                ind2: data.ind2 || C.SPACED_STRING_DOUBLE_QUOTE,
                categoryCode: data.categoryCode,
                displayValue: replaceAllinverted(data.displayValue),
                keyNumber: data.keyNumber,
              };
              return data;
            });
        });
    } else {
      tagSelected.filter(t => t.code === item.code).map(k => {
        k.variableField = {
          ind1: item.ind1 || C.SPACED_STRING_DOUBLE_QUOTE,
          ind2: item.ind2 || C.SPACED_STRING_DOUBLE_QUOTE,
          displayValue: displayValue || C.SPACED_STRING_DOUBLE_QUOTE,
          code: item.code,
          keyNumber: 0,
        };
        k.fieldStatus = RECORD_FIELD_STATUS.NEW;
        return k;
      });
    }
  }


  onCreate = () => { this.showMessage('Tag Saved sucesfully'); }

  onDelete = item => {
    const { dispatch } = this.props;
    if (item.variableField) {
      const heading = {
        ind1: item.variableField.ind1,
        ind2: item.variableField.ind2,
        displayValue: item.variableField.displayValue,
        tag: item.code,
        categoryCode: item.variableField.categoryCode,
        keyNumber: item.variableField.keyNumber
      };
      dispatch(headingDeleteAction(heading));
    }
  };

  saveRecord = () => {
    const { reset } = this.props;
    const body = this.composeBodyJson();

    post(buildUrl(C.ENDPOINT.BIBLIOGRAPHIC_RECORD, C.ENDPOINT.DEFAULT_LANG_VIEW), body)
      .then(() => {
        this.showMessage('Record saved with success');
        setTimeout(() => {
          this.handleClose();
          reset();
        }, 2000);
      }).catch(() => {
        this.showMessage('Error on saved record!');
      });
  };

  composeBodyJson = () => {
    const { data, data: { data: { emptyRecord } }, store: { getState } } = this.props;
    let bibliographicRecord;
    const formData = getState().form.bibliographicRecordForm.values;
    const tagVariableData = getState().form.marcEditableListForm.values.items;

    // Set leader
    if (!bibliographicRecord) bibliographicRecord = Object.assign(emptyRecord.results, bibliographicRecord);
    bibliographicRecord.leader.value = formData.Leader;

    const recordTemplate = {
      id: first(data.template.records).id,
      name: first(data.template.records).name,
      type: 'B',
      fields: Object.values(emptyRecord.results.fields.reduce((acc, cur) => Object.assign(acc, { [cur.code]: cur }), {}))
    };
    bibliographicRecord.fields = Object.values(bibliographicRecord.fields.reduce((acc, cur) => Object.assign(acc, { [cur.code]: cur }), {}));
    bibliographicRecord.fields = union(bibliographicRecord.fields, tagVariableData);
    bibliographicRecord.fields = sortBy(bibliographicRecord.fields, 'code');
    bibliographicRecord.fields
      .filter(f => f.fixedField === undefined || !f.fixedField)
      .forEach(element => {
        if (element.variableField.code !== '040') {
          element.fieldStatus = RECORD_FIELD_STATUS.NEW;
          element.displayValue = element.variableField.displayValue.replace('$', SUBFIELD_DELIMITER);
          element.variableField.displayValue = element.variableField.displayValue.replace('$', SUBFIELD_DELIMITER);
        }
      });
    bibliographicRecord.verificationLevel = 1;
    return {
      bibliographicRecord,
      recordTemplate
    };
  }

  handleClose = () => {
    const { store, datastore, dispatch, router, toggleFilterPane } = this.props;
    dispatch({ type: ActionTypes.FILTERS, payload: {}, filterName: '', isChecked: false });
    toggleFilterPane();
    const { emptyRecord } = datastore;
    const id = emptyRecord.results.id;
    router.push(`/marccat/search?id=${id}`);
    Redux.reset(store, 'data');
  };

  showMessage(message: string, type?: string) {
    this.callout.current.sendCallout({
      type: type || 'success',
      message: (
        <span>
          {message}
        </span>
      )
    });
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
            {translate({ id: 'ui-marccat.cataloging.record.create' })}
          </Icon>
        </Button>
      </PaneMenu>
    );
  };

  render() {
    const {
      settings,
      leaderData,
      datastore: { emptyRecord },
    } = this.props;
    const defaultTemplate = (settings) ? settings.defaultTemplate : C.SETTINGS.DEFAULT_TEMPLATE;
    const bibliographicRecord = !isEmpty(emptyRecord) ? emptyRecord.results : {};
    return (!bibliographicRecord) ?
      (
        <Paneset static>
          <Pane
            defaultWidth="fullWidth"
            paneTitle={(bibliographicRecord) ? 'New Monograph' : 'New Monograph'}
            paneSub={(bibliographicRecord) ? 'id. ' + bibliographicRecord.id : 'id. ' + defaultTemplate.id}
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
              paneTitle={(bibliographicRecord) ? 'New Monograph' : 'New Monograph'}
              paneSub={(bibliographicRecord) ? 'id. ' + bibliographicRecord.id : 'id. ' + defaultTemplate.id}
              appIcon={<AppIcon app={C.META.ICON_TITLE} />}
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
                      <Accordion label={<FormattedMessage id="ui-marccat.cataloging.accordion.checkbox.label" />} id="suppress" separator={false}>
                        <SingleCheckboxIconButton labels={[<FormattedMessage id="ui-marccat.cataloging.checkbox.label" />]} pullLeft widthPadding />
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
                      <Accordion
                        label={<FormattedMessage id="ui-marccat.cataloging.accordion.fixedfield.label" />}
                        id="control-field-create-record"
                      >
                        <FixedFields
                          {...this.props}
                          record={bibliographicRecord}
                          fixedFields={bibliographicRecord.fields}
                        />
                      </Accordion>
                    </form>
                    <Accordion
                      label={<FormattedMessage id="ui-marccat.cataloging.accordion.variablefield.label" />}
                      id="variable-field"
                    >
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

export default ReduxForm.bind({
  form: 'bibliographicRecordForm',
  destroyOnUnmount: false,
})(connect(
  ({ marccat: { data, template, recordDetail, leaderData, headerTypes006, headerTypes007, headerTypes008 } }) => ({
    emptyRecord: data.results,
    bibliographicRecord: template.recordsById,
    recordDetail: recordDetail.isReady,
    defaultTemplate: template.records,
    leaderData: leaderData.records,
    tagIsLoading: leaderData.isLoading,
    tagIsReady: leaderData.isReady,
    // leaderData: (data.leaderData) ? data.leaderData.payload : {},
    headerTypes006Result: headerTypes006.results,
    headerTypes007Result: headerTypes007.results,
    headerTypes008Result: headerTypes008.results,
  }),
)(CreateMarcRecord));
