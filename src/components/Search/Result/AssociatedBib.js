import React from 'react';
import { connect } from 'react-redux';
import { Accordion } from '@folio/stripes-components';
import type { Props } from '../../../core';
import { remapForAssociatedBibList } from '../../../utils/Mapper';

type P = Props & {
    checkRecordType: Array<any>,
}

function AssociatedBib({ ...props }: P) {
  const associatedBibRecords = props.bibRecords;
  let resultRemapped;
  if (associatedBibRecords && associatedBibRecords.length > 0) {
    resultRemapped = remapForAssociatedBibList(associatedBibRecords);
  }
  return (
    <Accordion
      separator={false}
      label="Associated bibliographic records"
    >
      {resultRemapped &&
      <ul>
        {resultRemapped.map(element =>
          <li>{element[245]}</li>)}
      </ul>}
    </Accordion>
  );
}

export default (connect(
  ({ marccat: { associatedRecords } }) => ({
    checkRecordType: associatedRecords.recordType,
    bibRecords: associatedRecords.records
  })
)(AssociatedBib));
