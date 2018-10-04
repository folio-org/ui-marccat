
/**
 * @format
 * @flow
 */
import React from 'react';
import { connect } from 'react-redux';
import { onComponentDidMount } from 'react-redux-lifecycle';
import InfoPopover from '@folio/stripes-components/lib/InfoPopover';
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
      <Col xs={11}>
        <Selection
          placeholder="Select Database...."
          label={label}
          dataOptions={views}
        />
      </Col>
      <Col xs={1}>
        <InfoPopover
          content="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          buttonLabel="Read more"
          buttonHref="https://wiki.folio.org/"
          buttonTarget="_blank"
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
