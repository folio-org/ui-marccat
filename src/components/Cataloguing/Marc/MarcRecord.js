/* eslint-disable react/no-unused-state */
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
  Icon
} from '@folio/stripes/components';
import { AppIcon } from '@folio/stripes-core';
import { FormattedMessage } from 'react-intl';
import { union, sortedUniqBy, includes, intersection, first } from 'lodash';
import { Redux, ReduxForm } from '../../../redux/helpers/Redux';
import {
    TAG_WITH_NO_HEADING_ASSOCIATED,
    replaceAllinverted,
    RECORD_ACTION,
    RECORD_FIELD_STATUS
} from '..';
import { ActionMenuTemplate, SingleCheckboxIconButton } from '../../../lib';
import { ActionTypes } from '../../../redux/actions/Actions';
import { post, put } from '../../../core/api/HttpService';
import * as C from '../../../shared/Constants';
import { buildUrl, findParam } from '../../../shared/Function';
import style from '../Style/style.css';
import { injectCommonProp, Props } from '../../../core';
import { SUBFIELD_DELIMITER, TAG_NOT_REPEATABLE } from '../Utils/MarcConstant';
import { filterMandatoryFields, showValidationMessage } from '../Utils/MarcApiUtils';
import * as MarcAction from '../Actions';
import { FixedFields, MarcLeader, VariableFields } from '.';

