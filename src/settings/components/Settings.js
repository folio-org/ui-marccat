/**
 * @format
 * @flow
 */
import * as React from 'react';
import Settings from '@folio/stripes-smart-components/lib/Settings';
import GeneralSettings from './GeneralSettings';
import MARCcatSettings from './MARCcatSettings';

type MARCcatSelectSettingsProps = {
  stripes: Object;
};
export default class MARCcatSelectSettings extends
  React.Component<MARCcatSelectSettingsProps, {}> {
  pages = [
    {
      route: 'general',
      label: this.props.stripes.intl.formatMessage({
        id: 'ui-marccat.settings.general',
      }),
      component: GeneralSettings,
    },
    {
      route: 'marccat',
      label: this.props.stripes.intl.formatMessage({
        id: 'ui-marccat.marccat',
      }),
      component: MARCcatSettings,
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
