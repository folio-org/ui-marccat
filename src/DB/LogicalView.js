
/**
 * @format
 * @flow
 */
import React from 'react';
import { connect } from 'react-redux';
import Select from '@folio/stripes-components/lib/Select';
import { DotLoader } from '../Core';

type LogicalViewProps = {
  label: string;
  views: Array<any>;
};

function LogicalView({ label, ...props }:LogicalViewProps) {
  const { views } = props;
  if (!views || views.length === 0) return <DotLoader />;
  return (
    <Select
      label={label}
      dataOptions={views}
    />
  );
}

export default connect(
  ({ marccat: { root } }) => ({
    views: root.views
  })
)(LogicalView);
