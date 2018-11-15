/**
 * @format
 * @flow
 */
import * as React from 'react';
import Pane from '@folio/stripes-components/lib/Pane';
import { FormattedMessage } from 'react-intl';

type GeneralSettingsProps = {
  label: string,
};
export default class LocalAuthorityRecords extends React.Component<GeneralSettingsProps, {}> {
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
