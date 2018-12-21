/**
 * @format
 * @flow
 */
import * as React from 'react';
import { Pane } from '@folio/stripes/components';
import { Props, injectCommonProp } from '../../core';

type P = Props & {
  label: string;
};
class LocalAuthorityRecords extends React.Component<P, {}> {
  render() {
    const { label, translate } = this.props;
    return (
      <Pane
        defaultWidth="fill"
        fluidContentWidth
        paneTitle={label}
      >
        <div id="data-test-settings-authority-records">
          {translate({ id: 'ui-marccat.settings.authority.records' }) }
        </div>
      </Pane>
    );
  }
}
export default injectCommonProp(LocalAuthorityRecords);
