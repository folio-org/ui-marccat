import React from 'react';
import Settings from '@folio/stripes-components/lib/Settings';
import GeneralSettings from './GeneralSettings';
import LogicalViewSettings from './LogicalViewSettings';

type CatalogingSettingsProps = {|
  stripes: {
  connect: Function,
    intl: Object,
  }
|}

export default class CatalogingSettings extends React.Component<CatalogingSettingsProps, {}> {
  pages = [
    {
      route: 'general',
      label: this.props.stripes.intl.formatMessage({ id: 'ui-cataloging.settings.general' }),
      component: GeneralSettings,
    },
    {
      route: 'logical-view',
      label: this.props.stripes.intl.formatMessage({ id: 'ui-cataloging.settings.logicalview' }),
      component: LogicalViewSettings,
    }
  ];

  render() {
    return (
      <Settings {...this.props} pages={this.pages} paneTitle={this.props.stripes.intl.formatMessage({ id: 'ui-cataloging.settings.general' })} />
    );
  }
}
