/**
 * @format
 * @flow
 */
/* eslint-disable no-tabs */
import React from 'react';
import KeyValue from '@folio/stripes-components/lib/KeyValue';
import { Row, Col } from '@folio/stripes-components/lib/LayoutGrid';

type DisplayTagProps = {
  translate: (o: Object) => string;
};

export default function DisplayTag({ translate }: DisplayTagProps) {
  return (
    <div>
      <Row>
        <Col xs={12}>
          <KeyValue
            label={translate({ id: 'ui-marccat.display.tag' })}
            value="040-040 Fonte di catalogazione	    $aItFiC$bita"
          />
        </Col>
      </Row>
    </div>
  );
}
