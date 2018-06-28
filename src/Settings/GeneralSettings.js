import React, { Component } from 'react';
import Pane from '@folio/stripes-components/lib/Pane';
import { FormattedMessage } from 'react-intl';

export default class GeneralSettings extends Component {
  render() {
    return (
      <Pane defaultWidth="fill" fluidContentWidth paneTitle={this.props.label}>
        <div id="stripes-new-app-settings-message">
          <FormattedMessage id="ui-cataloging.settings.general" />
        </div>
      </Pane>
    );
  }
}
