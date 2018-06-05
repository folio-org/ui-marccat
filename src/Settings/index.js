import React from 'react';
import Settings from '@folio/stripes-components/lib/Settings';
import GeneralSettings from './GeneralSettings';

export default class CatalogingSettings extends React.Component {
  pages = [
    {
      route: 'general',
      label: this.props.stripes.intl.formatMessage({ id: 'ui-cataloging.settings.general' }), // eslint-disable-line react/prop-types
      component: GeneralSettings,
    }
  ];

  render() {
    return (
      <Settings {...this.props} pages={this.pages} paneTitle={this.props.stripes.intl.formatMessage({ id: 'ui-cataloging.settings.general' })} />
    );
  }
}
