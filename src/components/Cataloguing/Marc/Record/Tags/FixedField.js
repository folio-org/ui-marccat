// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import Tag00X from './Tag00X';

class FixedField extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fields: props.field,
    };
  }


  RenderField00X = () => {
    const { fields } = this.state;
    const { headertype008 } = this.props;

    return (
      <React.Fragment>
        {fields.map(f => (
          <Tag00X element={f} headingTypes={headertype008} {...this.props} />
        ))}
      </React.Fragment>
    );
  };


  render() {
    return this.RenderField00X();
  }
}

export default connect(
  ({
    marccat: {
      data: { headertype008 },
    },
  }) => ({
    headertype008,
  })
)(FixedField);
