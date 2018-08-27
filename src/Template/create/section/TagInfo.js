/**
 * @format
 * @flow
 */
import React from 'react';
import { Row, Col } from '@folio/stripes-components/lib/LayoutGrid';
import { Accordion } from '@folio/stripes-components/lib/Accordion';

import CreateTag from '../view/CreateTag';

type TagInfoProps = {
    translate: (o: Object) => void;
    onToggle: () => void;
    expanded: boolean;
    accordionId: string;
};

export default function TagInfo({ translate, expanded, accordionId, onToggle, ...props }:TagInfoProps) {
  return (
    <Accordion
      {...props}
      label={translate({ id: 'ui-marccat.template.information.tag' })}
      open={expanded}
      id={accordionId}
      onToggle={onToggle}
    >
      <Row id="section-tag">
        <Col xs={12}>
          <CreateTag {...props} />
        </Col>
      </Row>
    </Accordion>
  );
}
