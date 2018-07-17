import React from 'react';
import { Row, Col } from '@folio/stripes-components/lib/LayoutGrid';
import { reduxForm } from 'redux-form';
import Button from '@folio/stripes-components/lib/Button';
import { FormattedMessage } from 'react-intl';
import Textarea from '@folio/stripes-components/lib/TextArea';
import { connect } from '@folio/stripes-connect';
import * as C from '../Utils';
import s from '../Theme/override.css';
import PaneMenu from '../../node_modules/@folio/stripes-components/lib/PaneMenu';

class DiacriticsList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
          <Row style={{ marginTop: '50px' }}>
            <Col xs={8} >
              <Textarea rows='2' id='searchTextArea' value={this.state.value} onChange={this.handleChange} style={{ width: '50%' }} />
              <Button
                {...this.props}
                onClick={this.onClick}
                type="button"
                // disabled={this.props.disabled}
                buttonStyle="primary"
                style={{ minHeight: '17pt' }}
              >
                <FormattedMessage id="ui-marccat.search.searchButton" />
              </Button>
              <Button
                {...this.props}
                onClick={this.onClick}
                type="button"
                // disabled={this.props.disabled}
                buttonStyle="primary"
                style={{ minHeight: '17pt' }}
              >
                <FormattedMessage id="Refresh" />
              </Button>
            </Col>
          </Row>
        );
    }
}
export default connect(DiacriticsList, C.META.MODULE_NAME)