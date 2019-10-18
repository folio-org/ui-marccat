// @flow
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
  Col,
  Icon,
  EmptyMessage
} from '@folio/stripes/components';
import { AppIcon } from '@folio/stripes-core';
import { FormattedMessage } from 'react-intl';
import { bindActionCreators } from 'redux';
import { union, sortBy, includes } from 'lodash';
import {
  TAG_WITH_NO_HEADING_ASSOCIATED,
  replaceAllinverted,
  RECORD_ACTION,
  RECORD_FIELD_STATUS,
  SORTED_BY,
  SUBFIELD_DELIMITER
} from '../..';
import {
  injectProps,
  buildUrl, findParam, Localize, post, del
} from '../../../../shared';
import { ACTION } from '../../../../redux/actions/Actions';
import {
  filterMandatoryFields,
  showValidationMessage,
  filterFixedFieldForSaveRecord,
  filterVariableFields
} from '../../Utils/MarcApiUtils';
import * as C from '../../../../config/constants';
import * as MarcAction from '../../Actions';
import type { Props } from '../../..';
import type { RecordTemplate, Type } from '../../../../flow/cataloging.js.flow';
import style from '../../Style/index.css';
import { formFieldValue, resolve } from '../../../../redux/helpers/Selector';
import { TAGS, TAG_NOT_REPEATABLE } from '../../Utils/MarcConstant';
import DataFieldForm from '../Form/DataField';
import VariableFieldForm from '../Form/VariableField';

