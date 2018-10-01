
/**
 * @format
 * @flow
 */
import React from 'react';
import { connect } from 'react-redux';
import { onComponentDidMount, onComponentWillReceiveProps } from 'react-redux-lifecycle';
import Select from '@folio/stripes-components/lib/Select';
import { Props } from '../Core';
import { fetchLogicalViewAction } from '../Redux/actions/ActionCreator';
import { DotLoader } from '../Lib';

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

export default (onComponentDidMount(fetchLogicalViewAction))(connect(
  ({ marccat: { data } }) => ({
    views: data.views
  })
)(LogicalView));
