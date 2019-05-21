/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-param-reassign */
// @flow
import React from 'react';
import { Field } from 'redux-form';
import { Row, Col } from '@folio/stripes-components';
import { connect } from 'react-redux';
import { isEmpty, last } from 'lodash';
import { EMPTY_SPACED_STRING, REDUX } from '../../../../config/constants';
import { decamelizify } from '../../../../shared';
import type { Props, State } from '../../../../flow/types.js.flow';
import { dropDownValuesAction, changeDisplayValueAction } from '../../Actions';
import {
  TAGS,
  VISUAL_RUNNING_TIME,
  DATE_FIRST_PUBBLICATION,
  DATE_LAST_PUBBLICATION,
  IMAGE_BIT_DEPTH,
  RECORD_FIELD_STATUS
} from '../../Utils/MarcConstant';
import { Field as FormField } from '../Common/Field';
import Tag00XInput from '../Common/InputField';
import HeaderTypeSelect from '../Common/SelectField';
import { formFieldValue } from '../../../../redux/helpers/selector';

import style from '../../Style/index.css';

type S = {
  expand: Boolean,
  headerTypeCode: number
} & State

/**
 *
 *
 * @class Tag00X
 * @extends {React.PureComponent<Props, S>}
 */
class Tag00X extends React.PureComponent<Props, S> {

  constructor(props: Props) {
    super(props);
    this.state = {
      expand: false,
      headerTypeCode: 0,
    };
    this.onHandleChange = this.onHandleChange.bind(this);
    this.handleDisplayValue = this.handleDisplayValue.bind(this);
    this.RenderDropwDown = this.RenderDropwDown.bind(this);
  }

  onHandleChange = evt => {
    const { record: { leader: { value } }, dispatch, element, headerTypeCodeFromLeader } = this.props;
    const headerTypeCode = (element.code === TAGS._008 && headerTypeCodeFromLeader) ? headerTypeCodeFromLeader : evt.target.value;
    const payload = {
      value,
      code: element.code,
      headerTypeCode,
    };
    this.setState({ headerTypeCode });
    const cb = (r) => this.handleDisplayValue(undefined, r);
    dispatch(dropDownValuesAction(payload, cb));
  }


  handleDisplayValue = (e, data) => {
    const { headerTypeCode } = this.state;
    const { dispatch, change, element } = this.props;
    const payload = {};
    const results = data.results || data;
    Object.entries(results).map(([k, v]) => payload[k] = v.defaultValue);
    if (!e) Object.entries(results).map(([k, v]) => dispatch(change(`Tag${element.code}-${headerTypeCode}-${k}`, v.defaultValue)));
    if (e) {
      const selected = last(e.target.name.split('-'));
      payload[selected] = e.target.value;
    }
    this.prepareValue(element.code, results, payload, headerTypeCode);
    const cb = (r) => this.execChange(r);
    dispatch(changeDisplayValueAction(payload, cb));
  };

  execChange = (response: {}): void => {
    const { dispatch, change, fixedfields, element } = this.props;
    dispatch(change(element.code, response.displayValue));
    if (element.code === TAGS._008) element.fieldStatus = RECORD_FIELD_STATUS.CHANGED;
    fixedfields.push(element);
    fixedfields.filter(f => f.code === element.code).map(f => f.fixedField = response);
  }

  prepareValue = (code, data, payload, headerTypeCode) => {
    const { store } = this.props;
    if (code === TAGS._006) {
      payload.visualRunningTime = formFieldValue(store, REDUX.FORM.FIXED_FIELD_FORM, VISUAL_RUNNING_TIME);
    }
    if (code === TAGS._007) {
      payload.imageBitDepth = formFieldValue(store, REDUX.FORM.FIXED_FIELD_FORM, IMAGE_BIT_DEPTH);
    }
    if (code === TAGS._008) {
      payload.dateFirstPublication = formFieldValue(store, REDUX.FORM.FIXED_FIELD_FORM, DATE_FIRST_PUBBLICATION);
      payload.dateLastPublication = formFieldValue(store, REDUX.FORM.FIXED_FIELD_FORM, DATE_LAST_PUBBLICATION);
      payload.dateEnteredOnFile = formFieldValue(store, REDUX.FORM.FIXED_FIELD_FORM, TAGS._008).substring(0, 6);
    }
    payload.code = code;
    payload.categoryCode = 1;
    payload.headerTypeCode = headerTypeCode;
    payload.sequenceNumber = 0;
  };


