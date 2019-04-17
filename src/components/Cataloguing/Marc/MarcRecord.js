/* eslint-disable react/no-unused-state */
/**
 * @format
 * @flow
 */
import React, { Fragment } from 'react';
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
  Icon
} from '@folio/stripes/components';
import stripesForm from '@folio/stripes/form';
import { AppIcon } from '@folio/stripes-core';
import { FormattedMessage } from 'react-intl';
import { union, sortBy, includes, first } from 'lodash';
import {
  TAG_WITH_NO_HEADING_ASSOCIATED,
  replaceAllinverted,
  RECORD_ACTION,
  FixedFields,
  MarcLeader,
  VariableFields,
  RECORD_FIELD_STATUS,
  SORTED_BY
} from '..';
import {
  ActionMenuTemplate,
  SingleCheckboxIconButton,
  injectCommonProp,
  post
} from '../../../shared';
import { ActionTypes } from '../../../redux/actions/Actions';
import { buildUrl, findParam, Localize } from '../../../utils/Function';
import {
  filterMandatoryFields,
  showValidationMessage,
  filterFixedFieldForSaveRecord
} from '../Utils/MarcApiUtils';
import * as C from '../../../config/constants';
import * as MarcAction from '../Actions';
import type { Props } from '../../../shared';

import style from '../Style/index.css';
import { TAG_WIDH_CAT_7, TAG_WIDH_CAT_8 } from '../Utils/MarcConstant';
import { Redux } from '../../../redux';
import { resetStore } from '../../../shared/action/ActionCreator';

