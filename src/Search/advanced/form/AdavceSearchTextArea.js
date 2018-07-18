import React from 'react';
import { Row, Col } from '@folio/stripes-components/lib/LayoutGrid';
import Button from '@folio/stripes-components/lib/Button';
import { Field } from 'redux-form';
import { FormattedMessage } from 'react-intl';
import { connect } from '@folio/stripes-connect';
import Headline from '@folio/stripes-components/lib/Headline';
import ScanButton from '../button/ScanButton';
import SearchButton from '../button/SearchButton';

class AdvanceSearchTextArea extends React.Component {
  render() {
    return (
      <div style={{ marginTop: '50px' }}>
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
            >
              <FormattedMessage id="ui-marccat.search.andButton" />
            </Button>
            <Button
              {...this.props}
              type="button"
              buttonStyle="primary"
            >
              <FormattedMessage id="ui-marccat.search.nearButton" />
            </Button>
            <Button
              {...this.props}
              type="button"
              buttonStyle="primary"
            >
              <FormattedMessage id="ui-marccat.search.notButton" />
            </Button>
            <Button
              {...this.props}
              type="button"
              buttonStyle="primary"
            >
              <FormattedMessage id="ui-marccat.search.orButton" />
            </Button>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <Field rows="8" name="searchTextArea" id="searchTextArea" component="textarea" style={{ width: '100%' }} />
          </Col>
        </Row>
        <Row>
          <Col xs={6}>
            <SearchButton {...this.props} />
          </Col>
          <Col xs={6}>
            <ScanButton {...this.props} />
          </Col>
        </Row>
      </div>);
  }
}
export default connect(AdvanceSearchTextArea);
