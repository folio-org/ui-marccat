/**
 * @format
 * @flow
 */
import * as React from 'react';
import Pane from '@folio/stripes-components/lib/Pane';
import { FormattedMessage } from 'react-intl';

type MARCcatSettingsProps = {
  label: string,
};

export default class MARCcatSettings extends React.Component<MARCcatSettingsProps, {}> {
  render() {
    return (
      <Pane
        defaultWidth="fill"
        fluidContentWidth
        paneTitle={this.props.label}
      >
        <div id="stripes-new-app-settings-message">
          <FormattedMessage id="ui-marccat.marccat" />
        </div>
      </Pane>
    );
  }
}
