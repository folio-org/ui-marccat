
/**
 * @format
 * @flow
 */
import React from 'react';
import { connect } from 'react-redux';
import { onComponentDidMount } from 'react-redux-lifecycle';
import { Row, Col } from 'react-flexbox-grid';
import Selection from '@folio/stripes-components/lib/Selection';
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
    <Row>
      <Col xs={12}>
        <Selection
          fullWidth
          placeholder="Select Database...."
          label={label}
          dataOptions={views}
        />
      </Col>
    </Row>
  );
}

export default (onComponentDidMount(fetchLogicalViewAction))(connect(
  ({ marccat: { data } }) => ({
    views: data.views
  })
)(LogicalView));
