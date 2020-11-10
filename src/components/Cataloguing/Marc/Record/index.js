// @flow
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import {
  Pane,
  Paneset,
  AccordionSet,
  Callout,
  Row,
  Button,
  Col,
  Icon,
  PaneFooter
} from '@folio/stripes/components';
import { FormattedMessage } from 'react-intl';
import { AppIcon } from '@folio/stripes-core';
import { bindActionCreators } from 'redux';
import { union, sortBy, includes } from 'lodash';
import {
  TAG_WITH_NO_HEADING_ASSOCIATED,
  replaceAllinverted,
  RECORD_ACTION,
  RECORD_FIELD_STATUS,
  SORTED_BY,
  SUBFIELD_DELIMITER,
} from '../..';
import {
  injectProps,
  buildUrl,
  findParam,
  Localize,
  post,
  del,
} from '../../../../shared';
import { ACTION } from '../../../../redux/actions/Actions';
import {
  filterMandatoryFields,
  showValidationMessage,
  filterFixedFieldForSaveRecord,
  filterVariableFields,
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


class Record extends React.Component<
  Props,
  { callout: React.RefObject<Callout> }
> {
  constructor(props) {
    super(props);
    const modeParam = findParam('mode') !== null ? findParam('mode') : props.location.state.mode;
    const idParam = findParam('id') !== null ? findParam('id') : props.location.state.id;
    this.state = {
      isCreationMode: modeParam === RECORD_ACTION.CREATION_MODE,
      isEditMode: modeParam === RECORD_ACTION.EDIT_MODE,
      isDuplicateMode: modeParam === RECORD_ACTION.DUPLICATE_MODE,
      mode: modeParam,
      id: idParam,
      submit: false,
      deletedTag: false,
      statusCode: '',
    };
    this.handleClose = this.handleClose.bind(this);
    this.callout = React.createRef();
    this.onCreate = this.onCreate.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.saveRecord = this.saveRecord.bind(this);
    this.deleteRecord = this.deleteRecord.bind(this);
    // this.checkForIndicators = this.checkForIndicators.bind(this);
  }

  // eslint-disable-next-line camelcase
  UNSAFE_componentWillMount() {
    const {
      datastore: { emptyRecord, emptyRecordAuth },
      data: { search: { segment } },
      editLoadLeaderData,
      loadLeaderData,
      loadHeadertype,
      dispatch,
    } = this.props;
    const { isEditMode, isDuplicateMode } = this.state;
    const emptyRecordAux = segment === C.SEARCH_SEGMENT.BIBLIOGRAPHIC ? emptyRecord : emptyRecordAuth;
    if (isEditMode || isDuplicateMode) {
      const { recordDetail } = this.props;
      const leaderEdit = recordDetail.leader;
      editLoadLeaderData({
        value: leaderEdit.value,
        code: leaderEdit.code,
        typeCode: '15',
        segment
      });
      if (segment === C.SEARCH_SEGMENT.BIBLIOGRAPHIC) {
        loadHeadertype([TAGS._006, TAGS._007, TAGS._008]);
        dispatch(MarcAction.change008ByLeaderAction(leaderEdit.value));
      } else {
        loadHeadertype([TAGS._008]);
        const playParams = {
          value: leaderEdit.value,
          code: '008',
          typeCode: '10',
        };
        dispatch(MarcAction.change008ActionAuth(playParams));
      }
    } else {
      const { leader } = emptyRecordAux.results;
      loadLeaderData({
        value: leader.value,
        code: leader.code,
        typeCode: '15',
        segment
      });
      if (segment === C.SEARCH_SEGMENT.BIBLIOGRAPHIC) {
        loadHeadertype([TAGS._006, TAGS._007, TAGS._008]);
        dispatch(MarcAction.change008ByLeaderAction(leader.value));
      } else {
        loadHeadertype([TAGS._008]);
        const playParams = {
          value: leader.value,
          code: '008',
          typeCode: '10',
        };
        dispatch(MarcAction.change008ActionAuth(playParams));
      }
    }
  }

  getCurrentRecord = (): Object => {
    const {
      datastore: { emptyRecord, emptyRecordAuth, recordDuplicate },
      data: { search: { segment } },
      recordDetail,
    } = this.props;
    const { mode } = this.state;
    const emptyRecordAux = segment === C.SEARCH_SEGMENT.BIBLIOGRAPHIC ? emptyRecord : emptyRecordAuth;

    if (mode === RECORD_ACTION.CREATION_MODE) return Object.assign({}, emptyRecordAux.results);
    else if (mode === RECORD_ACTION.EDIT_MODE) return Object.assign({}, recordDetail);
    else return Object.assign({}, recordDuplicate.results.bibliographicRecord);
  };

  onCreate = (item, _state) => {
    const { store } = this.props;
    const { isDuplicateMode } = this.state;
    const {
      variableField: { code, ind1, ind2, displayValue },
    } = item;
    const cretaeHeadingForTag = includes(
      TAG_WITH_NO_HEADING_ASSOCIATED,
      item.code
    );
    const isNotRepetableField = includes(TAG_NOT_REPEATABLE, item.code);
    const heading = {
      ind1,
      ind2,
      displayValue: replaceAllinverted(displayValue),
      tag: code,
    };
    if (isDuplicateMode) {
      item.fieldStatus = RECORD_FIELD_STATUS.NEW;
    } else {
      item.fieldStatus =
        item.variableField.keyNumber > 0 || item.mandatory
          ? RECORD_FIELD_STATUS.CHANGED
          : RECORD_FIELD_STATUS.NEW;
    }
    item.variableField.displayValue = heading.displayValue;
    const form: [] = formFieldValue(store, C.REDUX.FORM.VARIABLE_FORM, 'items');
    const tag = form.filter(e => e.code === item.code);
    const length = tag.length;

    if (length > 1 && isNotRepetableField) {
      showValidationMessage(
        this.callout,
        Localize({
          key: 'cataloging.record.tag.duplicate.error',
          value: item.code,
        }),
        C.VALIDATION_MESSAGE_TYPE.ERROR
      );
      return form.splice(0, 1);
    }
    return !cretaeHeadingForTag
      ? this.asyncCreateHeading(item, heading)
      : this.setupComonProperties(item, heading);
  };

  // TODO FIXME
  asyncCreateHeading = async (item, heading) => {
    const { store } = this.props;
    const { isDuplicateMode } = this.state;
    try {
      const response = await post(
        buildUrl(
          store.getState(),
          C.ENDPOINT.CREATE_HEADING_URL,
          C.ENDPOINT.DEFAULT_LANG_VIEW
        ),
        heading,
        store.getState()
      );
      const data = await response.json();
      item.variableField.categoryCode = data.categoryCode;
      if (item.variableField.keyNumber > 0 && !isDuplicateMode) {
        item.variableField.newKeyNumber =
          data.keyNumber || item.variableField.keyNumber;
      } else {
        item.variableField.keyNumber =
          data.keyNumber || item.variableField.keyNumber;
      }
      item.variableField.displayValue = data.displayValue;
      if (response.status === 201) {
        showValidationMessage(
          this.callout,
          Localize({
            key: 'cataloging.record.tag.create.success',
            value: item.code,
          }),
          C.VALIDATION_MESSAGE_TYPE.SUCCESS
        );
      } else {
        showValidationMessage(
          this.callout,
          Localize({
            key: 'cataloging.record.tag.create.failure',
            value: item.code,
          }),
          C.VALIDATION_MESSAGE_TYPE.ERROR
        );
        const form: [] = formFieldValue(
          store,
          C.REDUX.FORM.VARIABLE_FORM,
          'items'
        );
        form.splice(0, 1);
      }
    } catch (exception) {
      showValidationMessage(
        this.callout,
        Localize({
          key: 'cataloging.record.tag.create.failure',
          value: item.code,
        }),
        C.VALIDATION_MESSAGE_TYPE.ERROR
      );
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
      deletedTag: true,
    });
  };

  saveRecord = async e => {
    e.stopPropagation();
    const {
      datastore: { emptyRecord, emptyRecordAuth },
      data: { search: { segment } },
      store: { getState },
    } = this.props;
    const { deletedTag, isCreationMode, isDuplicateMode } = this.state;
    const formData = getState().form.dataFieldForm.values;
    const initialValues = getState().form.variableFieldForm.initial.items;
    let variableFormData = getState().form.variableFieldForm.values.items;
    const emptyRecordAux = segment === C.SEARCH_SEGMENT.BIBLIOGRAPHIC ? emptyRecord : emptyRecordAuth;

    // to remove
    variableFormData.map(
      k => (k.variableField.displayValue = k.variableField.displayValue.replace(
        /\$/g,
        SUBFIELD_DELIMITER
      ))
    );

    if (!isDuplicateMode && deletedTag) variableFormData = union(variableFormData, initialValues);

    const bibliographicRecord = this.getCurrentRecord();
    const authorityRecord = this.getCurrentRecord();
    bibliographicRecord.leader.value = formData.leader;

    const recordTemplate: RecordTemplate<Type> = {
      id: 1,
      fields: filterMandatoryFields(emptyRecordAux.results.fields),
    };
    if (!isCreationMode) {
      if (formData.Tag006 !== null) {
        emptyRecordAux.results.fields.map(f => (f.code === '006' ? bibliographicRecord.fields.push(f) : null));
      }
      if (formData.Tag007 !== null) {
        emptyRecordAux.results.fields.map(f => (f.code === '007' ? bibliographicRecord.fields.push(f) : null));
      }
    }
    bibliographicRecord.fields = union(
      filterFixedFieldForSaveRecord(bibliographicRecord.fields),
      variableFormData
    );
    bibliographicRecord.fields = sortBy(
      bibliographicRecord.fields,
      SORTED_BY.CODE
    );
    if (isCreationMode) {
      if (formData.Tag006 === null) {
        bibliographicRecord.fields.map((f, index) => (f.code === '006' ? bibliographicRecord.fields.splice(index, 1) : null));
      }
      if (formData.Tag007 === null) {
        bibliographicRecord.fields.map((f, index) => (f.code === '007' ? bibliographicRecord.fields.splice(index, 1) : null));
      }
    }
    const payload = segment === C.SEARCH_SEGMENT.BIBLIOGRAPHIC ? { bibliographicRecord, recordTemplate } : { authorityRecord, recordTemplate };
    this.setState({ submit: true });

    await post(
      buildUrl(
        getState(),
        segment === C.SEARCH_SEGMENT.BIBLIOGRAPHIC ? C.ENDPOINT.BIBLIOGRAPHIC_RECORD : C.ENDPOINT.AUTHORITY_RECORD,
        C.ENDPOINT.DEFAULT_LANG_VIEW
      ),
      payload,
      getState()
    )
      .then(r => {
        return r.json();
      })
      .then(r => {
        const checkCodeForSearch = r.statusCode;
        if (r.statusCode === 'OK') {
          showValidationMessage(
            this.callout,
            'Record saved correctly!',
            'success'
          );
        } else {
          showValidationMessage(
            this.callout,
            'Failed: something went wrong',
            'error'
          );
        }
        setTimeout(() => {
          this.handleClose(checkCodeForSearch, bibliographicRecord.id);
        }, 2000);
      });
  };

  deleteRecord = async () => {
    let { statusCode } = this.state;
    const { recordDetail, store, router, reset, translate, toggleFilterPane, data: { search: { segment } } } = this.props;
    await del(
      buildUrl(
        store.getState(),
        segment === C.SEARCH_SEGMENT.BIBLIOGRAPHIC
          ? `${C.ENDPOINT.BIBLIOGRAPHIC_RECORD}/${recordDetail.id}`
          : `${C.ENDPOINT.AUTHORITY_RECORD}/${recordDetail.id}`,
        C.ENDPOINT.DEFAULT_LANG_VIEW
      ),
      recordDetail.id,
      store.getState()
    )
      .then(r => {
        statusCode = r.status;
      })
      .then(() => {
        switch (statusCode) {
        case 204: {
          showValidationMessage(
            this.callout,
            translate({ id: 'ui-marccat.search.record.deletemodal.deletesuccess' }),
            'success'
          );
          break;
        }
        case 423: {
          const msg423 = segment === C.SEARCH_SEGMENT.AUTHORITY
            ? translate({ id: 'ui-marccat.search.record.deletemodal.notdeletedrecordused.bib' })
            : translate({ id: 'ui-marccat.search.record.deletemodal.notdeletedrecordused.auth' });
          showValidationMessage(this.callout, msg423, 'error');
          break;
        }
        default: {
          showValidationMessage(
            this.callout,
            translate({ id: 'ui-marccat.search.record.deletemodal.deletewrong' }),
            'error'
          );
          break;
        }
        }

        setTimeout(() => {
          reset();
          toggleFilterPane();
          return router.push('/marccat/search');
        }, 2000);
      });
  };

  handleClose = (checkCodeForSearch, idFromBibRecord) => {
    const { submit } = this.state;
    const { dispatch, router, toggleFilterPane, reset, data: { search: { segment } } } = this.props;
    if (checkCodeForSearch === 'OK') {
      dispatch({
        type: ACTION.FILTERS,
        payload: {},
        filterName: '',
        isChecked: false,
      });
      reset();
      toggleFilterPane();
      return submit
        ? router.push(`/marccat/search?segment=${segment}&savedId=${idFromBibRecord}`)
        : router.push(`/marccat/search?segment=${segment}`);
    } else if (checkCodeForSearch === undefined) {
      dispatch({
        type: ACTION.FILTERS,
        payload: {},
        filterName: '',
        isChecked: false,
      });
      reset();
      toggleFilterPane();
      return router.push(`/marccat/search?segment=${segment}`);
    }
    // GET for check if the record is lock
    // unlock
    return reset();
  };

  lastMenu = () => {
    const { isEditMode } = this.state;
    const { translate } = this.props;
    return (
      (isEditMode) ? (
        <Button
          id="clickable-detail-delete-record"
          buttonStyle="primary"
          buttonClass={style.rightPosition}
          onClick={this.deleteRecord}
          type="button"
          disabled={false}
          marginBottom0
        >
          {translate({ id: 'ui-marccat.cataloging.record.delete' })}
        </Button>
      ) : (null)
    );
  };

  getFooter = () => {
    /* const {
      onCancel,
      handleSubmit,
      pristine,
      submitting,
      copy,
    } = this.props;*/
    const cancelButton = (
      <Button
        buttonStyle="default mega"
        id="cancel-instance-edition"
        onClick={() => this.handleClose()}
      >
        <FormattedMessage id="ui-marccat.button.cancel" />
      </Button>
    );
    const saveButton = (
      <Button
        id="clickable-save-instance"
        buttonStyle="primary mega"
        type="submit"
        onClick={this.saveRecord}
      >
        <FormattedMessage id="ui-marccat.button.saveAndClose" />
      </Button>
    );

    return (
      <PaneFooter
        renderStart={cancelButton}
        renderEnd={saveButton}
      />
    );
  };

  render() {
    const { leaderData, translate, data: { search: { segment } } } = this.props;
    const { isEditMode, id } = this.state;
    const bibliographicRecord = this.getCurrentRecord();

    const childProps = { ...this.props };
    delete childProps.emptyRecord;
    delete childProps.emptyRecordAuth;

    const paneTitle = isEditMode ? translate({ id: 'ui-marccat.cataloging.record.edit' })
      : segment === C.SEARCH_SEGMENT.BIBLIOGRAPHIC ? translate({ id: 'ui-marccat.cataloging.record.newmonograph' }) : translate({ id: 'ui-marccat.cataloging.record.newauthority' });

    return !leaderData ? (
      <Icon icon="spinner-ellipsis" />
    ) : (
      <Fragment>
        <Paneset static>
          <Pane
            defaultWidth="fullWidth"
            paneTitle={paneTitle}
            paneSub={'id. ' + bibliographicRecord.id || id}
            appIcon={<AppIcon app={C.META.ICON_TITLE} />}
            lastMenu={this.lastMenu()}
            dismissible
            onClose={() => this.handleClose()}
            footer={this.getFooter()}
          >
            <Row center="xs">
              <Col xs={12} sm={6} md={8} lg={8}>
                <AccordionSet>
                  <DataFieldForm
                    {...childProps}
                    leaderData={leaderData}
                    record={bibliographicRecord}
                  />
                  <VariableFieldForm
                    {...childProps}
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

function mapStateToProps({ marccat: { data, search: { segment } } }) {
  const toProps = segment === C.SEARCH_SEGMENT.BIBLIOGRAPHIC
    ? {
      emptyRecord: data.results,
      recordDetail: resolve(data, 'marcRecordDetail').bibliographicRecord,
      leaderData: resolve(data, 'leaderData'),
    }
    : {
      emptyRecordAuth: data.results,
      recordDetail: resolve(data, 'marcRecordDetail').authorityRecord,
      leaderData: resolve(data, 'leaderData'),
    };
  return toProps;
}

const mapDispatchToProps = (dispatch, ownProps) => bindActionCreators(
  {
    loadHeadertype: (tag: []) => _ => {
      tag.forEach(t => {
        if (ownProps.data.search.segment === C.SEARCH_SEGMENT.AUTHORITY) {
          dispatch(MarcAction.authHeadertypeAction(t));
        } else {
          dispatch(MarcAction.headertypeAction(t));
        }
      });
    },
    editLoadLeaderData: payload => _ => {
      dispatch(MarcAction.editLeaderDropdownAction(payload));
    },
    loadLeaderData: payload => _ => {
      dispatch(MarcAction.leaderDropdownAction(payload));
    },
  },
  dispatch
);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectProps(Record));
