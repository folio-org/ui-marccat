/* eslint-disable no-param-reassign */
// @flow
import React from 'react';
import { Field } from 'redux-form';
import { Select, Row, Col } from '@folio/stripes-components';
import { connect } from 'react-redux';
import { isEmpty, last } from 'lodash';
import { PreviousMap } from 'postcss';
import { EMPTY_SPACED_STRING, REDUX } from '../../../../../config/constants';
import { decamelizify, findParam } from '../../../../../shared';
import type { Props, State } from '../../../../../flow/types.js.flow';

import style from '../../../Style/index.css';
import {
  dropDownValuesAction,
  changeDisplayValueAction,
  editDropDownValuesAction,
} from '../../../Actions';
import {
  TAGS,
  VISUAL_RUNNING_TIME,
  DATE_FIRST_PUBBLICATION,
  DATE_LAST_PUBBLICATION,
  IMAGE_BIT_DEPTH,
  REDUCTION_CRIT,
  INSPECTION_DATE,
  RECORD_FIELD_STATUS,
  RECORD_ACTION,
} from '../../../Utils/MarcConstant';
import { MarcField } from '../..';
import Tag00XInput from '../components/Tag00XInput';
import HeaderTypeSelect from '../components/HeaderTypeSelect';
import { formFieldValue } from '../../../../../redux/helpers/Selector';

type S = {
  expand: Boolean,
} & State;

