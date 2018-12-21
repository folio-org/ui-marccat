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
class LocalAuthorityRecords extends React.Component<P, {}> {
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
       
        <div id="data-test-settings-authority-records">
          {translate({ id: 'ui-marccat.settings.authority.records' }) }
        </div>
      </Pane>
    );
  }
}
export default injectCommonProp(LocalAuthorityRecords);
