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
      isDuplicateMode: findParam('mode') === RECORD_ACTION.DUPLICATE_MODE,
      expand: false,
      headerTypeCode: 0,
      firstAccess: true
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
    const { isEditMode, isDuplicateMode, firstAccess } = this.state;
    let { headerTypeCode } = this.state;
    let displayValue;
    headerTypeCode =
      headerTypeCodeFromLeader ||
      (evt ? evt.target.value : fixedField.headerTypeCode);
    value = headerTypeCodeFromLeader ? leader.value : value;

    if (fixedField.displayValue.includes('|')) {
      displayValue = fixedField.displayValue.split('|').join('%7C');
    } else {
      displayValue = fixedField.displayValue;
    }
    if (firstAccess && (isEditMode || isDuplicateMode)) {
      const payload = {
        value,
        code,
        headerTypeCode,
        displayValue,
        cb: r => this.handleDisplayValue(undefined, r),
      };
      this.setState({ firstAccess: false, headerTypeCode });
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
    const { headerTypeCode } = this.state;
    const {
      store,
      dispatch,
      change,
      element: { code },
    } = this.props;
    const payload = {};
    const fromStore = store.getState();
    let results;
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
    this.prepareValue(code, results, payload, headerTypeCode);
    const cb = r => this.execChange(r);
    dispatch(changeDisplayValueAction(payload, cb));
  };

  execChange = (response: Object): void => {
    const { dispatch, change, fixedfields, element } = this.props;
    dispatch(change(element.code, response.displayValue));
    element.fieldStatus = RECORD_FIELD_STATUS.CHANGED;
    fixedfields.push(element);
    fixedfields
      .filter(f => f.code === element.code)
      .map(f => (f.fixedField = response));
  };

  prepareValue = (code, data, payload, headerTypeCode) => {
    const { store, element } = this.props;
    const { isEditMode } = this.state;
    if (headerTypeCode === 37 && payload.visualRunningTime === '') {
      payload.visualRunningTime = '---';
    }
    if (payload.dateFirstPublication === '') {
      payload.dateFirstPublication = '    ';
    }
    if (payload.dateLastPublication === '') {
      payload.dateLastPublication = '    ';
    }
    payload.dateEnteredOnFile = formFieldValue(
      store,
      REDUX.FORM.DATA_FIELD_FORM,
      TAGS._008
    ).substring(0, 6);
    if (isEditMode && element.fixedField.keyNumber !== 0) {
      payload.keyNumber = element.fixedField.keyNumber;
    } else {
      payload.keyNumber = 0;
    }
    payload.code = code;
    payload.categoryCode = 1;
    payload.headerTypeCode = headerTypeCode;
    payload.sequenceNumber = 0;
  };

  RenderSelect = ({ element, ...props }) => {
    const { typeCode } = this.props;
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
        {sortedData.map((field, idx) => (field.name === DATE_FIRST_PUBBLICATION ||
          field.name === DATE_LAST_PUBBLICATION ||
          field.name === VISUAL_RUNNING_TIME ? (
            <Col xs={4}>
              <Tag00XInput
                {...this.props}
                name={'Tag'
                  .concat(code)
                  .concat('-')
                  .concat(headerTypeCode)
                  .concat('-')
                  .concat(field.name)}
                label={decamelizify(field.name, EMPTY_SPACED_STRING)}
                onChange={e => this.handleDisplayValue(e, data)}
              />
            </Col>
          ) : (
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
          )))}
      </Row>
    );
  };

  render() {
    const { expand, headerTypeCode } = this.state;
    const {
      element,
      headingTypes,
      values008,
      headerTypeCodeFromLeader,
    } = this.props;
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
                typeCode={headerTypeCodeFromLeader || headerTypeCode}
                headertypes={headingTypes.results.headingTypes}
              />
            )}
            {!isEmpty(values008.results) &&
              this.RenderDropwDown(values008.results, element.fixedField.code)}
          </Col>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const {
    marccat: {
      data: { emptyRecord, marcRecordDetail, headerTypeValues008 },
    },
  } = state;
  return {
    values008: headerTypeValues008 ? headerTypeValues008.results : {},
    headerTypeCodeFromLeader: headerTypeValues008
      ? headerTypeValues008.results.headerTypeCode
      : undefined,
    fixedfields:
      emptyRecord.results.fields || marcRecordDetail.bibliographicRecord.fields,
  };
};

export default connect(mapStateToProps)(Tag00X);