  RenderDropwDown = (data) => {
    const { headerTypeCode } = this.state;
    const { element } = this.props;
    const sortedData = Object.values(data).sort((x, y) => x.name > y.name);
    return (
      <Row>
        {element.code === TAGS._006 &&
          <Col xs={12}>
            <Tag00XInput
              {...this.props}
              name={VISUAL_RUNNING_TIME}
              onChange={(e) => this.handleDisplayValue(e, sortedData)}
            />
          </Col>
        }
        {(element.code === TAGS._007 && (headerTypeCode === 25 || headerTypeCode === 42)) &&
          <Col xs={12}>
            <Tag00XInput
              {...this.props}
              name={IMAGE_BIT_DEPTH}
              onChange={(e) => this.handleDisplayValue(e, sortedData)}
            />
          </Col>
        }
        {element.code === TAGS._008 &&
          <React.Fragment>
            <Col xs={6}>
              <Tag00XInput
                {...this.props}
                name={DATE_FIRST_PUBBLICATION}
                onChange={(e) => this.handleDisplayValue(e, sortedData)}
              />
            </Col>
            <Col xs={6}>
              <Tag00XInput
                {...this.props}
                name={DATE_LAST_PUBBLICATION}
                onChange={(e) => this.handleDisplayValue(e, sortedData)}
              />
            </Col>
          </React.Fragment>
        }
        {sortedData.map((field, idx) => (
          <Col xs={4} key={idx}>
            <HeaderTypeSelect
              {...this.props}
              name={`Tag${element.code}-${headerTypeCode}-${field.name}`}
              label={decamelizify(field.name, EMPTY_SPACED_STRING)}
              onChange={(e) => this.handleDisplayValue(e, data)}
              dataOptions={field.dropdownSelect}
            />
          </Col>
        ))}
      </Row>
    );
  };

  render() {
    const { expand } = this.state;
    const { label, name, element, headingTypes, values006, values007, values008 } = this.props;
    const values = (element.code === TAGS._006) ? values006 : ((element.code === TAGS._007) ? values007 : values008);
    return (
      <div className={style.fieldContainer} no-padding={true.toString()}>
        <FormField
          {...this.props}
          label={label}
          name={label}
          prepend="true"
          onClick={() => {
            this.setState({ expand: !expand });
          }}
        />
        <div className={(expand) ? style.leaderResultsActive : style.leaderResults}>
          <Col xs={12}>
            {headingTypes &&
            <HeaderTypeSelect
              {...this.props}
              label={`Tag ${label}`}
              name={name}
              onChange={this.onHandleChange}
              placeholder={'Select Heading types for '.concat(label)}
              dataOptions={headingTypes.results.headingTypes}
            />
            }
            {!isEmpty(values) && this.RenderDropwDown(values.results, label)}
          </Col>
        </div>
      </div>
    );
  }
}

export default (connect(
  ({ marccat: { data: { emptyRecord, marcRecordDetail, headerTypeValues006, headerTypeValues007, headerTypeValues008 } } }) => ({
    values006: (headerTypeValues006) || {},
    values007: (headerTypeValues007) || {},
    values008: (headerTypeValues008) || {},
    headerTypeCodeFromLeader: (headerTypeValues008) ? headerTypeValues008.headerTypeCode : undefined,
    fixedfields: emptyRecord.results.fields || marcRecordDetail.bibliographicRecord.fields,
  }),
)((Tag00X)));
