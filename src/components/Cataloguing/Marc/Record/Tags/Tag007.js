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

class Tag007 extends React.PureComponent<Props, S> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isEditMode: findParam('mode') === RECORD_ACTION.EDIT_MODE,
      expand: false,
      headerTypeCode: 0,
      firstAccess: true,
      touched: false
    };
    this.RenderSelect = this.RenderSelect.bind(this);
    this.RenderDropwDown = this.RenderDropwDown.bind(this);
    this.handleDisplayValue = this.handleDisplayValue.bind(this);
    this.onHandleChange = this.onHandleChange.bind(this);
  }

  onHandleChangeFromEdit = () => {
    const {
      dispatch,
      change,
      element: { code, fixedField },
    } = this.props;
    const {
      record: {
        leader: { value },
      },
    } = this.props;
    let { headerTypeCode } = this.state;
    headerTypeCode = fixedField.headerTypeCode;
    let displayValue;
    if (fixedField.displayValue.includes('|')) {
      displayValue = fixedField.displayValue.replace('|', '%7C');
    } else {
      displayValue = fixedField.displayValue;
    }
    const payload = {
      value,
      code,
      headerTypeCode,
      displayValue,
      cb: r => this.handleDisplayValue(undefined, r),
    };
    this.setState({ firstAccess: false, headerTypeCode });
    dispatch(change('Tag007', headerTypeCode));
    dispatch(editDropDownValuesAction(payload));
  };

  onHandleChange = evt => {
    const {
      dispatch,
      element: { code, fixedField },
    } = this.props;
    const {
      record: {
        leader: { value },
      },
    } = this.props;
    let { headerTypeCode } = this.state;
    const { touched } = this.state;
    headerTypeCode = evt ? evt.target.value : fixedField.headerTypeCode;
    const payload = {
      value,
      code,
      headerTypeCode,
      cb: r => this.handleDisplayValue(undefined, r),
    };
    this.setState({ touched: true, headerTypeCode });
    dispatch(dropDownValuesAction(payload));
  };

  handleDisplayValue = (e, data) => {
    const { headerTypeCode, touched } = this.state;
    const {
      store,
      dispatch,
      change,
      element: { code },
    } = this.props;
    const payload = {};
    const fromStore = store.getState();
    let results;
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
      if (
        selected === IMAGE_BIT_DEPTH ||
        selected === INSPECTION_DATE ||
        selected === REDUCTION_CRIT
      ) {
        payload[selected] = e.target.value.trim();
      } else {
        payload[selected] = e.target.value;
      }
      this.setState({ touched: true });
    }
    this.prepareValue(code, results, payload, headerTypeCode);
    const cb = r => this.execChange(r);
    dispatch(changeDisplayValueAction(payload, cb));
  };

  execChange = (response: Object): void => {
    const { dispatch, change, fixedfields, element } = this.props;
    const { isEditMode, firstAccess, touched } = this.state;
    if (isEditMode && !firstAccess && touched) element.fieldStatus = RECORD_FIELD_STATUS.CHANGED;
    fixedfields.push(element);
    dispatch(change(element.code, response.displayValue));
    fixedfields
      .filter(f => f.code === element.code)
      .map(f => (f.fixedField = response));
  };

  prepareValue = (code, data, payload, headerTypeCode) => {
    if (payload.imageBitDepth === '') {
      payload.imageBitDepth = '---';
    }
    if (payload.inspectionDate === '') {
      payload.inspectionDate = '||||||';
    }
    if (payload.reductionRatioCode === '') {
      payload.reductionRatioCode = '---';
    }
    payload.code = code;
    payload.categoryCode = 1;
    payload.headerTypeCode = headerTypeCode;
    payload.sequenceNumber = 0;
  };

  RenderSelect = ({ element, ...props }) => {
    const { isEditMode, firstAccess, headerTypeCode } = this.state;
    return (
      <Field
        // Field props redux-form
        name={'Tag'.concat(element.code)}
        component={Select}
        // Select props
        id={'Tag'.concat(element.code)}
        label={'Tag'.concat(element.code)}
        dataOptions={props.headertypes}
        onChange={this.onHandleChange}
        placeholder={'Select Heading types for '.concat(element.code)}
        value={
          isEditMode && firstAccess && element.fieldStatus === 'unchanged'
            ? this.onHandleChangeFromEdit()
            : headerTypeCode
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
    console.log(headerTypeCode);
    return (
      <Row>
        {sortedData.map((field, idx) => (field.name === REDUCTION_CRIT ||
          field.name === INSPECTION_DATE ||
          field.name === IMAGE_BIT_DEPTH ? (
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
    const { element, headingTypes, values007 } = this.props;
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
                typeCode={headerTypeCode}
                headertypes={headingTypes.results.headingTypes}
              />
            )}
            {!isEmpty(values007.results) &&
              this.RenderDropwDown(values007.results, element.fixedField.code)}
          </Col>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const {
    marccat: {
      data: { emptyRecord, marcRecordDetail, headerTypeValues007 },
    },
  } = state;
  return {
    values007: headerTypeValues007 ? headerTypeValues007.results : {},
    fixedfields:
      emptyRecord.results.fields || marcRecordDetail.bibliographicRecord.fields,
  };
};

export default connect(mapStateToProps)(Tag007);
