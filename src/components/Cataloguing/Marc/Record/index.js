// @flow
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { compose, setDisplayName } from 'recompose';
import {
  Callout,
  Icon
} from '@folio/stripes/components';
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
  buildUrl, findParam, Localize, post
} from '../../../../shared';
import {
  filterMandatoryFields,
  showValidationMessage,
  filterFixedFields,
} from '../../Utils/MarcApiUtils';
import * as C from '../../../../config/constants';
import * as MarcAction from '../../Actions';
import type { Props } from '../../..';
import type { RecordTemplate, Type } from '../../../../flow/cataloging.js.flow';
import { formFieldValue, resolve } from '../../../../redux/helpers/selector';
import { TAGS, TAG_NOT_REPEATABLE } from '../../Utils/MarcConstant';
import RecordPane from './Components/RecordPane';
import { ACTION, destroy } from '../../../../redux/actions';

/**
 *
 * @export
 * @class Record
 * @extends {React.Component<Props, {
 *   callout: React.RefObject<Callout>,
 * }>}
 */
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
    };
    this.callout = React.createRef();
    this.onCreate = this.onCreate.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.saveRecord = this.saveRecord.bind(this);
  }

  componentWillMount() {
    const { datastore: { emptyRecord }, loadLeaderData, loadHeadertype } = this.props;
    const { leader } = emptyRecord.results;
    loadLeaderData({ value: leader.value, code: leader.code, typeCode: '15' });
    loadHeadertype([TAGS._006, TAGS._007, TAGS._008]);
  }

  getCurrentRecord = (): {} => {
    const { datastore: { emptyRecord, recordDuplicate }, recordDetail } = this.props;
    const { mode } = this.state;

    if (mode === RECORD_ACTION.CREATION_MODE) return Object.assign({}, emptyRecord.results);
    else if (mode === RECORD_ACTION.EDIT_MODE) return Object.assign({}, recordDetail);
    else return Object.assign({}, recordDuplicate.results.bibliographicRecord);
  };

  onCreate = item => {
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
    return (!cretaeHeadingForTag || item.variableField.keyNumber > 0) ? this.asyncCreateHeading(item, heading) : this.setupComonProperties(item, heading);
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
    item.variableField.displayValue = heading.displayValue;
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
    const formData = getState().form.fixedFieldForm.values;
    const initialValues = getState().form.variableFieldForm.initial.items;
    let variableFormData = getState().form.variableFieldForm.values.items;

    variableFormData.map(k => k.variableField.displayValue = k.variableField.displayValue.replace(/\$/g, SUBFIELD_DELIMITER));

    if (deletedTag) variableFormData = union(variableFormData, initialValues);

    const bibliographicRecord = this.getCurrentRecord();
    bibliographicRecord.leader.value = formData.Leader;

    const recordTemplate: RecordTemplate<Type> = {
      id: 408,
      fields: filterMandatoryFields(emptyRecord.results.fields)
    };

    bibliographicRecord.fields = union(filterFixedFields(bibliographicRecord.fields), variableFormData);
    bibliographicRecord.fields = sortBy(bibliographicRecord.fields, SORTED_BY.CODE);
    const payload = { bibliographicRecord, recordTemplate };
    this.setState({ submit: true });

    await post(buildUrl(C.ENDPOINT.BIBLIOGRAPHIC_RECORD, C.ENDPOINT.DEFAULT_LANG_VIEW), payload)
      .then((r) => { return r.json(); })
      .then((_response) => {
        showValidationMessage(this.callout, 'cataloging.record.update.success', 'success');
        setTimeout(() => {
          this.handleClose();
        }, 2000);
      }).catch(() => {
        showValidationMessage(this.callout, 'cataloging.record.update.error', 'error');
      });
  }

  handleClose = () => {
    const { id } = this.state;
    const { dispatch, router, toggleFilterPane, reset, submit } = this.props;
    dispatch({ type: ACTION.FILTERS, payload: {}, filterName: '', isChecked: false });
    reset();
    dispatch(destroy());
    toggleFilterPane();
    return (submit) ? router.push(`/marccat/search?savedId=${id}`) : router.push('/marccat/search');
  };


  render() {
    const { leaderData, recordDetail } = this.props;
    const { isEditMode, id, submit } = this.state;
    const record = this.getCurrentRecord();

    return (!leaderData) ?
      (
        <Icon icon="spinner-ellipsis" />
      ) :
      (
        <Fragment>
          <RecordPane
            {...this.props}
            id={id}
            record={record}
            detail={recordDetail}
            leaderData={leaderData}
            mode={isEditMode}
            saveRecord={this.saveRecord}
            onCreate={this.onCreate}
            onDelete={this.onDelete}
            submit={submit}
          />
          <Callout ref={this.callout} />
        </Fragment>
      );
  }
}


const mapStateToProps = state => ({
  isEditMode: state.isEditMode,
  id: state.id,
  mode: state.mode,
});

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