class Record extends React.Component<Props, {
  callout: React.RefObject<Callout>,
}> {
  constructor(props) {
    super(props);
    this.state = {
      isEditMode:  (findParam('mode') === RECORD_ACTION.EDIT_MODE),
      mode: findParam('mode'),
      id: findParam('id'),
      submit: false,
      deletedTag: false,
      statusCode: ''
    };
    this.renderDropdownLabels = this.renderDropdownLabels.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.callout = React.createRef();
    this.onCreate = this.onCreate.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.saveRecord = this.saveRecord.bind(this);
    this.deleteRecord = this.deleteRecord.bind(this);
  }

  // eslint-disable-next-line camelcase
  UNSAFE_componentWillMount() {
    const { datastore: { emptyRecord }, loadLeaderData, loadHeadertype } = this.props;
    const { leader } = emptyRecord.results;
    loadLeaderData({ value: leader.value, code: leader.code, typeCode: '15' });
    loadHeadertype([TAGS._006, TAGS._007, TAGS._008]);
  }


  getCurrentRecord = (): Object => {
    const { datastore: { emptyRecord, recordDuplicate }, recordDetail } = this.props;
    const { mode } = this.state;

    if (mode === RECORD_ACTION.CREATION_MODE) return Object.assign({}, emptyRecord.results);
    else if (mode === RECORD_ACTION.EDIT_MODE) return Object.assign({}, recordDetail);
    else return Object.assign({}, recordDuplicate.results.bibliographicRecord);
  };

  onCreate = (item, _state) => {
    const { store } = this.props;
    const { variableField: { code, ind1, ind2, displayValue } } = item;
    const cretaeHeadingForTag = includes(TAG_WITH_NO_HEADING_ASSOCIATED, item.code);
    const isNotRepetableField = includes(TAG_NOT_REPEATABLE, item.code);
    const heading = { ind1, ind2, displayValue: replaceAllinverted(displayValue), tag: code };
    item.fieldStatus = (item.variableField.keyNumber > 0 || item.mandatory) ? RECORD_FIELD_STATUS.CHANGED : RECORD_FIELD_STATUS.NEW;
    item.variableField.displayValue = heading.displayValue;

    const form: [] = formFieldValue(store, C.REDUX.FORM.VARIABLE_FORM, 'items');
    const tag = form.filter(e => e.code === item.code);
    const length = tag.length;

    if (length > 1 && isNotRepetableField) {
      showValidationMessage(this.callout, Localize({ key: 'cataloging.record.tag.duplicate.error', value: item.code }), C.VALIDATION_MESSAGE_TYPE.ERROR);
      return form.splice(0, 1);
    }
    return (!cretaeHeadingForTag) ? this.asyncCreateHeading(item, heading) : this.setupComonProperties(item, heading);
  }

  // TODO FIXME
  asyncCreateHeading = async (item, heading) => {
    const { store } = this.props;
    try {
      const response = await post(buildUrl(store.getState(), C.ENDPOINT.CREATE_HEADING_URL, C.ENDPOINT.DEFAULT_LANG_VIEW), heading, store.getState());
      const data = await response.json();
      item.variableField.categoryCode = data.categoryCode;
      if (item.variableField.keyNumber > 0) {
        item.variableField.newKeyNumber = data.keyNumber || item.variableField.keyNumber;
      } else {
        item.variableField.keyNumber = data.keyNumber || item.variableField.keyNumber;
      }
      item.variableField.displayValue = data.displayValue;
      if (response.status === 201) {
        showValidationMessage(this.callout, Localize({ key: 'cataloging.record.tag.create.success', value: item.code }), C.VALIDATION_MESSAGE_TYPE.SUCCESS);
      } else {
        showValidationMessage(this.callout, Localize({ key: 'cataloging.record.tag.create.failure', value: item.code }), C.VALIDATION_MESSAGE_TYPE.ERROR);
        const form: [] = formFieldValue(store, C.REDUX.FORM.VARIABLE_FORM, 'items');
        form.splice(0, 1);
      }
    } catch (exception) {
      showValidationMessage(this.callout, Localize({ key: 'cataloging.record.tag.create.failure', value: item.code }), C.VALIDATION_MESSAGE_TYPE.ERROR);
    }
  };


  setupComonProperties = (item, heading) => {
    item.variableField.displayValue = heading.displayValue;
    if (item.variableField.keyNumber > 0) {
      this.asyncCreateHeading(item, heading);
    }
  };


  onDelete = item => {
    item.fieldStatus = RECORD_FIELD_STATUS.DELETED;
    this.setState({
      deletedTag: true
    });
  }

  saveRecord = async () => {
    const { datastore: { emptyRecord }, store: { getState } } = this.props;
    const { deletedTag } = this.state;
    let { statusCode } = this.state;
    const formData = getState().form.dataFieldForm.values;
    const initialValues = getState().form.variableFieldForm.initial.items;
    let variableFormData = getState().form.variableFieldForm.values.items;

    // to remove
    variableFormData.map(k => k.variableField.displayValue = k.variableField.displayValue.replace(/\$/g, SUBFIELD_DELIMITER));

    if (deletedTag) variableFormData = union(variableFormData, initialValues);

    const bibliographicRecord = this.getCurrentRecord();
    bibliographicRecord.leader.value = formData.leader;

    const recordTemplate: RecordTemplate<Type> = {
      id: 1,
      fields: filterMandatoryFields(emptyRecord.results.fields)
    };

    bibliographicRecord.fields = union(filterFixedFieldForSaveRecord(bibliographicRecord.fields), variableFormData);
    bibliographicRecord.fields = sortBy(bibliographicRecord.fields, SORTED_BY.CODE);
    const payload = { bibliographicRecord, recordTemplate };
    this.setState({ submit: true });

    await post(buildUrl(getState(), C.ENDPOINT.BIBLIOGRAPHIC_RECORD, C.ENDPOINT.DEFAULT_LANG_VIEW), payload, getState())
      .then((r) => {
        statusCode = r.status;
        return r.json();
      })
      .then(() => {
        if (statusCode === 201) {
          showValidationMessage(this.callout, 'cataloging.record.update.success', 'success');
        } else {
          showValidationMessage(this.callout, 'cataloging.record.update.error', 'error');
        }
        setTimeout(() => {
          this.handleClose();
        }, 2000);
      });
  }

  deleteRecord = async () => {
    let { statusCode } = this.state;
    const { recordDetail, store } = this.props;
    await del(buildUrl(store.getState(), C.ENDPOINT.BIBLIOGRAPHIC_RECORD + '/' + recordDetail.id, C.ENDPOINT.DEFAULT_LANG_VIEW), recordDetail.id, store.getState())
      .then((r) => {
        statusCode = r.status;
      })
      .then(() => {
        if (statusCode === 204) {
          showValidationMessage(this.callout, 'cataloging.record.DELETED.success', 'success');
        } else {
          showValidationMessage(this.callout, 'cataloging.record.DELETED.error', 'error');
        }
        setTimeout(() => {
          this.handleClose();
        }, 2000);
      });
  };

  handleClose = () => {
    const { id, submit } = this.state;
    const { dispatch, router, toggleFilterPane, reset } = this.props;
    dispatch({ type: ACTION.FILTERS, payload: {}, filterName: '', isChecked: false });
    reset();
    toggleFilterPane();
    return (submit) ? router.push(`/marccat/search?savedId=${id}`) : router.push('/marccat/search');
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
    const bibliographicRecord = this.getCurrentRecord();

    return (!leaderData) ? (<Icon icon="spinner-ellipsis" />) : (
      <Fragment>
        <Paneset static>
          <Pane
            defaultWidth="fullWidth"
            paneTitle={(bibliographicRecord && isEditMode) ? 'Edit Record' : 'New Monograph'}
            paneSub={'id. ' + bibliographicRecord.id || id}
            appIcon={<AppIcon app={C.META.ICON_TITLE} />}
            actionMenu={() => {}}
            dismissible
            onClose={() => this.handleClose()}
            lastMenu={this.renderButtonMenu()}
          >
            <Row center="xs">
              <Col xs={12} sm={6} md={8} lg={8}>
                <AccordionSet>
                  <DataFieldForm
                    {...this.props}
                    leaderData={leaderData}
                    record={bibliographicRecord}
                  />
                  <VariableFieldForm
                    {...this.props}
                    fields={filterVariableFields(bibliographicRecord.fields)}
                    onCreate={this.onCreate}
                    onDelete={this.onDelete}
                  />
                </AccordionSet>
              </Col>
            </Row>
          </Pane>
        </Paneset>
        <Callout ref={this.callout} />
      </Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  loadHeadertype: (tag: []) => _ => {
    tag.forEach(t => dispatch(MarcAction.headertypeAction(t)));
  },
  loadLeaderData: (payload) => _ => {
    dispatch(MarcAction.leaderDropdownAction(payload));
  }
}, dispatch);

export default (connect(
  ({ marccat: { data } }) => ({
    emptyRecord: data.results,
    recordDetail: resolve(data, 'marcRecordDetail').bibliographicRecord,
    leaderData: resolve(data, 'leaderData'),
  }), mapDispatchToProps
)(injectProps(Record)));
