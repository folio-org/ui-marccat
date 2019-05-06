// @flow
import * as React from 'react';
import {
  UncontrolledDropdown,
  DropdownMenu,
  Button,
  Icon
} from '@folio/stripes/components';
import type { Props } from '../../../../flow/types.js.flow';
import ActionLabels from './ActionLabels';
import { Localize } from '../../../../shared/utils/Function';

type P = Props & {
  onToggle(): void,
  open: boolean
}

export default class ActionsMenu extends React.Component<P, {}> {
  constructor() {
    super();
    this.state = {
      dropdownOpen: false,
    };
    this.onToggle = this.onToggle.bind(this);
  }

  onToggle() {
    const { dropdownOpen } = this.state;
    const isOpen = dropdownOpen;
    this.setState({
      dropdownOpen: !isOpen,
    });
  }

  render() {
    const { dropdownOpen } = this.state;
    return (
      <UncontrolledDropdown
        open={this.state ? dropdownOpen : false}
        onToggle={this.onToggle}
      >
        <Button
          buttonStyle="primary"
          data-role="toggle"
          aria-haspopup="true"
        >
          {Localize({ key: 'cataloging.actions' })}
          <Icon
            icon="caret-down"
            size="small"
          />
        </Button>
        <DropdownMenu
          data-role="menu"
          aria-label="show-action-variable-fields"
          onToggle={this.onToggle}
        >
          <ActionLabels
            {...this.props}
          />
        </DropdownMenu>
      </UncontrolledDropdown>
    );
  }
}
