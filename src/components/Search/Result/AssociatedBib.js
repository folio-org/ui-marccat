import React from 'react';
import { connect } from 'react-redux';
import { Accordion, MultiColumnList } from '@folio/stripes-components';
import type { Props } from '../../../core';
import { remapForAssociatedBibList } from '../../../utils/Mapper';
import { resultsFormatterForAssociated, columnMapperForAssociated } from '../../../utils/Formatter';


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
      <MultiColumnList
        id="tabella"
        defaultWidth="fill"
        isEmptyMessage=""
        columnWidths={
          {
            'resultView': '10%',
            '245': '60%',
            'name': '20%',
            'format': '10%'
          }
        }
        rowMetadata={['001', 'recordView']}
        contentData={resultRemapped}
        formatter={resultsFormatterForAssociated}
        columnMapping={columnMapperForAssociated}
        visibleColumns={[
          'resultView',
          '245',
          'name',
          'format'
        ]}
      />}
    </Accordion>
  );
}

export default (connect(
  ({ marccat: { associatedRecords } }) => ({
    checkRecordType: associatedRecords.recordType,
    bibRecords: associatedRecords.records
  })
)(AssociatedBib));
