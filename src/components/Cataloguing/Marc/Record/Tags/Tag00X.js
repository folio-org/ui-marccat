/* eslint-disable no-param-reassign */
// @flow
import React from 'react';
import { Field } from 'redux-form';
import { Select, Row, Col } from '@folio/stripes-components';
import { connect } from 'react-redux';
import { isEmpty, last } from 'lodash';
import { EMPTY_SPACED_STRING, EMPTY_STRING, REDUX } from '../../../../../config/constants';
import { decamelizify } from '../../../../../shared';
import type { Props, State } from '../../../../../flow/types.js.flow';

import style from '../../../Style/index.css';
import { dropDownValuesAction, changeDisplayValueAction } from '../../../Actions';
import { TAGS } from '../../../Utils/MarcConstant';
import { MarcField } from '../..';
import Tag00XInput from '../components/Tag00XInput';
import { ReduxForm } from '../../../../../redux/helpers/Redux';
import HeaderTypeSelect from '../components/HeaderTypeSelect';

type S = {
  expand: Boolean,
} & State

class Tag00X extends React.Component<Props, S> {

  constructor(props: Props) {
    super(props);
    this.state = {
      expand: false,
      headerTypeCode: 0,
    };
    this.RenderSelect = this.RenderSelect.bind(this);
    this.RenderDropwDown = this.RenderDropwDown.bind(this);
    this.onHandleChange = this.onHandleChange.bind(this);
    this.handleDisplayValue = this.handleDisplayValue.bind(this);
  }

  onHandleChange = evt => {
    const { record: { leader: { value } }, dispatch, element: { code } } = this.props;
    const headerTypeCode = evt.target.value;
    const payload = {
      value,
      code,
      headerTypeCode,
      cb: (r) => this.handleDisplayValue(undefined, r)
    };
    this.setState({ headerTypeCode });
    dispatch(dropDownValuesAction(payload));
  }


  handleDisplayValue = (e, data) => {
    const { headerTypeCode } = this.state;
    const { dispatch, change, element: { code } } = this.props;
    const payload = {};
    const results = data.results || data;
    this.prepareValue(code, results, payload, headerTypeCode);
    Object.entries(results).map(([k, v]) => payload[k] = v.defaultValue);
    if (!e) Object.entries(results).map(([k, v]) => dispatch(change(`Tag${code}-${headerTypeCode}-${k}`, v.defaultValue)));
    if (e) {
      const selected = last(e.target.name.split('-'));
      payload[selected] = e.target.value;
    }
    const cb = (r) => this.execChange(r);
    dispatch(changeDisplayValueAction(payload, cb));
  };

  execChange = (r: Object): void => {
    const { dispatch, change, element: { code } } = this.props;
    dispatch(change(code, r.displayValue));
  }

  prepareValue = (code, data, payload, headerTypeCode) => {
    const { store } = this.props;
    if (code === TAGS._006) data.visualRunningTime = { name: 'visualRunningTime', defaultValue: EMPTY_SPACED_STRING, dropdownSelect:[] };
    if (code === TAGS._008) {
      data.dateFirstPublication = { name: 'dateFirstPublication', defaultValue: EMPTY_STRING.padStart(4, EMPTY_SPACED_STRING), dropdownSelect:[] };
      data.dateLastPublication = { name: 'dateLastPublication', defaultValue: EMPTY_STRING.padStart(4, EMPTY_SPACED_STRING), dropdownSelect:[] };
      payload.dateEnteredOnFile = ReduxForm.get(store, REDUX.FORM.DATA_FIELD_FORM, TAGS._008).substring(0, 6);
    }
    payload.code = code;
    payload.categoryCode = 1;
    payload.headerTypeCode = headerTypeCode;
    payload.sequenceNumber = 0;
  };

  RenderSelect = ({ headerTypeCode, element, ...props }): React.Component<Props, *> => (
    <Field
      id={`Tag${element.code}`}
      name={`Tag${element.code}`}
      label={`${element.code}`}
      dataOptions={props.headertypes}
      component={Select}
      onChange={(e) => this.onHandleChange(e)}
      placeholder={'Select Heading types for '.concat(element.code)}
      value={headerTypeCode}
    />
  );

  RenderDropwDown = (data) => {
    const { headerTypeCode } = this.state;
    const { element: { code } } = this.props;
    return (
      <Row>
        {code === TAGS._006 &&
          <Col xs={6}>
            <Tag00XInput
              {...this.props}
              name="visualRunningTime"
              onChange={(e) => this.handleDisplayValue(e, data)}
            />
          </Col>
        }
        {code === TAGS._008 &&
          <React.Fragment>
            <Col xs={6}>
              <Tag00XInput
                {...this.props}
                name="dateFirstPublication"
                onChange={(e) => this.handleDisplayValue(e, data)}
              />
            </Col>
            <Col xs={6}>
              <Tag00XInput
                {...this.props}
                name="dateLastPublication"
                onChange={(e) => this.handleDisplayValue(e, data)}
              />
            </Col>
          </React.Fragment>
        }
        {Object.values(data).map((field, idx) => (
          <Col xs={6} key={idx}>
            <HeaderTypeSelect
              {...this.props}
              name={`Tag${code}-${headerTypeCode}-${field.name}`}
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
    const { expand, headerTypeCode } = this.state;
    const { element, headingTypes, values006, values007, values008 } = this.props;
    const values = (element.code === TAGS._006) ? values006 : ((element.code === TAGS._007) ? values007 : values008);
    return (
      <div className={style.fieldContainer} no-padding>
        <MarcField
          {...this.props}
          prependIcon
          label={`${element.fixedField.code}`}
          name={`${element.fixedField.code}`}
          value={element.fixedField.displayValue}
          onClick={() => {
            this.setState({ expand: !expand });
          }}
        />
        <div className={(expand) ? style.leaderResultsActive : style.leaderResults}>
          <Col xs={12}>
            {headingTypes &&
              <Field
                {...this.props}
                label={`Tag${element.fixedField.code}`}
                name={`Tag${element.fixedField.code}`}
                component={this.RenderSelect}
                value={headerTypeCode}
                headertypes={headingTypes.results.headingTypes}
              />}
            {!isEmpty(values) && this.RenderDropwDown(values.results, element.fixedField.code)}
          </Col>
        </div>
      </div>
    );
  }
}
export default (connect(
  ({ marccat: { data: { headerTypeValues006, headerTypeValues007, headerTypeValues008 } } }) => ({
    values006: (headerTypeValues006) ? headerTypeValues006.results : {},
    values007: (headerTypeValues007) ? headerTypeValues007.results : {},
    values008: (headerTypeValues008) ? headerTypeValues008.results : {},
  }),
)((Tag00X)));
