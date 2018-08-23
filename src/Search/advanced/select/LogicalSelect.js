/**
 * @format
 * @flow
 */
import * as React from 'react';
import { Col } from '@folio/stripes-components/lib/LayoutGrid';
import Select from '@folio/stripes-components/lib/Select';

type CategorySelectProps = {
    translate: () => void;
};

export default function LogicalSelect({ handleTextAreaValue, ...props }: CategorySelectProps) {
  const options = ['and', 'or', 'not', 'near'];
  const { translate } = props;
  return (
    <Col xs={12}>
      <Select
        marginBottom0
        name="indexesSelect"
        onChange={handleTextAreaValue}
      >
        <option value="">--</option>
        {options.map((element) => (
          <option key={element} value={element}>{element}</option>
        ))}
      </Select>
    </Col>
  );
}
