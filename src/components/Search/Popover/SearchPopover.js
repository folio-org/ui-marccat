/**
 * @format
 * @flow
 */
import React from 'react';

type P = {
  label: string,
};

export default function SearchPopover({ label }:P) {
  return (
    <React.Fragment>
      <div>{label}</div>
    </React.Fragment>

  );
}
