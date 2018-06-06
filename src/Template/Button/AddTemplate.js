import React from 'react';
import Button from '@folio/stripes-components/lib/Button';
import { FormattedMessage } from 'react-intl';
import { connect } from '@folio/stripes-connect';
import Link from 'react-router-dom/Link';
import * as C from '../../Utils';
import css from '../styles/TemplateButton.css';

class AddTemplate extends React.Component {
  render() {
    return (
      <div className={css.root}>
        <Link to="/cataloging/template/create">
          <Button buttonStyle="primary">
            <FormattedMessage id="ui-cataloging.button.new" />
          </Button>
        </Link>
      </div>
    );
  }
}

export default connect(AddTemplate, C.META.MODULE_NAME);
