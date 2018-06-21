import React from 'react';
import PropTypes from 'prop-types';
import Checkbox from '@folio/stripes-components/lib/Checkbox';
import { connect } from '@folio/stripes-connect';
import * as C from '../../../Utils';

class WildCardCheckbox extends React.Component {
  static propTypes = {
    stripes: PropTypes.shape({
      intl: PropTypes.object.isRequired,
    }).isRequired
  }
  render() {
    const formatMsg = this.props.stripes.intl.formatMessage;
    return (
      <Checkbox
        id='wildCard'
        label={formatMsg({ id: 'ui-cataloging.search.wildCard' })}
        name='wildCard'
        inline
      />
    );
  }
}

export default connect(WildCardCheckbox, C.META.MODULE_NAME);
