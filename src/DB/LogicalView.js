
/**
 * @format
 * @flow
 */
import React from 'react';
import { connect } from 'react-redux';
import Select from '@folio/stripes-components/lib/Select';
import { DotLoader, Props } from '../Core';

type P = Props & {
  label: string;
  views: Array<any>;
};

function LogicalView({ label, ...props }:P) {
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
  ({ marccat: { data } }) => ({
    views: data.views
  })
)(LogicalView);
