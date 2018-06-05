import React from 'react';
import Button from '@folio/stripes-components/lib/Button';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import Link from 'react-router-dom/Link';

class TemplateAddButton extends React.Component {
  static propTypes = {
    stripes: PropTypes.shape({ // eslint-disable-line react/no-unused-prop-types
      connect: PropTypes.func.isRequired,
      intl: PropTypes.object.isRequired,
    }).isRequired,
  };

  render() {
    const div = { height: '100%' };
    const style = {
      backgroundColor: '#2b75bb',
      border: '1px solid #2b75bb',
      fontWeight: 600,
      marginBottom: 0,
      color: '#fff',
      marginRight: '15px'
    };
    return (
      <div style={root}>
        <Link to="/cataloging/template/new">
          <Button style={style}>
            <FormattedMessage id="ui-cataloging.button.new" />
          </Button>
        </Link>
      </div>
    );
  }
}

export default TemplateAddButton;
