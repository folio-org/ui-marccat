// @flow
import * as React from 'react';
import { Row, Col } from '@folio/stripes/components';
import { connect } from 'react-redux';
import AddTagButton from '../../Button/AddTagButton';
import {
  EMPTY_FIXED_FIELD,
  TAGS,
} from '../../../Utils/MarcConstant';
import { insert } from '../../../../../shared/utils/Arrays';
import Tag00X from './Tag00X';
import { sort } from '../../../Utils/MarcApiUtils';

type P = {
  handleOnChange: () => void,
} & Props;

type State = {
  fields: Array<*>,
}
class FixedField extends React.Component<P, State> {

  constructor(props: P) {
    super(props);
    this.state = {
      fields: props.field,
    };
    this.handleAdd = this.handleAdd.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
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
    const { fields } = this.state;
    const { headertype006, headertype007, headertype008 } = this.props;
    const field006 = fields.filter(f => f.fixedField.code === TAGS._006);
    const field007 = fields.filter(f => f.fixedField.code === TAGS._007);
    if (field006.length === 0) fields.push(EMPTY_FIXED_FIELD(TAGS._006));
    if (field007.length === 0) fields.push(EMPTY_FIXED_FIELD(TAGS._007));
    return (
      <React.Fragment>
        {sort(fields).map((f, idx) => (
          <Row>
            <Col xs={10} key={idx}>
              <Tag00X
                element={f}
                idx={idx}
                headingTypes={idx === 0 ? headertype006 : (idx === 1) ? headertype007 : headertype008}
                {...this.props}
              />
            </Col>
            <Col xs={2}>
              <AddTagButton
                key={idx}
                {...this.props}
                tagCode={f.fixedField.code}
                onClick={() => { }}
              />
            </Col>
          </Row>
        ))}
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
)((FixedField)));
