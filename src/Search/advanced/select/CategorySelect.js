/**
 * @format
 * @flow
 */
import * as React from 'react';
import { Col } from '@folio/stripes-components/lib/LayoutGrid';
import Select from '@folio/stripes-components/lib/Select';

type CategorySelectProps = {
    categories: Object;
    value: string;
    onChange: () => void;
};

export default function CategorySelect({ categories, value, onChange }: CategorySelectProps) {
  return (
    <Col xs={12}>
      {categories &&
        <Select
          marginBottom0
          name="categorySelect"
          value={value}
          onChange={onChange}
        >
          {categories.records.map((element) => (
            <option key={element.value} value={element.value}>{element.label}</option>
          ))}
        </Select>
      }
    </Col>
  );
}
