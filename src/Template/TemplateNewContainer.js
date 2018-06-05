import React from 'react';
import PropTypes from 'prop-types';
import Pane from '@folio/stripes-components/lib/Pane';
import Paneset from '@folio/stripes-components/lib/Paneset'; // eslint-disable-line import/no-extraneous-dependencies
import { connect } from '@folio/stripes-connect';
import * as C from '../Utils';

import css from './styles/TemplateView.css';

class TemplateNewContainer extends React.Component {
  render() {
    const formatMsg = this.props.stripes.intl.formatMessage;

    return (
      <Paneset static style={css.root}>
        <Pane paneTitle={formatMsg({ id: 'ui-cataloging.templates.title' })}>
          <h1>fewfewefwewrewewerwq</h1>,
        </Pane>
      </Paneset>
    );
  }
}

TemplateNewContainer.propTypes = {
  stripes: PropTypes.shape({ // eslint-disable-line react/no-unused-prop-types
    connect: PropTypes.func.isRequired,
    intl: PropTypes.object.isRequired,
  }).isRequired
};

export default connect(TemplateNewContainer, C.META.MODULE_NAME);
