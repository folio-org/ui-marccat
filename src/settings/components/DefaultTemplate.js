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
class DefaultTemplate extends React.Component<P, {}> {
  render() {
    const { translate, label } = this.props;
    return (
      <Pane
        defaultWidth="fill"
        fluidContentWidth
        paneTitle={label}
      >
        <div id="data-test-settings-default-record-template">
          {translate({ id: 'ui-marccat.settings.default.record.template' }) }
        </div>
      </Pane>
    );
  }
}

export default injectCommonProp(DefaultTemplate);
