import React, { Component } from 'react';
import Pane from '@folio/stripes-components/lib/Pane';
import { FormattedMessage } from 'react-intl';

type GeneralSettingsProps = {
  label: string,
};
type GeneralSettingsState = {};

export default class GeneralSettings extends Component<GeneralSettingsProps, GeneralSettingsState> {
  render() {
    return (
      <Pane
        defaultWidth="fill"
        fluidContentWidth
        paneTitle={this.props.label}
      >
        <div id="stripes-new-app-settings-message">
          <FormattedMessage id="ui-marccat.settings.general" />
        </div>
      </Pane>
    );
  }
}
