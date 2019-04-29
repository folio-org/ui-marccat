/**
 * @format
 * @flow
 */
import * as React from 'react';
import { Select, Row, Col } from '@folio/stripes/components';
import { Field } from 'redux-form';
import { connect } from 'react-redux';
import AddTagButton from '../../Button/AddTagButton';
import {
  EMPTY_FIXED_FIELD,
  TAGS,
  TAGS_NAME
} from '../../../Utils/MarcConstant';
import type { Props } from '../../../../../shared';
import type { HeadingType } from '../../../Models/model';
import MarcField from '../../MarcField';
import style from '../../../Style/index.css';
import { insert } from '../../../../../flow/Arrays';
import { dropDownValuesAction } from '../../../Actions';
import { decamelizify } from '../../../../../utils/Function';
import { EMPTY_SPACED_STRING } from '../../../../../shared/config/constants';

type P = {
  handleOnChange: () => void,
} & Props;


class Tag00X extends React.Component<P, {
  fields: Array<any>
}> {

  constructor(props: P) {
    super(props);
    this.state = {
      fields: props.field,
      expand006: false,
      expand007: false,
      selected: false,
      dropdown: {
        for006: [],
        for007: []
      },
    };
    this.handleAdd = this.handleAdd.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.onHandleClick = this.onHandleClick.bind(this);
  }

  componentDidMount() {
    const { loadHeadertype } = this.props;
    loadHeadertype([TAGS._006, TAGS._007]);
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
    const { record: { leader: { value } }, dispatch, change } = this.props;
    const typeCode = e.target.value;
    const payload = {
      value,
      code,
      typeCode,
      cb: (r) => this.prepareResult(r, code)
    };
    dispatch(dropDownValuesAction(payload));
    dispatch(change(code, typeCode));
  };

  changeDisplayValue = () => { };

  prepareResult = (data, code) => {
    const { dropdown } = this.state;
    const dropdownValue: Array<HeadingType> = [];
    Object.values(data.results).map(h => dropdownValue.push(h));
    this.setState({ dropdown: {
      for006: (code === TAGS._006) ? dropdownValue : dropdown.for006,
      for007: (code === TAGS._007) ? dropdownValue : dropdown.for007,
    } });
  };


  populateDropwDown = (data) => (
    <Row>
      {data.map((d, idx) => (
        <Col xs={4} key={idx}>
          <Field
            name={d.name}
            id={d.name}
            component={Select}
            label={decamelizify(d.name, EMPTY_SPACED_STRING)}
            dataOptions={d.dropdownSelect}
            onChange={this.changeDisplayValue}
            placeholder={d.name}
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

  renderField006 = (idx) => {
    const { expand006, dropdown } = this.state;
    const { headertype006 } = this.props;
    return (
      <React.Fragment>
        {headertype006 && idx === 0 &&
        <div className={(expand006) ? style.leaderResultsActive : style.leaderResults}>
          <Col xs={12}>
            <Field
              {...this.props}
              id={TAGS_NAME._006.concat('-' + idx)}
              name={TAGS_NAME._006.concat('-' + idx)}
              onChange={(e) => this.handleOnChange(e, TAGS._006)}
              component={Select}
              dataOptions={headertype006.results.headingTypes}
              label="Header types"
            />
            {dropdown.for006.length > 0 &&
            <div className="dropdownValues006">
              {this.populateDropwDown(dropdown.for006)}
            </div>
            }
          </Col>
        </div>
        }
      </React.Fragment>
    );
  };

  renderField007 = (idx) => {
    const { expand007, dropdown } = this.state;
    const { headertype007 } = this.props;
    return (
      <React.Fragment>
        {headertype007 &&
        <div className={(expand007) ? style.leaderResultsActive : style.leaderResults}>
          <Col xs={12}>
            <Field
              {...this.props}
              id={TAGS_NAME._007.concat(idx)}
              name={TAGS_NAME._007.concat(idx)}
              onChange={(e) => this.handleOnChange(e, TAGS._007)}
              component={Select}
              dataOptions={headertype007.results.headingTypes}
              label="Header types"
            />
            {dropdown.for007.length > 0 &&
            <div className="dropdownValues007">
              {this.populateDropwDown(dropdown.for007)}
            </div>
            }
          </Col>
        </div>
        }
      </React.Fragment>
    );
  };

  render() {
    // eslint-disable-next-line no-unused-vars
    const { fields, selected, expand006, expand007, fieldValue, dropdown } = this.state;
    const field006 = fields.filter(f => f.fixedField.code === TAGS._006);
    const field007 = fields.filter(f => f.fixedField.code === TAGS._007);
    if (field006.length === 0) fields.push(EMPTY_FIXED_FIELD(TAGS._006));
    if (field007.length === 0) fields.push(EMPTY_FIXED_FIELD(TAGS._007));
    return (
      <React.Fragment>
        {fields.map((f, idx) => (
          <Row>
            <Col xs={10}>
              <div className={style.controlFieldContainer} no-padding>
                <MarcField
                  {...this.props}
                  key={idx}
                  withIcon
                  onDelete={() => this.handleRemove(idx)}
                  label={f.fixedField.code}
                  name={f.fixedField.code}
                  value={f.fixedField.displayValue}
                  onClick={() => this.setState({ selected: !selected })}
                />
                <div className={(expand007) ? style.leaderResultsActive : style.leaderResults}>
                  {(f.fixedField.code === TAGS._006) ? this.renderField006(idx) : this.renderField007(idx)}
                </div>
              </div>
            </Col>
            <Col xs={2}>
              <AddTagButton
                {...this.props}
                tagCode={f.fixedField.code}
                onClick={() => this.handleAdd(f.fixedField.code, idx)}
              />
            </Col>
          </Row>
        ))}
      </React.Fragment>
    );
  }
}
export default (connect(
  ({ marccat: { data: { headertype006, headertype007 } } }) => ({
    headertype006,
    headertype007,
  }),
)((Tag00X)));
