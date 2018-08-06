/**
 * @format
 * @flow
 */
import React from 'react';

type RestricionProps = { open: Boolean };

export default function RestrictionView({ open } : RestricionProps) {
  return (
    <div>restriction view {open}</div>
  );
}
