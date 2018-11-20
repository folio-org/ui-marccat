/**
 * @format
 * @flow
 */
import * as React from 'react';
import Settings from '@folio/stripes-smart-components/lib/Settings';
import FieldGroupings from './FieldGroupings';
import DefaultTemplate from './DefaultTemplate';
import RecordsOverlayRules from './RecordOverlayRules';
import LocalAuthorityRecords from './LocalAuthorityRecords';

type MARCcatSelectSettingsProps = {
  stripes: Object;
};
export default class MARCcatSelectSettings extends
  React.Component<MARCcatSelectSettingsProps, {}> {
  pages = [
    {
      route: 'general',
      label: this.props.stripes.intl.formatMessage({
        id: 'ui-marccat.settings.field.groupings',
      }),
      component: FieldGroupings,
    },
    {
      route: 'defaultTemplate',
      label: this.props.stripes.intl.formatMessage({
        id: 'ui-marccat.settings.default.record.template',
      }),
      component: DefaultTemplate,
    },
    {
      route: 'overlayRules',
      label: this.props.stripes.intl.formatMessage({
        id: 'ui-marccat.settings.overlay.rules',
      }),
      component: RecordsOverlayRules,
    },
    {
      route: 'authorityRecords',
      label: this.props.stripes.intl.formatMessage({
        id: 'ui-marccat.settings.authority.records',
      }),
      component: LocalAuthorityRecords,
    },
  ];

  render() {
    return (
      <Settings
        {...this.props}
        navPaneWidth="20%"
        pages={this.pages}
        paneTitle={this.props.stripes.intl.formatMessage({
          id: 'ui-marccat.settings.general',
        })}
      />
    );
  }
}
