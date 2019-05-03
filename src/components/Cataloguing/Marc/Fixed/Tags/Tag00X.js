// @flow
import * as React from 'react';
import { Select, Row, Col, TextField } from '@folio/stripes/components';
import { Field } from 'redux-form';
import { connect } from 'react-redux';
import { cloneDeep, first } from 'lodash';
import AddTagButton from '../../Button/AddTagButton';
import {
  EMPTY_FIXED_FIELD,
  TAGS,
  TAGS_NAME
} from '../../../Utils/MarcConstant';
import type { Props } from '../../../../../flow/index.js.flow';
import type { HeadingType } from '../../../../Types/cataloging.js.flow';
import MarcField from '../../MarcField';
import { insert } from '../../../../../flow/utils/Arrays';
import { dropDownValuesAction, changeDisplayValueAction } from '../../../Actions';
import { decamelizify } from '../../../../../utils/Function';
import { ReduxForm } from '../../../../../redux/helpers/Redux';
import style from '../../../Style/index.css';
import { EMPTY_SPACED_STRING, REDUX } from '../../../../../config/constants';

type P = {
  handleOnChange: () => void,
} & Props;

type State = {
  fields: Array<*>,
}
class Tag00X extends React.Component<P, State> {

  constructor(props: P) {
    super(props);
    this.state = {
      fields: props.field,
      expand006: false,
      expand007: false,
      dropdown: {
        for006: [],
        for007: [],
        for008: []
      },
      headerTypeCode: 0,
      displayValue: undefined,
    };
    this.handleAdd = this.handleAdd.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.onHandleClick = this.onHandleClick.bind(this);
  }

  componentDidMount() {
    const { loadHeadertype } = this.props;
    loadHeadertype([TAGS._006, TAGS._007, TAGS._008]);
  }

  handleAdd = (code, index) => {
    this.setState(({ fields }) => ({
      fields: insert(fields, index, EMPTY_FIXED_FIELD(code))
    }));
  }

  handleRemove = index => {
    this.setState(({ fields }) => ({
      fields: [...fields.slice(0, index), ...fields.slice(index + 1)]
    }));
  }

  handleOnChange = (e, code) => {
    const { record: { leader: { value } }, dispatch } = this.props;
    const headerTypeCode = e.target.value;
    const payload = {
      value,
      code,
      headerTypeCode,
      cb: (r) => this.prepareResult(r, code)
    };
    this.setState({ headerTypeCode });
    dispatch(dropDownValuesAction(payload));
  };

  changeDisplayValue = (code: string): void => {
    const { store } = this.props;
    const { values } = ReduxForm.select(store, REDUX.FORM.BIBLIOGRAPHIC_FORM);
    const payload = this.prepareDataForDisplay(values, code);
    const cb = (r) => this.performChange(r, code);
    store.dispatch(changeDisplayValueAction(payload, cb));
  };

  prepareDataForDisplay = (values: Object, code: string): Object => {
    const payload = {};
    switch (code) {
    case TAGS._006: payload.headerTypeCode = values[TAGS_NAME._006]; break;
    case TAGS._007: payload.headerTypeCode = values[TAGS_NAME._007]; break;
    case TAGS._008: payload.headerTypeCode = values[TAGS_NAME._008]; break;
    default:
      break;
    }
    return payload;
  };

  performChange = (r: Object, code: string): void => {
    const { dispatch, change } = this.props;
    dispatch(change(code, r.displayValue));
  }


  prepareResult = (data: Object, code: string): State => {
    const { dropdown, headerTypeCode } = this.state;
    const dropdownValue: Array<HeadingType> = [];
    Object.values(data.results).map(h => dropdownValue.push(h));
    const payload = {};
    Object.entries(data.results).map(([k, v]) => payload[k] = v.defaultValue);
    payload.code = code;
    payload.categoryCode = 1;
    payload.headerTypeCode = headerTypeCode;
    payload.sequenceNumber = 0;
    this.setState(prevState => {
      const newState = cloneDeep(prevState);
      newState.headerTypeCode = headerTypeCode;
      newState.dropdown = {
        for006: (code === TAGS._006) ? dropdownValue : dropdown.for006,
        for007: (code === TAGS._007) ? dropdownValue : dropdown.for007,
        for008: (code === TAGS._008) ? dropdownValue : dropdown.for008,
      };
      return newState;
    });
  };

  DropDown = (input, ...props) => (
    <Select
      id={`${input.field.name}`}
      label={decamelizify(input.field.name, EMPTY_SPACED_STRING)}
      dataOptions={input.field.dropdownSelect}
      onChange={props.onChange}
      placeholder={input.field.name}
      value={input.field.defaultValue}
    />
  );

  populateDropwDown = (data, code) => (
    <Row>
      {data && data.map((field, idx) => (
        <Col xs={4} key={idx}>
          <Field
            name={`${field.name}`}
            component={this.DropDown}
            onChange={this.changeDisplayValue(code, data)}
            field={field}
          />
        </Col>
      ))}
    </Row>
  );

  onHandleClick = (code: string): void => {
    const { expand006, expand007 } = this.state;
    switch (code) {
    case TAGS._006: this.setState({ expand006: !expand006 }); break;
    case TAGS._007: this.setState({ expand007: !expand007 }); break;
    default:
      break;
    }
  }

