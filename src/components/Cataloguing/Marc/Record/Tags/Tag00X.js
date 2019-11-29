/* eslint-disable no-param-reassign */
// @flow
import React from 'react';
import { Field } from 'redux-form';
import { Select, Row, Col } from '@folio/stripes-components';
import { connect } from 'react-redux';
import { isEmpty, last } from 'lodash';
import { PreviousMap } from 'postcss';
import { EMPTY_SPACED_STRING, REDUX } from '../../../../../config/constants';
import { decamelizify } from '../../../../../shared';
import type { Props, State } from '../../../../../flow/types.js.flow';

import style from '../../../Style/index.css';
import {
  dropDownValuesAction,
  changeDisplayValueAction,
} from '../../../Actions';
import {
  TAGS,
  VISUAL_RUNNING_TIME,
  DATE_FIRST_PUBBLICATION,
  DATE_LAST_PUBBLICATION,
  IMAGE_BIT_DEPTH,
  RECORD_FIELD_STATUS,
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
      record: {
        leader: { value },
      },
      dispatch,
      element: { code },
      headerTypeCodeFromLeader,
    } = this.props;
    const headerTypeCode =
      code === TAGS._008 && headerTypeCodeFromLeader
        ? headerTypeCodeFromLeader
        : evt.target.value;
    const payload = {
      value,
      code,
      headerTypeCode,
      cb: r => this.handleDisplayValue(undefined, r),
    };
    this.setState({ headerTypeCode });
    dispatch(dropDownValuesAction(payload));
  };

  handleDisplayValue = (e, data) => {
    const { headerTypeCode } = this.state;
    const {
      dispatch,
      change,
      element: { code },
    } = this.props;
    const payload = {};
    const results = data.results || data;
    Object.entries(results).map(([k, v]) => (payload[k] = v.defaultValue));
    if (!e) Object.entries(results).map(([k, v]) => dispatch(change(`Tag${code}-${headerTypeCode}-${k}`, v.defaultValue)));
    if (e) {
      const selected = last(e.target.name.split('-'));
      payload[selected] = e.target.value;
    }
    this.prepareValue(code, results, payload, headerTypeCode);
    const cb = r => this.execChange(r);
    dispatch(changeDisplayValueAction(payload, cb));
  };

  execChange = (response: Object): void => {
    const { dispatch, change, fixedfields, element } = this.props;
    dispatch(change(element.code, response.displayValue));
    // if (element.code === TAGS._008) element.fieldStatus = RECORD_FIELD_STATUS.CHANGED;
    // fixedfields.push(element);
    // fixedfields
    //   .filter(f => f.code === element.code)
    //   .map(f => (f.fixedField = response));
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
      payload.imageBitDepth = formFieldValue(
        store,
        REDUX.FORM.DATA_FIELD_FORM,
        IMAGE_BIT_DEPTH
      );
    }
    if (code === TAGS._008) {
      payload.dateFirstPublication = formFieldValue(
        store,
        REDUX.FORM.DATA_FIELD_FORM,
        DATE_FIRST_PUBBLICATION
      );
      payload.dateLastPublication = formFieldValue(
        store,
        REDUX.FORM.DATA_FIELD_FORM,
        DATE_LAST_PUBBLICATION
      );
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
        value={element.code === TAGS._008 && props.headerTypeCodeFromLeader ? props.headertypes.map(k => (k.value === props.headerTypeCodeFromLeader ?
          this.onHandleChange() : typeCode)) : typeCode}
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
        {code === TAGS._006 && (
          <Col xs={12}>
            <Tag00XInput
              {...this.props}
              name={VISUAL_RUNNING_TIME}
              onChange={e => this.handleDisplayValue(e, sortedData)}
            />
          </Col>
        )}
        {code === TAGS._007 &&
          (headerTypeCode === 25 || headerTypeCode === 42) && (
          <Col xs={12}>
            <Tag00XInput
              {...this.props}
              name={IMAGE_BIT_DEPTH}
              onChange={e => this.handleDisplayValue(e, sortedData)}
            />
          </Col>
        )}
        {code === TAGS._008 && (
          <React.Fragment>
            <Col xs={6}>
              <Tag00XInput
                {...this.props}
                name={DATE_FIRST_PUBBLICATION}
                onChange={e => this.handleDisplayValue(e, sortedData)}
              />
            </Col>
            <Col xs={6}>
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
