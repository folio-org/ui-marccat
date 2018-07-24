import React from 'react';
import Settings from '@folio/stripes-components/lib/Settings';
import GeneralSettings from './GeneralSettings';

type MARCcatSelectSettingsProps = {};
type MARCcatSelectSettingsState = {};

export default class MARCcatSelectSettings extends
  React.Component<MARCcatSelectSettingsProps, MARCcatSelectSettingsState> {
  pages = [
    {
      route: 'general',
      label: this.props.stripes.intl.formatMessage({
        id: 'ui-marccat.settings.general',
      }),
      component: GeneralSettings,
    },
  ];

  render() {
    return (
      <Settings
        {...this.props}
        pages={this.pages}
        paneTitle={this.props.stripes.intl.formatMessage({
          id: 'ui-marccat.settings.general',
        })}
      />
    );
  }
}
