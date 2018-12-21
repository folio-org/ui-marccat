/**
 * @format
 * @flow
 */
import * as React from 'react';
import { Pane, Icon } from '@folio/stripes/components';
import { Props, injectCommonProp } from '../../core';
import { ToolbarButtonMenu } from '../../lib';


type P = Props & {
  label: string;
};

class RecordsOverlayRules extends React.Component<P, {}> {
  handleOnClick = () => {};

  render() {
    const { label, translate } = this.props;
    const rightMenu = (
      <ToolbarButtonMenu
        create
        onClick={this.handleOnClick()}
        {...this.props}
        label={
          <Icon icon="edit">
            {translate({
              id:'ui-marccat.search.record.edit' })}
          </Icon>
           }
      />
    );
    return (
      <Pane
        defaultWidth="fill"
        fluidContentWidth
        paneTitle={label}
        lastMenu={rightMenu}
      >
        <div id="data-test-settings-record-overlay-rules">
          {translate({ id: 'ui-marccat.settings.overlay.rules' }) }
        </div>
      </Pane>
    );
  }
}
export default injectCommonProp(RecordsOverlayRules);
