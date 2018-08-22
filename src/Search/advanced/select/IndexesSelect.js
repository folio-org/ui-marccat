/**
 * @format
 * @flow
 */
import * as React from 'react';
import { Col } from '@folio/stripes-components/lib/LayoutGrid';
import Select from '@folio/stripes-components/lib/Select';

type CategorySelectProps = {
    innerIndexes: Object;
    value: string;
    onChange: () => void;
};

export default function IndexesSelect({ innerIndexes, value, onChange }: CategorySelectProps) {
  return (
    <Col xs={12}>
      {innerIndexes &&
        <Select
          marginBottom0
          name="indexesSelect"
          value={value}
          onChange={onChange}
        >
          <option value="">--</option>
          {innerIndexes.records.map((element) => (
            <option key={element.value} value={element.value}>{element.label}</option>
          ))}
        </Select>
      }
    </Col>
  );
}
