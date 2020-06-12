/* eslint-disable no-param-reassign */
// @flow
import React from 'react';
import { Field } from 'redux-form';
import { Select, Row, Col } from '@folio/stripes-components';
import { connect } from 'react-redux';
import { isEmpty, last } from 'lodash';
import { EMPTY_SPACED_STRING } from '../../../../../config/constants';
import { decamelizify, findParam } from '../../../../../shared';
import type { Props, State } from '../../../../../flow/types.js.flow';
import style from '../../../Style/index.css';
import {
  dropDownValuesAction,
  changeDisplayValueAction,
  editDropDownValuesAction,
} from '../../../Actions';
import {
  IMAGE_BIT_DEPTH,
  REDUCTION_CRIT,
  INSPECTION_DATE,
  RECORD_FIELD_STATUS,
  RECORD_ACTION,
  VISUAL_RUNNING_TIME,
} from '../../../Utils/MarcConstant';
import { MarcField } from '../..';
import Tag00XInput from '../components/Tag00XInput';
import HeaderTypeSelect from '../components/HeaderTypeSelect';
import { ACTION } from '../../../../../redux/actions';

type S = {
  expand: Boolean,
} & State;

class Tag006007 extends React.PureComponent<Props, S> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isEditMode: findParam('mode') === RECORD_ACTION.EDIT_MODE,
      isCreationMode: findParam('mode') === RECORD_ACTION.CREATION_MODE,
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
    const headerTypeCode = fixedField.headerTypeCode;
    let displayValue;
    if (headerTypeCode !== 0) {
      if (fixedField.displayValue.includes('|')) {
        displayValue = fixedField.displayValue.split('|').join('%7C');
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
      dispatch(change('Tag'.concat(code), headerTypeCode));
      if (code === '007') {
        dispatch({ type: ACTION.SETTINGS, data:{ tagDel7 : '' } });
      } else {
        dispatch({ type: ACTION.SETTINGS, data:{ tagDel6 : '' } });
      }
      dispatch(editDropDownValuesAction(payload));
    }
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
    const headerTypeCode = evt ? evt.target.value : fixedField.headerTypeCode;
    const payload = {
      value,
      code,
      headerTypeCode,
      cb: r => this.handleDisplayValue(undefined, r),
    };
    this.setState({ touched: true, headerTypeCode });
    if (code === '007') {
      dispatch({ type: ACTION.SETTINGS, data:{ tagDel7 : '' } });
    } else {
      dispatch({ type: ACTION.SETTINGS, data:{ tagDel6 : '' } });
    }
    dispatch(dropDownValuesAction(payload));
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
    if (code === '007') {
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
    } else if (fromStore.marccat.data.fixedfield006 === undefined || !e) {
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
      if (selected === VISUAL_RUNNING_TIME) {
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
    const { isCreationMode, firstAccess, touched } = this.state;
    if (!isCreationMode && !firstAccess && touched && element.fieldStatus !== 'new') element.fieldStatus = RECORD_FIELD_STATUS.CHANGED;
    fixedfields.push(element);
    dispatch(change(element.code, response.displayValue));
    fixedfields
      .filter(f => f.code === element.code)
      .map(f => (f.fixedField = response));
  };

  prepareValue = (code, data, payload, headerTypeCode) => {
    const { isEditMode } = this.state;
    const { element } = this.props;
    if (code === '007') {
      if (payload.imageBitDepth === '') {
        payload.imageBitDepth = '---';
      }
      if (payload.inspectionDate === '') {
        payload.inspectionDate = '||||||';
      }
      if (payload.reductionRatioCode === '') {
        payload.reductionRatioCode = '---';
      }
      if (isEditMode && element.fixedField.keyNumber !== 0) {
        payload.keyNumber = element.fixedField.keyNumber;
      } else {
        payload.keyNumber = 0;
      }
    } else if (payload.visualRunningTime === '') {
      payload.visualRunningTime = '---';
    }
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
    const { isCreationMode, firstAccess, headerTypeCode } = this.state;
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
          !isCreationMode && firstAccess && (element.fieldStatus === 'unchanged' || element.fieldStatus === 'new')
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
    const { element, headingTypes, values006, values007, settings006, settings007 } = this.props;
    const values =
      element.code === '006'
        ? values006
        : values007;
    return (
      <div className={style.fieldContainer006_007} no-padding>
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
            {(element.fixedField.code === '006' ?
              (!isEmpty(values.results) && settings006 === '' &&
              this.RenderDropwDown(values.results, element.fixedField.code)) :
              (!isEmpty(values.results) && settings007 === '' &&
              this.RenderDropwDown(values.results, element.fixedField.code))) }
          </Col>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const {
    marccat: {
      settings,
      data: { emptyRecord, marcRecordDetail, headerTypeValues007, headerTypeValues006 },
    },
  } = state;
  return {
    settings006: settings.tagDel6,
    settings007: settings.tagDel7,
    values007: headerTypeValues007 ? headerTypeValues007.results : {},
    values006: headerTypeValues006 ? headerTypeValues006.results : {},
    fixedfields:
      emptyRecord.results.fields || marcRecordDetail.bibliographicRecord.fields,
  };
};

export default connect(mapStateToProps)(Tag006007);
