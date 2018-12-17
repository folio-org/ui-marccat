import React from 'react';
import { Row, Col } from 'react-flexbox-grid';
import { FormattedMessage } from 'react-intl';
import { Dropdown, DropdownMenu, Button, PaneMenu, Icon } from '@folio/stripes/components';
import type { Props } from '../../core';

type P = Props & {
  onToggle(): void,
  open: boolean
}

export default class MyNewButtonMenu extends React.Component<P, {}> {
  constructor(props: P) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { onToggle, open } = this.props;
    return (
      <PaneMenu>
        <Dropdown
          id="AddPermissionDropdown"
          open={open}
          onToggle={onToggle}
          group
          style={{ float: 'right' }}
          pullRight
        >
          <Button
            data-role="toggle"
            align="end"
            bottomMargin0
            aria-haspopup="true"
          >
            <FormattedMessage id="ui-marccat.search.record.new.keyboard" />
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
            <div>
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
            </div>
          </DropdownMenu>
        </Dropdown>
      </PaneMenu>
    );
  }
}
