/**
 * @format
 */
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { Row, Col } from '@folio/stripes-components/lib/LayoutGrid';
import Button from '@folio/stripes-components/lib/Button';

type LogicalButtonProps = {
  handleTextAreaValue: () => void;
  translate: () => string;
};

export default function LogicalButton({ handleTextAreaValue, ...props }: LogicalButtonProps) {
  const { translate } = props;
  return (
    <Row>
      <Col xs={12}>
        <Button
          type="button"
          buttonStyle="primary"
          onClick={() => handleTextAreaValue(translate({ id: 'ui-marccat.search.andButton' }))}
        >
          <FormattedMessage id="ui-marccat.search.andButton" />
        </Button>
        <Button
          type="button"
          buttonStyle="primary"
          onClick={() => handleTextAreaValue(translate({ id: 'ui-marccat.search.nearButton' }))}
        >
          <FormattedMessage id="ui-marccat.search.nearButton" />
        </Button>
        <Button
          type="button"
          buttonStyle="primary"
          onClick={() => handleTextAreaValue(translate({ id: 'ui-marccat.search.notButton' }))}
        >
          <FormattedMessage id="ui-marccat.search.notButton" />
        </Button>
        <Button
          type="button"
          buttonStyle="primary"
          onClick={() => handleTextAreaValue(translate({ id: 'ui-marccat.search.orButton' }))}
        >
          <FormattedMessage id="ui-marccat.search.orButton" />
        </Button>
      </Col>
    </Row>
  );
}
