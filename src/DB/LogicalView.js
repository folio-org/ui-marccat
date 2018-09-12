import React from 'react';
import Select from '@folio/stripes-components/lib/Select';
import { connect } from 'react-redux';

type LogicalViewProps = {};// eslint-disable-line

class LogicalView extends React.Component{ // eslint-disable-line

  constructor(props:LogicalViewProps) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Select
        label="Database"
        dataOptions={[
          { value: 'Y', label: 'Yes' },
          { value: 'N', label: 'No' },
          { value: 'M', label: 'Maybe', disabled: true }
        ]}
      />
    );
  }
}
export default connect(
  ({ marccat: { data } }) => ({
    model: 'pippo'
  }), {}
)(LogicalView);

