/* eslint-disable no-param-reassign */
// @flow
import React from 'react';
import { Field } from 'redux-form';
import { Select, Row, Col } from '@folio/stripes-components';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';
import { EMPTY_SPACED_STRING } from '../../../../../config/constants';
import { MarcField } from '../../..';
import { decamelizify } from '../../../../../shared';
import type { Props, State } from '../../../../../flow/types.js.flow';

import style from '../../../Style/index.css';
import { dropDownValuesAction, changeDisplayValueAction } from '../../../Actions';
import { TAGS } from '../../../Utils/MarcConstant';

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
      cb: (r) => this.handleDisplayValueDefault(r)
    };
    this.setState({ headerTypeCode });
    dispatch(dropDownValuesAction(payload));
  }

  handleDisplayValueDefault = (data) => {
    const { headerTypeCode } = this.state;
    const { dispatch, change, element: { code } } = this.props;
    const payload = {};
    Object.entries(data.results).map(([k, v]) => payload[k] = v.defaultValue);
    Object.entries(data.results).map(([k, v]) => dispatch(change(`Tag${code}-${headerTypeCode}-${k}`, v.defaultValue)));
    payload.code = code;
    payload.categoryCode = 1;
    payload.headerTypeCode = headerTypeCode;
    payload.sequenceNumber = 0;
    const cb = (r) => this.execChange(r);
    dispatch(changeDisplayValueAction(payload, cb));
  }

  handleDisplayValue = (e, data, field) => {
    const { headerTypeCode } = this.state;
    const { dispatch, element: { code } } = this.props;
    const payload = {};
    Object.entries(data).map(([k, v]) => payload[k] = v.defaultValue);
    payload[field.name] = e.target.value;
    payload.code = code;
    payload.categoryCode = 1;
    payload.headerTypeCode = headerTypeCode;
    payload.sequenceNumber = 0;
    const cb = (r) => this.execChange(r);
    dispatch(changeDisplayValueAction(payload, cb));
  };


  execChange = (r: Object): void => {
    const { dispatch, change, element: { code } } = this.props;
    dispatch(change(code, r.displayValue));
  }

  RenderSelect = ({ headerTypeCode, element, ...props }): React.Component<Props, *> => (
    <Field
      id={`Tag${element.code}`}
      name={`Tag${element.code}`}
      dataOptions={props.headertypes}
      component={Select}
      onChange={(e) => this.onHandleChange(e)}
      placeholder={'Select Heading types for '.concat(props.name)}
      value={headerTypeCode}
    />
  );

  RenderDropwDown = (data) => {
    const { headerTypeCode } = this.state;
    const { element: { code } } = this.props;
    return (
      <Row>
        {Object.values(data).map((field, idx) => (
          <Col xs={6} key={idx}>
            <Field
              id={`Tag${code}-${field.name}`}
              name={`Tag${code}-${headerTypeCode}-${field.name}`}
              label={decamelizify(field.name, EMPTY_SPACED_STRING)}
              component={Select}
              onChange={(e) => this.handleDisplayValue(e, data, field)}
              dataOptions={field.dropdownSelect}
              value={field.defaultValue}
            />
          </Col>
        ))}
      </Row>
    );
  };

  render() {
    const { expand, headerTypeCode } = this.state;
    const { element, headingTypes, values006, values007, values008, idx } = this.props;
    const values = (element.code === TAGS._006) ? values006 : ((element.code === TAGS._007) ? values007 : values008);
    return (
      <div className={style.fieldContainer} no-padding>
        <MarcField
          {...this.props}
          prependIcon
          label={`${element.fixedField.code}${idx}`}
          name={`${element.fixedField.code}${idx}`}
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
