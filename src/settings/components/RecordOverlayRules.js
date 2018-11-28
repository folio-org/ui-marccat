/**
 * @format
 * @flow
 */
import * as React from 'react';
import Pane from '@folio/stripes-components/lib/Pane';
import { Props, injectCommonProp } from '../../core';

type P = Props & {
  label: string;
};
class RecordsOverlayRules extends React.Component<P, {}> {
  render() {
    const { label, translate } = this.props;
    return (
      <Pane
        defaultWidth="fill"
        fluidContentWidth
        paneTitle={label}
      >
        <div id="data-test-settings-record-overlay-rules">
          {translate({ id: 'ui-marccat.settings.overlay.rules' }) }
        </div>
      </Pane>
    );
  }
}
export default injectCommonProp(RecordsOverlayRules);
