import React from 'react';
import PropTypes from 'prop-types';
import Pane from '@folio/stripes-components/lib/Pane';
import Paneset from '@folio/stripes-components/lib/Paneset';
import PaneMenu from "@folio/stripes-components/lib/PaneMenu";
import IconButton from "@folio/stripes-components/lib/IconButton";
import { connect } from '@folio/stripes-connect';
import * as C from '../Utils';

import css from './styles/TemplateView.css';

class TemplateNewContainer extends React.Component {
  render() {
    const formatMsg = this.props.stripes.intl.formatMessage;

    const closeMenu = (
      <PaneMenu>
        <IconButton key="icon-close" icon="close" />
      </PaneMenu>
    );

    return (
      <Paneset static style={css.root}>
        <Pane dismissable={true}
          firstMenu={closeMenu}
          defaultWidth="fill"
          paneTitle={formatMsg({ id: 'ui-cataloging.template.create' })}
          appIcon={{ app: 'cataloging' }}
        >
        </Pane>
        <h1>new template</h1>
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
