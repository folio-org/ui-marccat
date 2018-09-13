import React from 'react';
import { connect } from 'react-redux';
import Select from '@folio/stripes-components/lib/Select';

type LogicalViewProps = {};

function LogicalView({}:LogicalViewProps) { // eslint-disable-line
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

export default connect(
  (marccat) => ({// eslint-disable-line

  })
)(LogicalView);
