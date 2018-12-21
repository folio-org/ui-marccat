import React from 'react';
import { Row, Button, Icon } from '@folio/stripes/components';
import { FormattedMessage } from 'react-intl';

export default function ActionMenu() {
  return (
    <div>
      <Row>
        <FormattedMessage id="ui-marccat.search.actionmenu.export.mrc" />
      </Row>
      <br />
      <Row>
        <FormattedMessage id="ui-marccat.browse.actionmenu.export.csv" />
      </Row>
      <br />
      <Row>
        <FormattedMessage id="ui-marccat.browse.actionmenu.export.dat" />
      </Row>
      <br />
      <Row>
        <FormattedMessage id="ui-marccat.search.actionmenu.print" />
      </Row>
      <br />
      <Row>
        <FormattedMessage id="ui-marccat.search.actionmenu.opac" />
      </Row>
      <br />
      <Row>
        <FormattedMessage id="ui-marccat.search.actionmenu.duplicate" />
      </Row>
      <br />
      <Row>
        <FormattedMessage id="ui-marccat.search.actionmenu.holdings" />
      </Row>
      <br />
      <Row>
        <FormattedMessage id="ui-marccat.search.actionmenu.instances" />
      </Row>
      <br />
      <Row>
        <FormattedMessage id="ui-marccat.search.actionmenu.authority.records" />
      </Row>
    </div>
  );
}
export const getActionMenu = () => (
  <React.Fragment>
    <Button buttonStyle="dropdownItem">
      <Icon icon="document">
              New Template
      </Icon>
    </Button>
    <Button buttonStyle="dropdownItem">
      <Icon icon="document">
              New Template
      </Icon>
    </Button>
  </React.Fragment>
);
