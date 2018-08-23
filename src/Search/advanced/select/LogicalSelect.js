/**
 * @format
 * @flow
 */
import * as React from 'react';
import { Col } from '@folio/stripes-components/lib/LayoutGrid';
import Select from '@folio/stripes-components/lib/Select';


export default function LogicalSelect() {
  const options = ['and', 'or', 'not', 'near'];
  return (
    <Col xs={12}>
      <Select
        marginBottom0
        name="indexesSelect"
      >
        <option value="">--</option>
        {options.map((element) => (
          <option key={element} value={element}>{element}</option>
        ))}
      </Select>
    </Col>
  );
}
