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
  TAGS
} from '../../../Utils/MarcConstant';
import type { Props } from '../../../../../shared';
import MarcField from '../../MarcField';
import style from '../../../Style/index.css';
import { insert } from '../../../../../flow/Arrays';

class Tag00X extends React.Component<Props, {
  fields: Array<any>
}> {

  constructor(props:Props) {
    super(props);
    this.state = {
      fields: props.field,
      expand006: false,
      expand007: false,
    };
    this.handleAdd = this.handleAdd.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
  }

  componentDidMount() {
    const { loadHeadertype } = this.props;
    loadHeadertype(['006', '007']);
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


render() {
  // eslint-disable-next-line no-unused-vars
  const { fields, expand006, expand007 } = this.state;
  const { headertype006, headertype007 } = this.props;
  const field006 = fields.filter(f => f.fixedField.code === TAGS._006);
  const field007 = fields.filter(f => f.fixedField.code === TAGS._007);
  if (field006.length === 0) fields.push(EMPTY_FIXED_FIELD(TAGS._006));
  if (field007.length === 0) fields.push(EMPTY_FIXED_FIELD(TAGS._007));
  return (
    <React.Fragment>
      {fields.map((f, idx) => (
        <Row middle="xs">
          <Col xs={6}>
            <div className={style.controlFieldContainer}>
              <MarcField
                {...this.props}
                key={idx}
                withIcon
                onDelete={() => this.handleRemove(idx)}
                label={f.fixedField.code}
                name={f.fixedField.code}
                value={f.fixedField.displayValue}
                onClick={() => {
                  this.setState({
                    expand006: (f.fixedField.code === '006') ? !expand006 : false,
                    expand007: (f.fixedField.code === '007') ? !expand007 : false,
                  });
                }}
              />
              {headertype006 && headertype007 &&
              <div className={(expand006 || expand007) ? style.leaderResultsActive : style.leaderResults}>
                <Col xs={6}>
                  <Field
                    {...this.props}
                    id="Tag00w8"
                    name="Tag0w08"
                    onChange={this.handleOnChange}
                    component={Select}
                    dataOptions={(f.fixedField.code === '006') ? headertype006.results.headingTypes : headertype007.results.headingTypes}
                    label="Header types"
                    placeholder="Select header..."
                  />
                </Col>
              </div>
              }
            </div>
          </Col>
          <Col xs={2}>
            <AddTagButton {...this.props} tagCode={f.fixedField.code} onClick={() => this.handleAdd(f.fixedField.code, idx)} />
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
