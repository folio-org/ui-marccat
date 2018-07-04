import React from 'react';
import PropTypes from 'prop-types';
import { connect } from '@folio/stripes-connect';
import { Row, Col } from '@folio/stripes-components/lib/LayoutGrid';
import { FormattedMessage } from 'react-intl';
import * as C from '../../../Utils';

class WildCard extends React.Component {
  static propTypes = {
    stripes: PropTypes.shape({
      intl: PropTypes.object.isRequired,
    }).isRequired
  }
  render() {
    const formatMsg = this.props.stripes.intl.formatMessage;
    return (
      <Row>
        <Col xs={1}>
          <FormattedMessage id="ui-cataloging.search.wildCard" />:
        </Col>
        <Col xs={3}>
          <b>?</b> &nbsp;
          <FormattedMessage id="ui-cataloging.search.wildCard.replace1" />
        </Col>
        <Col xs={3}>
          <b>#</b> &nbsp;
          <FormattedMessage id="ui-cataloging.search.wildCard.replace2" />
        </Col>
        <Col xs={3}>
          <b>!</b> &nbsp;
          <FormattedMessage id="ui-cataloging.search.wildCard.restriction" />
        </Col>
      </Row>
    );
  }
}

export default connect(WildCard, C.META.MODULE_NAME);
