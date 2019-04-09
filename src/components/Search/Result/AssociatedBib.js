/**
 * @format
 * @flow
 */
import React from 'react';
import { connect } from 'react-redux';
import { Accordion, FilterAccordionHeader, MultiColumnList } from '@folio/stripes/components';
import type { Props } from '../../../core';
import { ActionTypes } from '../../../redux/actions';
import { remapForAssociatedBibList } from '../../../utils/Mapper';
import { resultsFormatterForAssociated, columnMapperForAssociated } from '../../../utils/Formatter';
import { EMPTY_STRING } from '../../../shared/Constants';

type P = Props & {
    checkRecordType: Array<any>,
}

function AssociatedBib({ ...props }: P) {
  const { bibRecords, ...rest } = props;
  const associatedBibRecords = bibRecords;
  const resultRemapped = (associatedBibRecords && associatedBibRecords.length > 0)
    ? remapForAssociatedBibList(associatedBibRecords)
    : undefined;

  return (bibRecords) ? (
    <Accordion
      {...rest}
      separator={false}
      header={FilterAccordionHeader}
      label={'(' + bibRecords.length + ') Associated bibliographic records'}
    >
      {resultRemapped &&
      <MultiColumnList
        id="bib-associated"
        defaultWidth="30%"
        isEmptyMessage={EMPTY_STRING}

        columnWidths={
          {
            'resultView': '20%',
            '245': '50%',
            'name': '20%',
            'format': '10%'
          }
        }
        onRowClick={(e, meta) => {
          const { dispatch } = props;
          const id = meta['001'];
          dispatch({ type: ActionTypes.ASSOCIATED_DETAILS, query: id, recordType: meta.recordView, mustOpenPanel: true });
        }}
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
    </Accordion>) : (<div />);
}

export default (connect(
  ({ marccat: { associatedRecords } }) => ({
    bibRecords: associatedRecords.records,
  })
)(AssociatedBib));
