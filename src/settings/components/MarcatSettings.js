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
import { ActionTypes } from '../../redux/actions/Actions';


type P = {
  stripes: Object;
};
export default class MARCcatSettings extends React.Component<P, {}> {
  handleOnClick = () => {
    const { store } = this.props;
    store.dispatch({ type: ActionTypes.VIEW_TEMPLATE });
  }

  renderSettingsPages = () => {
    const { translate } = this.props;
    return [
      {
        route: 'general',
        label: translate({
          id: 'ui-marccat.settings.field.groupings',
        }),
        component: FieldGroupings,
      },
      {
        route: 'defaultTemplate',
        label: translate({
          id: 'ui-marccat.settings.default.record.template',
        }),
        component: DefaultTemplate,
      },
      {
        route: 'overlayRules',
        label: translate({
          id: 'ui-marccat.settings.overlay.rules',
        }),
        component: RecordsOverlayRules,
      },
      {
        route: 'authorityRecords',
        label: translate({
          id: 'ui-marccat.settings.authority.records',
        }),
        component: LocalAuthorityRecords,
      },
    ];
  };

  render() {
    const { translate } = this.props;
    return (
      <Settings
        {...this.props}
        navPaneWidth="20%"
        onClick={this.handleOnClick()}
        pages={this.renderSettingsPages()}
        paneTitle={translate({
          id: 'ui-marccat.settings.general',
        })}
      />
    );
  }
}
