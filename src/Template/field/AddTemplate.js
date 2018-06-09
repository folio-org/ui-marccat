import React from 'react';
import Button from '@folio/stripes-components/lib/Button';
import { FormattedMessage } from 'react-intl';
import Link from 'react-router-dom/Link';
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

export default AddTemplate;
