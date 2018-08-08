/**
 * @format
 * @flow
 */
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import Headline from '@folio/stripes-components/lib/Headline';
import { Row, Col } from '@folio/stripes-components/lib/LayoutGrid';
import Button from '@folio/stripes-components/lib/Button';

type LogicalButtonProps = {
  handleTextAreaValue: () => void;
  stripes: Object;
};

export default function LogicalButton({ handleTextAreaValue, ...props }: LogicalButtonProps) {
  const { formatMessage } = props.stripes.intl;
  return (
    <Row>
      <Col xs={4}>
        <Headline size="small" margin="medium" tag="h4">
           Typed a Query:
        </Headline>
      </Col>
      <Col xs={8}>
        <Button
          type="button"
          buttonStyle="primary"
          onClick={() => handleTextAreaValue(formatMessage({ id: 'ui-marccat.search.andButton' }))}
        >
          <FormattedMessage id="ui-marccat.search.andButton" />
        </Button>
        <Button
          type="button"
          buttonStyle="primary"
          onClick={() => handleTextAreaValue(formatMessage({ id: 'ui-marccat.search.nearButton' }))}
        >
          <FormattedMessage id="ui-marccat.search.nearButton" />
        </Button>
        <Button
          type="button"
          buttonStyle="primary"
          onClick={() => handleTextAreaValue(formatMessage({ id: 'ui-marccat.search.notButton' }))}
        >
          <FormattedMessage id="ui-marccat.search.notButton" />
        </Button>
        <Button
          type="button"
          buttonStyle="primary"
          onClick={() => handleTextAreaValue(formatMessage({ id: 'ui-marccat.search.orButton' }))}
        >
          <FormattedMessage id="ui-marccat.search.orButton" />
        </Button>
      </Col>
    </Row>
  );
}
