/**
 * @format
 * @flow
 */
import React from 'react';
import { FormattedMessage } from 'react-intl';
import {
  Dropdown,
  DropdownMenu,
  Button,
  PaneMenu,
  Icon
} from '@folio/stripes/components';
import type { Props } from '../../core';

type P = Props & {
  onToggle(): void,
  open: boolean
}

export default class VariableFieldActionMenu extends React.Component<P, {}> {
  render() {
    const { onToggle, open } = this.props;
    return (
      <PaneMenu>
        <Dropdown
          id="AddPermissionDropdown_"
          open={open}
          onToggle={onToggle}
          group
          pullRight
        >
          <Button
            data-role="toggle"
            align="end"
            bottomMargin0
            aria-haspopup="true"
          >
            <FormattedMessage id="ui-marccat.search.record.actions" />
            <Icon
              icon="down-caret"
              size="small"
              iconClassName="myClass"
            />
          </Button>
          <DropdownMenu
            data-role="menu"
            aria-label="available permissions"
            onToggle={onToggle}
          >
            {/* <div>
              <Row>
                <Col xs={9}>
                  <FormattedMessage id="ui-marccat.button.new.auth" />
                </Col>
                <Col xs={3}>
                  <FormattedMessage id="ui-marccat.button.new.short.auth" />
                </Col>
              </Row>
              <br />
              <Row>
                <Col xs={9}>
                  <FormattedMessage id="ui-marccat.button.new.bib" />
                </Col>
                <Col xs={3}>
                  <FormattedMessage id="ui-marccat.button.new.short.bib" />
                </Col>
              </Row>
            </div> */}
          </DropdownMenu>
        </Dropdown>
      </PaneMenu>
    );
  }
}