export class MarcRecord extends React.Component<Props, {
  callout: React.RefObject<Callout>,
}> {
  constructor(props) {
    super(props);
    this.state = {
      isEditMode:  (findParam('mode') === RECORD_ACTION.EDIT_MODE),
      mode: findParam('mode'),
      id: findParam('id'),
      deletedTag: false,
    };
    this.renderDropdownLabels = this.renderDropdownLabels.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.callout = React.createRef();
    this.onCreate = this.onCreate.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.saveRecord = this.saveRecord.bind(this);
    this.deleteRecord = this.deleteRecord.bind(this);
  }

  componentWillMount() {
    const { dispatch, datastore: { emptyRecord } } = this.props;
    const { leader } = emptyRecord.results;
    dispatch({ type: ActionTypes.LEADER_VALUES_FROM_TAG, leader: leader.value, code: leader.code, typeCode: '15' });
  }

  getCurrentRecord = (): Object => {
    const { datastore: { emptyRecord, recordDuplicate }, recordDetail } = this.props;
    const { mode } = this.state;

    if (mode === RECORD_ACTION.CREATION_MODE) return Object.assign({}, emptyRecord.results);
    else if (mode === RECORD_ACTION.EDIT_MODE) return Object.assign({}, recordDetail);
    else return Object.assign({}, recordDuplicate.results.bibliographicRecord);
  };

  onCreate = item => {
    const { variableField: { code, ind1, ind2, displayValue } } = item;
    const cretaeHeadingForTag = includes(TAG_WITH_NO_HEADING_ASSOCIATED, item.code);
    const heading = { ind1, ind2, displayValue: replaceAllinverted(displayValue), tag: code };
    item.fieldStatus = (item.variableField.keyNumber > 0 || item.mandatory) ? RECORD_FIELD_STATUS.CHANGED : RECORD_FIELD_STATUS.NEW;
    return (!cretaeHeadingForTag) ? this.asyncCreateHeading(item, heading) : this.setupComonProperties(item, heading);
  }

  asyncCreateHeading = async (item, heading) => {
    try {
      const response = await post(buildUrl(C.ENDPOINT.CREATE_HEADING_URL, C.ENDPOINT.DEFAULT_LANG_VIEW), heading);
      const data = await response.json();
      item.variableField.categoryCode = data.categoryCode;
      item.variableField.keyNumber = data.keyNumber;
      item.variableField.displayValue = data.displayValue;
      showValidationMessage(this.callout, Localize({ key: 'cataloging.record.tag.create.success', value: item.code }), C.VALIDATION_MESSAGE_TYPE.SUCCESS);
    } catch (exception) {
      showValidationMessage(this.callout, Localize({ key: 'cataloging.record.tag.create.failure', value: item.code }), C.VALIDATION_MESSAGE_TYPE.ERROR);
    }
  };

  setupComonProperties = (item, heading) => {
    if (item.variableField.categoryCode === 0) {
      const categorySeven = includes(TAG_WIDH_CAT_7, item.code);
      const categoryEight = includes(TAG_WIDH_CAT_8, item.code);
      if (categorySeven) item.variableField.categoryCode = 7;
      if (categoryEight) item.variableField.categoryCode = 8;
    }
    item.variableField.displayValue = heading.displayValue;
  };

  onDelete = item => {
    item.fieldStatus = RECORD_FIELD_STATUS.DELETED;
    this.setState({
      deletedTag: true
    });
  }

  saveRecord = async () => {
    const { data, datastore: { emptyRecord }, store: { getState } } = this.props;
    const { deletedTag } = this.state;
    const formData = getState().form.bibliographicRecordForm.values;
    const initialValues = getState().form.marcEditableListForm.initial.items;
    let variableFormData = getState().form.marcEditableListForm.values.items;

    if (deletedTag) variableFormData = union(variableFormData, initialValues);

    const bibliographicRecord = this.getCurrentRecord();
    bibliographicRecord.leader.value = formData.leader;

    const recordTemplate = {
      id: first(data.template.records).id,
      name: first(data.template.records).name,
      type: 'B',
      fields: filterMandatoryFields(emptyRecord.results.fields)
    };

    bibliographicRecord.fields = union(filterFixedFieldForSaveRecord(bibliographicRecord.fields), variableFormData);
    bibliographicRecord.fields = sortBy(bibliographicRecord.fields, SORTED_BY.CODE);
    const payload = { bibliographicRecord, recordTemplate };

    await post(buildUrl(C.ENDPOINT.BIBLIOGRAPHIC_RECORD, C.ENDPOINT.DEFAULT_LANG_VIEW), payload)
      .then((r) => { return r.json(); })
      .then(() => {
        showValidationMessage(this.callout, 'cataloging.record.update.success', 'success');
        setTimeout(() => {
          this.handleClose();
        }, 2000);
      }).catch(() => {
        showValidationMessage(this.callout, 'cataloging.record.update.error', 'error');
      });
  }

  deleteRecord = () => {
    const { dispatch, recordDetail } = this.props;
    dispatch(MarcAction.deleteRecordAction(recordDetail));
  };

  handleClose = () => {
    const { id } = this.state;
    const { dispatch, reset, router, toggleFilterPane } = this.props;
    dispatch({ type: ActionTypes.FILTERS, payload: {}, filterName: '', isChecked: false });
    toggleFilterPane();
    dispatch(reset());
    router.push(`/marccat/search?savedId=${id}`);
  };

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
    const { isEditMode } = this.state;
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
            {translate({ id: `ui-marccat.cataloging.record.${(isEditMode) ? 'edit' : 'create'}` })}
          </Icon>
        </Button>
        {isEditMode &&
        <Button
          buttonStyle="primary"
          buttonClass={style.rightPosition}
          onClick={this.deleteRecord}
          type="button"
          disabled={false}
          marginBottom0
        >
          <Icon icon="trash">
            {translate({ id: 'ui-marccat.cataloging.record.delete' })}
          </Icon>
        </Button>
        }
      </PaneMenu>
    );
  };

  render() {
    const { leaderData } = this.props;
    const { isEditMode, id } = this.state;
    // to do fix this, we must use the record state var
    const bibliographicRecord = this.getCurrentRecord();
    return (!bibliographicRecord) ? (<Icon icon="spinner-ellipsis" />)
      : (
        <Fragment>
          <Paneset static>
            <Pane
              defaultWidth="fullWidth"
              paneTitle={(bibliographicRecord && isEditMode) ? 'Edit Record' : 'New Monograph'}
              paneSub={(bibliographicRecord && isEditMode) ? 'id. ' + bibliographicRecord.id : 'id. ' + id}
              appIcon={<AppIcon app={C.META.ICON_TITLE} />}
              actionMenu={ActionMenuTemplate}
              dismissible
              onClose={() => this.handleClose()}
              lastMenu={this.renderButtonMenu()}
            >
              <Row center="xs">
                <div className={style.recordContainer}>
                  <AccordionSet>
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
                        onCreate={this.onCreate}
                        onDelete={this.onDelete}
                        {...this.props}
                      />
                    </Accordion>
                  </AccordionSet>
                </div>
              </Row>
            </Pane>
          </Paneset>
          <Callout ref={this.callout} />
        </Fragment>
      );
  }
}

export default stripesForm({
  form: C.REDUX.FORM.BIBLIOGRAPHIC_FORM,
  destroyOnUnmount: true,
})(connect(
  ({ marccat: { data, settings, leaderData, headerTypes006, headerTypes007, headerTypes008 } }) => ({
    emptyRecord: data.results,
    recordDetail: Redux.resolve(data, 'marcRecordDetail').bibliographicRecord,
    bibliographicRecord: first(settings.detail),
    leaderData: leaderData.records,
    headerTypes006Result: headerTypes006.results,
    headerTypes007Result: headerTypes007.results,
    headerTypes008Result: headerTypes008.results,
  }),
)(injectCommonProp(MarcRecord)));
