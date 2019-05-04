/* eslint-disable react/destructuring-assignment */
// @flow
import * as React from 'react';
import { Select } from '@folio/stripes/components';
import { decamelizify } from '../../../../utils/Function';
import { EMPTY_SPACED_STRING } from '../../../../config/constants';
import


const DropDown = ({ field, onChange }: {}) => (
  <Select
    id={`${field.name}`}
    label={decamelizify(field.name, EMPTY_SPACED_STRING)}
    dataOptions={field.dropdownSelect}
    onChange={onChange}
    placeholder={field.name}
    value={field.defaultValue}
  />
);

export default DropDown;
