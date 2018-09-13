
/**
 * @format
 * @flow
 */
import React from 'react';
import { connect } from 'react-redux';
import Select from '@folio/stripes-components/lib/Select';

type LogicalViewProps = {
  label: string;
};

function LogicalView({ label }:LogicalViewProps) { // eslint-disable-line
  return (
    <Select
      label={label}
      dataOptions={[
        { value: 'Y', label: 'Yes' },
        { value: 'N', label: 'No' },
        { value: 'M', label: 'Maybe', disabled: true }
      ]}
    />
  );
}

export default connect(
  (marccat) => ({// eslint-disable-line

  })
)(LogicalView);