export class MarcRecord extends React.Component<Props, {
  callout: React.RefObject<Callout>,
}> {
  constructor(props) {
    super(props);
    this.state = {
      // record: props.bibliographicRecord.data, (this is the right way)
      isEditMode: false,
      mode: findParam('mode'),
      id: findParam('id'),
    };
    this.renderDropdownLabels = this.renderDropdownLabels.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.callout = React.createRef();
    this.onCreate = this.onCreate.bind(this);
    this.onUpdate = this.onUpdate.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.saveRecord = this.saveRecord.bind(this);
    this.deleteRecord = this.deleteRecord.bind(this);
  }

  componentWillMount() {
    const { dispatch, datastore: { emptyRecord } } = this.props;
    const { leader } = emptyRecord.results;

    const { mode } = this.state;
    if (mode === RECORD_ACTION.EDIT_MODE) { this.setState({ isEditMode: true }); }

    dispatch({ type: ActionTypes.LEADER_VALUES_FROM_TAG, leader: leader.value, code: leader.code, typeCode: '15' });
    const payload = { value: leader.value, code: leader.code, typeCode: 15 };
    dispatch(MarcAction.leaderAction(payload));
    dispatch(MarcAction.settingsAction({ fromCataloging: true }));
  }

  getCurrentRecord = () => {
    const { datastore: { emptyRecord }, recordDetail } = this.props;
    const { isEditMode } = this.state;

    const emptyRecordTemplate = Object.assign({}, emptyRecord.results);
    return (!isEditMode) ? emptyRecordTemplate : recordDetail;
  };

  createNewHeading = (item) => {
    const { dispatch } = this.props;
    const { id } = this.state;
    const displayValue: string = item.variableField.displayValue.replace(/\$/g, SUBFIELD_DELIMITER);
    item.displayValue = displayValue;
    dispatch(MarcAction.createHeadingAction(id, item));
  };

  onUpdate = item => {
    // eslint-disable-next-line prefer-const
    let { variableField: { code, ind1, ind2, displayValue, keyNumber, categoryCode } } = item;
    const cretaeHeadingForTag = includes(TAG_WITH_NO_HEADING_ASSOCIATED, item.code);
    const heading = {
      ind1,
      ind2,
      categoryCode,
      keyNumber,
      displayValue: displayValue.replace(/\$/g, SUBFIELD_DELIMITER),
      tag: code
    };
    if (!cretaeHeadingForTag) {
      put(buildUrl(C.ENDPOINT.UPDATE_HEADING_URL, C.ENDPOINT.DEFAULT_LANG_VIEW), heading)
        .then((r) => { return r.json(); }).then((data) => {
          categoryCode = data.categoryCode;
          keyNumber = data.keyNumber;
          displayValue = data.displayValue;
        });
    }
  }

  onCreate = item => {
    const { store } = this.props;
    const { variableField: { code, ind1, ind2, headingNumber } } = item;
    const cretaeHeadingForTag = includes(TAG_WITH_NO_HEADING_ASSOCIATED, item.code);
    const displayVal: string = replaceAllinverted(item.variableField.displayValue);
    ReduxForm.resolve(store, 'marcEditableListForm').items[0] = item;
    const heading = { ind1, ind2, headingNumber, displayValue: displayVal, tag: code };

    const tagVariableData = store.getState().form.marcEditableListForm.values.items;
    const temp = [];
    tagVariableData.map(k => temp.push(k.code));

    // if (intersection(TAG_NOT_REPEATABLE, temp) > 0) {
    //   showValidationMessage(this.callout, 'Non sono ammessi tag repeatble', 'error');
    //   return;
    // }

    if (!cretaeHeadingForTag) {
      post(buildUrl(C.ENDPOINT.CREATE_HEADING_URL, C.ENDPOINT.DEFAULT_LANG_VIEW), heading)
        .then((r) => { return r.json(); }).then((data) => {
          item.variableField.categoryCode = data.categoryCode;
          item.variableField.keyNumber = data.keyNumber;
          item.variableField.displayValue = data.displayValue;
        });
    } else {
      item.variableField.displayValue = displayVal;
    }
  }

  onDelete = item => {
    const { dispatch } = this.props;
    const { variableField } = item;
    item.fieldStatus = RECORD_FIELD_STATUS.DELETED;
    const heading = {
      ind1: variableField.ind1,
      ind2: variableField.ind2,
      displayValue: variableField.displayValue,
      tag: item.code,
      categoryCode: variableField.categoryCode,
      keyNumber: variableField.keyNumber
    };
    dispatch(MarcAction.deleteHeadingAction(heading));
  };

  saveRecord = () => {
    const { data, dispatch, datastore: { emptyRecord }, store: { getState } } = this.props;
    const formData = getState().form.bibliographicRecordForm.values;
    const tagVariableData = getState().form.marcEditableListForm.values.items;

    const bibliographicRecord = this.getCurrentRecord();
    bibliographicRecord.leader.value = formData.Leader;

    // eslint-disable-next-line no-unused-vars
    const recordTemplates = Object.assign({}, emptyRecord.results);

    const recordTemplate = {
      id: first(data.template.records).id,
      name: first(data.template.records).name,
      type: 'B',
      fields: filterMandatoryFields(emptyRecord.results.fields)
    };
    bibliographicRecord.fields = Object.values(bibliographicRecord.fields.reduce((acc, cur) => Object.assign(acc, { [cur.code]: cur }), {}));
    bibliographicRecord.fields = union(bibliographicRecord.fields, tagVariableData);
    bibliographicRecord.fields = sortedUniqBy(bibliographicRecord.fields, 'code');
    const payload = { bibliographicRecord, recordTemplate };
    dispatch(MarcAction.saveRecordAction(payload));
    this.handleClose();
  }

  deleteRecord = () => {
    const { dispatch, recordDetail } = this.props;
    dispatch(MarcAction.deleteRecordAction(recordDetail));
  };

  handleClose = () => {
    const { id } = this.state;
    const { store, dispatch, router, toggleFilterPane } = this.props;
    dispatch({ type: ActionTypes.FILTERS, payload: {}, filterName: '', isChecked: false });
    toggleFilterPane();
    router.push(`/marccat/search?id=${id}`);
    Redux.reset(store, 'data');
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
        <React.Fragment>
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
                        onDelete={this.onDelete}
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
  form: C.REDUX.FORM.BIBLIOGRAPHIC_FORM,
  destroyOnUnmount: false,
})(connect(
  ({ marccat: { data, template, settings, leaderData, headerTypes006, headerTypes007, headerTypes008 } }) => ({
    emptyRecord: data.results,
    recordDetail: Redux.resolve(data, 'marcRecordDetail').bibliographicRecord,
    bibliographicRecord: first(settings.detail),
    defaultTemplate: template.records,
    leaderData: leaderData.records,
    headerTypes006Result: headerTypes006.results,
    headerTypes007Result: headerTypes007.results,
    headerTypes008Result: headerTypes008.results,
  }),
)(injectCommonProp(MarcRecord)));
