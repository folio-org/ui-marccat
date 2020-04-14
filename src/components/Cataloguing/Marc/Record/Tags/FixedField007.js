// @flow
import * as React from 'react';
import { Button } from '@folio/stripes/components';
import { connect } from 'react-redux';
import {
  EMPTY_FIXED_FIELD,
  TAGS,
  RECORD_ACTION,
} from '../../../Utils/MarcConstant';
import { sort } from '../../../Utils/MarcApiUtils';
import { Localize, findParam } from '../../../../../shared';
import Tag007 from './Tag007';

class FixedField007 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isEditMode:  (findParam('mode') === RECORD_ACTION.EDIT_MODE),
      inizialized: false,
      fields: sort(props.field),
      repeatable007Array: [],
    };
    this.handleAdd = this.handleAdd.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.getActionButton = this.getActionButton.bind(this);
  }

  // eslint-disable-next-line camelcase
  UNSAFE_componentWillMount() {
    const { fields, inizialized, repeatable007Array, isEditMode } = this.state;
    const field007 = fields.filter(f => f.fixedField.code === TAGS._007);
    if (!inizialized && !isEditMode) {
      if (field007.length === 0) repeatable007Array.push(EMPTY_FIXED_FIELD(TAGS._007));
      this.setState({ repeatable007Array, inizialized: true });
    } else {
      this.setState({ repeatable007Array: fields });
    }
  }

  handleAdd = e => {
    const code = e.currentTarget.name;
    this.setState(({ repeatable007Array }) => ({
      repeatable007Array: repeatable007Array.concat(EMPTY_FIXED_FIELD(code)),
    }));
  };

  handleRemove = e => {
    const { repeatable007Array } = this.state;
    const index = parseInt(e.target.parentElement.id.split('-')[1], 10);
    const arr = [...repeatable007Array];
    for (let i = 0; i < arr.length; i++) {
      if (i === index) {
        arr.splice(i, 1);
      }
    }
    this.setState({ repeatable007Array: arr });
  }

  RenderField007 = () => {
    const { repeatable007Array } = this.state;
    const { headertype007 } = this.props;

    return (
      <React.Fragment>
        {repeatable007Array.map((f, index) => (
          <div>
            {this.getActionButton(f, index)}
            <Tag007
              id={f + '-' + index}
              element={f}
              headingTypes={headertype007}
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
            value: item.code
          })}
        </Button>
        <Button
          name={item.code}
          id={'remove'.concat(item.code).concat('-' + index)}
          onClick={this.handleRemove}
        >
          {Localize({
            key: 'cataloging.fixedfield.section.remove.newtag',
            value: item.code
          })}
        </Button>
      </div>
    );
  }

  render() {
    return this.RenderField007();
  }
}

export default connect(
  ({
    marccat: {
      data: { headertype007 }
    },
  }) => ({
    headertype007
  })
)(FixedField007);
