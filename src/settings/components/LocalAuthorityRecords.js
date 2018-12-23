/**
 * @format
 * @flow
 */
import * as React from 'react';
import { Pane, Icon } from '@folio/stripes/components';
import { Props, injectCommonProp } from '../../core';
import { ToolbarButtonMenu } from '../../lib';
import ToggleSwitch from '../../lib/components/Button/SwitchButton';
import { CheckboxIconButton } from '../../lib/components/Button/OptionButton';

type P = Props & {
  label: string;
};
class LocalAuthorityRecords extends React.Component<P, {}> {
  handleOnClick = () => {};

  renderRightMenu = () => {
    const { translate } = this.props;
    return (
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
        <ToggleSwitch {...this.props} />
        <CheckboxIconButton />
      </Pane>
    );
  }
}
export default injectCommonProp(LocalAuthorityRecords);
