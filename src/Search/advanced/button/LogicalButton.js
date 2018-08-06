/**
 * @format
 * @flow
 */
import React from 'react';
import { FormattedMessage } from 'react-intl';
import Headline from '@folio/stripes-components/lib/Headline';
import { Row, Col } from '@folio/stripes-components/lib/LayoutGrid';
import Button from '@folio/stripes-components/lib/Button';

export default class LogicalButton extends React.Component {
  render() {
    const { handleTextAreaValue } = this.props;
    return (
      <Row>
        <Col xs={4}>
          <Headline size="small" margin="medium" tag="h4">
           Typed a Query:
          </Headline>
        </Col>
        <Col xs={8}>
          <Button
            {...this.props}
            type="button"
            buttonStyle="primary"
            onClick={() => handleTextAreaValue('AND')}
          >
            <FormattedMessage id="ui-marccat.search.andButton" />
          </Button>
          <Button
            {...this.props}
            type="button"
            buttonStyle="primary"
            onClick={() => handleTextAreaValue('NEAR')}
          >
            <FormattedMessage id="ui-marccat.search.nearButton" />
          </Button>
          <Button
            {...this.props}
            type="button"
            buttonStyle="primary"
            onClick={() => handleTextAreaValue('NOT')}
          >
            <FormattedMessage id="ui-marccat.search.notButton" />
          </Button>
          <Button
            {...this.props}
            type="button"
            buttonStyle="primary"
            onClick={() => handleTextAreaValue('OR')}
          >
            <FormattedMessage id="ui-marccat.search.orButton" />
          </Button>
        </Col>
      </Row>
    );
  }
}
