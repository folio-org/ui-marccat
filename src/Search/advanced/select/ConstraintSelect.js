/**
 * @format
 * @flow
 */
import * as React from 'react';
import { Col } from '@folio/stripes-components/lib/LayoutGrid';
import Select from '@folio/stripes-components/lib/Select';
import * as C from '../../../Utils';

type CategorySelectProps = {
    constraintIndexes: Object;
    value: string;
    onChange: () => void;
};

export default function ConstraintSelect({ constraintIndexes, value, onChange }: CategorySelectProps) {
  return (
    <Col xs={12}>
      {constraintIndexes && constraintIndexes.records.length > 0 &&
        <Select
          marginBottom0
          name="constraintSelect"
          value={value}
          onChange={onChange}
        >
          <option value="">--</option>
          {constraintIndexes.records.map((element) => (
            <option key={element.value} value={element.value + C.SEPARATOR + element.label}>{element.label}</option>
          ))}
        </Select>
      }
    </Col>
  );
}
