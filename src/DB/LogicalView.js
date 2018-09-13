import React from 'react';
import { connect } from 'react-redux';
import Select from '@folio/stripes-components/lib/Select';

function LogicalView(props) {
  return (
    <div>
      <Select
        dataOptions={[
          { value: 'Y', label: 'Yes' },
          { value: 'N', label: 'No' },
          { value: 'M', label: 'Maybe', disabled: true }
        ]}
      />
    </div>
  );
}

function mapStateToProps(state) {
  return {
  };
}

// function mapDispatchToProps(dispatch) {
// }

export default connect(mapStateToProps)(LogicalView);
