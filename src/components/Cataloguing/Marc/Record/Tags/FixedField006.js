// @flow
import * as React from 'react';
import { Button } from '@folio/stripes/components';
import { connect } from 'react-redux';
import { EMPTY_FIXED_FIELD, TAGS, RECORD_ACTION } from '../../../Utils/MarcConstant';
import { sort } from '../../../Utils/MarcApiUtils';
import { Localize, findParam } from '../../../../../shared';
import Tag006 from './Tag006';

class FixedField006 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isEditMode:  (findParam('mode') === RECORD_ACTION.EDIT_MODE),
      inizialized: false,
      fields: sort(props.field),
      repeatable006Array: [],
    };
    this.handleAdd = this.handleAdd.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.getActionButton = this.getActionButton.bind(this);
  }

  // eslint-disable-next-line camelcase
  UNSAFE_componentWillMount() {
    const { fields, inizialized, repeatable006Array, isEditMode } = this.state;
    const field006 = fields.filter(f => f.fixedField.code === TAGS._006);
    if (!inizialized && !isEditMode) {
      if (field006.length === 0) repeatable006Array.push(EMPTY_FIXED_FIELD(TAGS._006));
      this.setState({ repeatable006Array, inizialized: true });
    } else {
      this.setState({ repeatable006Array: fields });
    }
  }

  handleAdd = e => {
    const code = e.currentTarget.name;
    this.setState(({ repeatable006Array }) => ({
      repeatable006Array: repeatable006Array.concat(EMPTY_FIXED_FIELD(code)),
    }));
  };

  handleRemove = e => {
    const { repeatable006Array } = this.state;
    const index = parseInt(e.target.parentElement.id.split('-')[1], 10);
    const arr = [...repeatable006Array];
    for (let i = 0; i < arr.length; i++) {
      if (i === index) {
        arr.splice(i, 1);
      }
    }
    this.setState({ repeatable006Array: arr });
  };

  RenderField006 = () => {
    const { repeatable006Array } = this.state;
    const { headertype006 } = this.props;

    return (
      <React.Fragment>
        {repeatable006Array.map((f, index) => (
          <div>
            {this.getActionButton(f, index)}
            <Tag006
              repeatname={f.code + '-' + index}
              element={f}
              headingTypes={headertype006 + '-' + index}
              {...this.props}
            />
          </div>
        ))}
      </React.Fragment>
    );
  };

  getActionButton(item, index) {
    return (
      <div style={{ width: '20%', float: 'right', marginTop: '15px' }}>
        <Button
          name={item.code}
          id={'add'.concat(item.code).concat('-' + index)}
          onClick={this.handleAdd}
        >
          {Localize({
            key: 'cataloging.fixedfield.section.add.newtag',
            value: item.code,
          })}
        </Button>
        <Button
          name={item.code}
          id={'remove'.concat(item.code).concat('-' + index)}
          onClick={this.handleRemove}
        >
          {Localize({
            key: 'cataloging.fixedfield.section.remove.newtag',
            value: item.code,
          })}
        </Button>
      </div>
    );
  }

  render() {
    return this.RenderField006();
  }
}

export default connect(({ marccat: { data: { headertype006 } } }) => ({
  headertype006,
}))(FixedField006);
