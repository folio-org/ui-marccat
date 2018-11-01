import React from 'react';
import { connect } from 'react-redux';
import { Accordion, FilterAccordionHeader, MultiColumnList } from '@folio/stripes-components';
import type { Props } from '../../../core';
import { remapForAssociatedBibList } from '../Utils/Mapper';
import { resultsFormatterForAssociated, columnMapperForAssociated } from '../Utils/Formatter';
import { EMPTY_MESSAGE } from '../../../utils/Constant';


type P = Props & {
    checkRecordType: Array<any>,
}

function AssociatedBib({ ...props }: P) {
  const associatedBibRecords = props.bibRecords;
  const resultRemapped = (associatedBibRecords && associatedBibRecords.length > 0)
    ? remapForAssociatedBibList(associatedBibRecords)
    : undefined;

  return (
    <Accordion
      {...props.rest}
      separator={false}
      header={FilterAccordionHeader}
      label="Associated bibliographic records"
    >
      {resultRemapped &&
      <MultiColumnList
        id="bib-associated"
        defaultWidth="fill"
        isEmptyMessage={EMPTY_MESSAGE}
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