  renderField006 = () => {
    const { expand006, dropdown, headerTypeCode } = this.state;
    const { headertype006 } = this.props;
    return (
      <React.Fragment>
        {headertype006 &&
        <div className={(expand006) ? style.leaderResultsActive : style.leaderResults}>
          <Col xs={12}>
            <Field
              {...this.props}
              id={TAGS_NAME._006}
              name={TAGS_NAME._006}
              label={`Header types Tag ${TAGS._006}`}
              onChange={(e) => this.handleOnChange(e, TAGS._006)}
              component={Select}
              dataOptions={headertype006.results.headingTypes}
              value={headerTypeCode || 0}
            />
            <div className="dropdownValues006">
              {this.populateDropwDown(dropdown.for006, TAGS._006)}
            </div>
          </Col>
        </div>
        }
      </React.Fragment>
    );
  };

  renderField007 = () => {
    const { expand007, dropdown, headerTypeCode } = this.state;
    const { headertype007 } = this.props;
    return (
      <React.Fragment>
        {headertype007 &&
        <div className={(expand007) ? style.leaderResultsActive : style.leaderResults}>
          <Col xs={12}>
            <Field
              {...this.props}
              id={TAGS_NAME._007}
              name={TAGS_NAME._007}
              label={`Header types Tag ${TAGS._007}`}
              onChange={(e) => this.handleOnChange(e, TAGS._007)}
              component={Select}
              dataOptions={headertype007.results.headingTypes}
              value={headerTypeCode || 0}
            />
            {dropdown.for007.length > 0 &&
            <div className="dropdownValues007">
              {this.populateDropwDown(dropdown.for007, TAGS._007)}
            </div>
            }
          </Col>
        </div>
        }
      </React.Fragment>
    );
  };

  renderField008 = (f) => {
    const { expand008, dropdown, displayValue, headerTypeCode } = this.state;
    const { headertype008 } = this.props;
    return (
      <React.Fragment>
        <div className={style.controlFieldContainer}>
          <MarcField
            {...this.props}
            readOnly
            disblxedIcon={headertype008}
            label={f.fixedField.code}
            name={f.fixedField.code}
            value={displayValue || f.fixedField.displayValue}
            onClick={() => { this.setState({ expand008: !expand008 }); }}
          />
          {headertype008 &&
          <div className={(expand008) ? style.leaderResultsActive : style.leaderResults}>
            <Row>
              <Col xs={4}>
                <Field
                  id="Tag008"
                  name="Tag008"
                  label={`Header types Tag ${TAGS._008}`}
                  onChange={(e) => this.handleOnChange(e, TAGS._008)}
                  component={Select}
                  placeholder="Select header..."
                  value={headerTypeCode || 0}
                  dataOptions={headertype008.results.headingTypes}
                />
              </Col>
            </Row>
            <hr />
            <Row xs={12}>
              <Col xs={4} key="Tag008-dateFirstPublication">
                <Field
                  name="Tag008-dateFirstPublication"
                  id="Tag008-dateFirstPublication"
                  component={TextField}
                  label="dateFirstPublication"
                  onChange={this.changeDisplayValue}
                />
              </Col>
              <Col xs={4} key="Tag008-dateLastPublication">
                <Field
                  name="Tag008-dateLastPublication"
                  id="Tag008-dateLastPublication"
                  component={TextField}
                  label="dateLastPublication"
                  onChange={this.changeDisplayValue}
                />
              </Col>
              {dropdown.for008.length > 0 &&
              <div className="dropdownValues008">
                {this.populateDropwDown(dropdown.for008, TAGS._007)}
              </div>
              }
            </Row>
          </div>}
        </div>
      </React.Fragment>
    );
  };

  render() {
    const { fields } = this.state;
    const field006 = fields.filter(f => f.fixedField.code === TAGS._006);
    const field007 = fields.filter(f => f.fixedField.code === TAGS._007);
    const field008 = first(fields.filter(f => f.fixedField.code === TAGS._008));
    if (field006.length === 0) fields.push(EMPTY_FIXED_FIELD(TAGS._006));
    if (field007.length === 0) fields.push(EMPTY_FIXED_FIELD(TAGS._007));
    return (
      <React.Fragment>
        {fields.filter(f => f.fixedField.code !== TAGS._008).map((f, idx) => (
          <Row>
            <Col xs={10} key={idx}>
              <div className={style.controlFieldContainer} no-padding>
                <MarcField
                  {...this.props}
                  key={idx}
                  withIcon
                  onDelete={() => this.handleRemove(idx)}
                  label={f.fixedField.code}
                  name={f.fixedField.code}
                  value={f.fixedField.displayValue}
                  onClick={() => this.onHandleClick(f.fixedField.code)}
                />
                {(f.fixedField.code === TAGS._006) ? this.renderField006(idx) : this.renderField007(idx)}
              </div>
            </Col>
            <Col xs={2}>
              <AddTagButton
                key={idx}
                {...this.props}
                tagCode={f.fixedField.code}
                onClick={() => this.handleAdd(f.fixedField.code, idx)}
              />
            </Col>
          </Row>
        ))}
        {this.renderField008(field008)}
      </React.Fragment>
    );
  }
}
export default (connect(
  ({ marccat: { data: { headertype006, headertype007, headertype008 } } }) => ({
    headertype006,
    headertype007,
    headertype008,
  }),
)((Tag00X)));