class Tag00X extends React.PureComponent<Props, S> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isEditMode: findParam('mode') === RECORD_ACTION.EDIT_MODE,
      expand: false,
      headerTypeCode: 0,
    };
    this.RenderSelect = this.RenderSelect.bind(this);
    this.RenderDropwDown = this.RenderDropwDown.bind(this);
    this.handleDisplayValue = this.handleDisplayValue.bind(this);
    this.onHandleChange = this.onHandleChange.bind(this);
  }

  onHandleChange = evt => {
    const {
      dispatch,
      element: { code, fixedField },
      headerTypeCodeFromLeader,
    } = this.props;
    let {
      record: {
        leader: { value },
      },
    } = this.props;
    const { isEditMode } = this.state;
    let headerTypeCode;
    let displayValue;
    headerTypeCode =
      code === TAGS._008 && headerTypeCodeFromLeader
        ? headerTypeCodeFromLeader
        : evt
          ? evt.target.value
          : fixedField.headerTypeCode;
    value =
      code === TAGS._008 && headerTypeCodeFromLeader ? leader.value : value;
    if (isEditMode && code !== TAGS._008 && evt === undefined) {
      headerTypeCode = fixedField.headerTypeCode;
      displayValue = fixedField.displayValue;
    } else if (isEditMode && code === TAGS._008) {
      displayValue = fixedField.displayValue;
      const payload = {
        value,
        code,
        headerTypeCode,
        displayValue,
        cb: r => this.handleDisplayValue(undefined, r),
      };
      this.setState({ headerTypeCode });
      dispatch(editDropDownValuesAction(payload));
    } else {
      const payload = {
        value,
        code,
        headerTypeCode,
        cb: r => this.handleDisplayValue(undefined, r),
      };
      this.setState({ headerTypeCode });
      dispatch(dropDownValuesAction(payload));
    }
  };

  handleDisplayValue = (e, data) => {
    const { headerTypeCode, isEditMode } = this.state;
    const {
      store,
      dispatch,
      change,
      element: { code },
    } = this.props;
    const payload = {};
    const fromStore = store.getState();
    let results;
    if (code === '006') {
      if (fromStore.marccat.data.fixedfield006 === undefined || !e) {
        results = data.results || data;
        Object.entries(results).map(([k, v]) => (payload[k] = v.defaultValue));
        Object.entries(results).map(([k, v]) => dispatch(change(`Tag${code}-${headerTypeCode}-${k}`, v.defaultValue)));
      } else {
        results = fromStore.marccat.data.fixedfield006.results;
        Object.entries(results).map(([k, v]) => {
          if (k !== 'attributes' || k !== 'displayValue') {
            payload[k] = v;
          }
          return payload;
        });
        const selected = last(e.target.name.split('-'));
        payload[selected] = e.target.value;
      }
    } else if (code === '007') {
      if (fromStore.marccat.data.fixedfield007 === undefined || !e) {
        results = data.results || data;
        Object.entries(results).map(([k, v]) => (payload[k] = v.defaultValue));
        Object.entries(results).map(([k, v]) => dispatch(change(`Tag${code}-${headerTypeCode}-${k}`, v.defaultValue)));
      } else {
        results = fromStore.marccat.data.fixedfield007.results;
        Object.entries(results).map(([k, v]) => {
          if (k !== 'attributes' || k !== 'displayValue') {
            payload[k] = v;
          }
          return payload;
        });
        const selected = last(e.target.name.split('-'));
        payload[selected] = e.target.value;
      }
    } else if (code === '008') {
      if (fromStore.marccat.data.fixedfield008 === undefined || !e) {
        results = data.results || data;
        Object.entries(results).map(([k, v]) => (payload[k] = v.defaultValue));
        Object.entries(results).map(([k, v]) => dispatch(change(`Tag${code}-${headerTypeCode}-${k}`, v.defaultValue)));
      } else {
        results = fromStore.marccat.data.fixedfield008.results;
        Object.entries(results).map(([k, v]) => {
          if (k !== 'attributes' || k !== 'displayValue') {
            payload[k] = v;
          }
          return payload;
        });
        const selected = last(e.target.name.split('-'));
        if (
          selected === 'dateFirstPublication' ||
          selected === 'dateLastPublication' ||
          selected === 'visualRunningTime'
        ) {
          payload[selected] = e.target.value.trim();
        } else {
          payload[selected] = e.target.value;
        }
      }
    }
    this.prepareValue(code, results, payload, headerTypeCode);
    const cb = r => this.execChange(r);
    dispatch(changeDisplayValueAction(payload, cb));
  };

  execChange = (response: Object): void => {
    const { dispatch, change, fixedfields, element } = this.props;
    dispatch(change(element.code, response.displayValue));
    if (element.code === TAGS._008) element.fieldStatus = RECORD_FIELD_STATUS.CHANGED;
    fixedfields.push(element);
    fixedfields
      .filter(f => f.code === element.code)
      .map(f => (f.fixedField = response));
  };

  prepareValue = (code, data, payload, headerTypeCode) => {
    const { store } = this.props;
    if (code === TAGS._006) {
      payload.visualRunningTime = formFieldValue(
        store,
        REDUX.FORM.DATA_FIELD_FORM,
        VISUAL_RUNNING_TIME
      );
    }
    if (code === TAGS._007) {
      if (headerTypeCode === 42) {
        payload.imageBitDepth = formFieldValue(
          store,
          REDUX.FORM.DATA_FIELD_FORM,
          IMAGE_BIT_DEPTH
        );
      } else if (headerTypeCode === 25) {
        payload.reductionRatioRangeCode = formFieldValue(
          store,
          REDUX.FORM.DATA_FIELD_FORM,
          REDUCTION_CRIT
        );
      } else if (headerTypeCode === 26) {
        payload.inspectionDate = formFieldValue(
          store,
          REDUX.FORM.DATA_FIELD_FORM,
          INSPECTION_DATE
        );
      }
    }
    if (code === TAGS._008) {
      if (headerTypeCode === 37 && payload.visualRunningTime === undefined) {
        payload.visualRunningTime = '000';
      }
      if (payload.dateFirstPublication === undefined) {
        payload.dateFirstPublication = '    ';
      }
      if (payload.dateLastPublication === undefined) {
        payload.dateLastPublication = '    ';
      }
      payload.dateEnteredOnFile = formFieldValue(
        store,
        REDUX.FORM.DATA_FIELD_FORM,
        TAGS._008
      ).substring(0, 6);
    }
    payload.code = code;
    payload.categoryCode = 1;
    payload.headerTypeCode = headerTypeCode;
    payload.sequenceNumber = 0;
  };

  RenderSelect = ({ element, ...props }) => {
    const { dispatch, change, typeCode } = this.props;
    const { isEditMode } = this.state;
    return (
      <Field
        // Field props redux-form
        name={'Tag'.concat(element.code)}
        component={Select}
        // Select props
        id={'Tag'.concat(element.code)}
        label={'Tag'.concat(element.code)}
        dataOptions={props.headertypes}
        readOnly={element.code === TAGS._008}
        onChange={this.onHandleChange}
        placeholder={'Select Heading types for '.concat(element.code)}
        value={
          element.code === TAGS._008 && props.headerTypeCodeFromLeader
            ? props.headertypes.map(k => (k.value === props.headerTypeCodeFromLeader
              ? this.onHandleChange()
              : typeCode))
            : typeCode
        }
      />
    );
  };

  RenderDropwDown = data => {
    const { headerTypeCode } = this.state;
    const {
      element: { code },
    } = this.props;
    const sortedData = Object.values(data).sort((x, y) => x.name > y.name);
    return (
      <Row>
        {code === TAGS._006 && headerTypeCode === '22' && (
          <Col xs={4}>
            <Tag00XInput
              {...this.props}
              name={VISUAL_RUNNING_TIME}
              onChange={e => this.handleDisplayValue(e, sortedData)}
            />
          </Col>
        )}
        {code === TAGS._007 && headerTypeCode === '25' && (
          <Col xs={4}>
            <Tag00XInput
              {...this.props}
              name={REDUCTION_CRIT}
              onChange={e => this.handleDisplayValue(e, sortedData)}
            />
          </Col>
        )}
        {code === TAGS._007 && headerTypeCode === '26' && (
          <Col xs={4}>
            <Tag00XInput
              {...this.props}
              name={INSPECTION_DATE}
              onChange={e => this.handleDisplayValue(e, sortedData)}
            />
          </Col>
        )}
        {code === TAGS._007 && headerTypeCode === '42' && (
          <Col xs={4}>
            <Tag00XInput
              {...this.props}
              name={IMAGE_BIT_DEPTH}
              onChange={e => this.handleDisplayValue(e, sortedData)}
            />
          </Col>
        )}
        {code === TAGS._008 && (
          <React.Fragment>
            {headerTypeCode === 37 && (
              <Col xs={4}>
                <Tag00XInput
                  {...this.props}
                  name={VISUAL_RUNNING_TIME}
                  onChange={e => this.handleDisplayValue(e, sortedData)}
                />
              </Col>
            )}
            <Col xs={4}>
              <Tag00XInput
                {...this.props}
                name={DATE_FIRST_PUBBLICATION}
                onChange={e => this.handleDisplayValue(e, sortedData)}
              />
            </Col>
            <Col xs={4}>
              <Tag00XInput
                {...this.props}
                name={DATE_LAST_PUBBLICATION}
                onChange={e => this.handleDisplayValue(e, sortedData)}
              />
            </Col>
          </React.Fragment>
        )}
        {sortedData.map((field, idx) => (
          <Col xs={4} key={idx}>
            <HeaderTypeSelect
              {...this.props}
              name={'Tag'
                .concat(code)
                .concat('-')
                .concat(headerTypeCode)
                .concat('-')
                .concat(field.name)}
              readOnly={field.name === 'categoryOfMaterial'}
              label={decamelizify(field.name, EMPTY_SPACED_STRING)}
              onChange={e => this.handleDisplayValue(e, data)}
              dataOptions={field.dropdownSelect}
            />
          </Col>
        ))}
      </Row>
    );
  };

  render() {
    const { expand, headerTypeCode } = this.state;
    const {
      element,
      headingTypes,
      values006,
      values007,
      values008,
      headerTypeCodeFromLeader,
    } = this.props;
    const values =
      element.code === TAGS._006
        ? values006
        : element.code === TAGS._007
          ? values007
          : values008;
    return (
      <div className={style.fieldContainer} no-padding>
        <MarcField
          {...this.props}
          prependIcon
          label={element.fixedField.code}
          name={element.fixedField.code}
          value={element.fixedField.displayValue}
          onClick={() => {
            this.setState({ expand: !expand });
          }}
        />
        <div
          className={expand ? style.leaderResultsActive : style.leaderResults}
        >
          <Col xs={12}>
            {headingTypes && (
              <Field
                {...this.props}
                label={'Tag'.concat(element.fixedField.code)}
                name={'Tag'.concat(element.fixedField.code)}
                component={this.RenderSelect}
                typeCode={
                  element.fixedField.code === TAGS._008 &&
                  headerTypeCodeFromLeader
                    ? headerTypeCodeFromLeader
                    : headerTypeCode
                }
                headertypes={headingTypes.results.headingTypes}
              />
            )}
            {!isEmpty(values.results) &&
              this.RenderDropwDown(values.results, element.fixedField.code)}
          </Col>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const {
    marccat: {
      data: {
        emptyRecord,
        marcRecordDetail,
        headerTypeValues006,
        headerTypeValues007,
        headerTypeValues008,
      },
    },
  } = state;
  return {
    values006: headerTypeValues006 ? headerTypeValues006.results : {},
    values007: headerTypeValues007 ? headerTypeValues007.results : {},
    values008: headerTypeValues008 ? headerTypeValues008.results : {},
    headerTypeCodeFromLeader: headerTypeValues008
      ? headerTypeValues008.results.headerTypeCode
      : undefined,
    fixedfields:
      emptyRecord.results.fields || marcRecordDetail.bibliographicRecord.fields,
  };
};

export default connect(mapStateToProps)(Tag00X);
