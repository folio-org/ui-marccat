/**
 * @format
 * @flow
 */
import React from 'react';
import KeyValue from '@folio/stripes-components/lib/KeyValue';
import { Row, Col } from '@folio/stripes-components/lib/LayoutGrid';
import { injectIntl } from 'react-intl';
import css from '../../styles/Template.css';

type DisplayTagProps = {
  intl: Object;
};

function DisplayTag({ ...props }: DisplayTagProps) {
  return (
    <div>
      <Row>
        <Col xs={12}>
          <KeyValue
            label={props.intl.formatMessage({ id: 'ui-marccat.display.tag' })}
            value="040-040 Fonte di catalogazione		$aItFiC$bita"
          />
        </Col>
      </Row>
    </div>
  );
}
export default injectIntl(DisplayTag);
