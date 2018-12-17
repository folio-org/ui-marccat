import React from 'react';
import { Row } from 'react-flexbox-grid';
import { FormattedMessage } from 'react-intl';

export default function MyActionMenu() {
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
