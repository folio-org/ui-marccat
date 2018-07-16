import React from 'react';
import { Row, Col } from '@folio/stripes-components/lib/LayoutGrid';
import { FormattedMessage } from 'react-intl';

class WildCard extends React.Component {
  render() {
    return (
      <Row>
        <Col xs={1}>
          <FormattedMessage id="ui-marccat.search.wildCard" />:
        </Col>
        <Col xs={3}>
          <b>?</b> &nbsp;
          <FormattedMessage id="ui-marccat.search.wildCard.replace1" />
        </Col>
        <Col xs={3}>
          <b>#</b> &nbsp;
          <FormattedMessage id="ui-marccat.search.wildCard.replace2" />
        </Col>
        <Col xs={3}>
          <b>!</b> &nbsp;
          <FormattedMessage id="ui-marccat.search.wildCard.restriction" />
        </Col>
      </Row>
    );
  }
}

export default WildCard;
