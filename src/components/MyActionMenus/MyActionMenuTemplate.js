import React from 'react';
import { Row, Col } from 'react-flexbox-grid';
import { FormattedMessage } from 'react-intl';
import { SearchField } from '@folio/stripes-components';

export default function MyActionMenuTemplate() {
  return (
    <div>
      <Row>
        <Col xs={9}>
          <FormattedMessage id="ui-marccat.template.actionmenu.load" />
        </Col>
        <Col xs={3}>
          <FormattedMessage id="ui-marccat.template.actionmenu.load.shortcut" />
        </Col>
      </Row>
      <br />
      <Row>
        <Col xs={5}>
          <FormattedMessage id="ui-marccat.template.actionmenu.organization" />
        </Col>
        <Col xs={7}>
          <SearchField
            onChange={() => {}}
            value={() => {}}
            onClear={() => {}}
            placeholder="Filter..."
          />
        </Col>
      </Row>
      <br />
      <Row>
        <Col xs={5}>
          <FormattedMessage id="ui-marccat.template.actionmenu.mypersonal" />
        </Col>
        <Col xs={7}>
          <SearchField
            onChange={() => {}}
            value={() => {}}
            onClear={() => {}}
            placeholder="Filter..."
          />
        </Col>
      </Row>
      <br />
      <Row>
        <FormattedMessage id="ui-marccat.template.actionmenu.save" />
      </Row>
      <br />
      <hr />
      <Row>
        <FormattedMessage id="ui-marccat.template.actionmenu.import.overlay" />
      </Row>
      <br />
      <Row>
        <FormattedMessage id="ui-marccat.template.actionmenu.import.oclc" />
      </Row>
    </div>
  );
}
