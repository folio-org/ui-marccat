//
import * as React from 'react';
import { Pane, Icon } from '@folio/stripes/components';
import { injectProps, ToolbarButtonMenu } from '../../../shared';


class LocalAuthorityRecords extends React.Component {
  handleOnClick = () => {};

  renderRightMenu = () => {
    const { translate } = this.props;
    return (
      <ToolbarButtonMenu
        onClick={this.handleOnClick()}
        {...this.props}
        label={
          <Icon icon="edit">
            {translate({
              id: 'ui-marccat.search.record.edit' })}
          </Icon>
        }
      />
    );
  };

  render() {
    const { label, translate } = this.props;
    return (
      <Pane
        defaultWidth="fill"
        fluidContentWidth
        paneTitle={label}
        lastMenu={this.renderRightMenu()}
      >
        <div id="data-test-settings-authority-records">
          {translate({ id: 'ui-marccat.settings.local.authority.text' }) }
        </div>
      </Pane>
    );
  }
}
export default injectProps(LocalAuthorityRecords);
