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
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
    this.handleTextAreaValue = this.handleTextAreaValue.bind(this);
  }
    handleTextAreaValue = (text) => {
      const newValue = this.state.value + ' ' + text + ' ';
      this.setState({ value: newValue });
      this.props.change('searchTextArea', newValue); // eslint-disable-line
    }

    render() {
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
              onClick={() => this.handleTextAreaValue('AND')}
            >
              <FormattedMessage id="ui-marccat.search.andButton" />
            </Button>
            <Button
              {...this.props}
              type="button"
              buttonStyle="primary"
              onClick={() => this.handleTextAreaValue('NEAR')}
            >
              <FormattedMessage id="ui-marccat.search.nearButton" />
            </Button>
            <Button
              {...this.props}
              type="button"
              buttonStyle="primary"
              onClick={() => this.handleTextAreaValue('NOT')}
            >
              <FormattedMessage id="ui-marccat.search.notButton" />
            </Button>
            <Button
              {...this.props}
              type="button"
              buttonStyle="primary"
              onClick={() => this.handleTextAreaValue('OR')}
            >
              <FormattedMessage id="ui-marccat.search.orButton" />
            </Button>
          </Col>
        </Row>
      );
    }
}
