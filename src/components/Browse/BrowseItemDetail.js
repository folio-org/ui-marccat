/**
 * @format
 * @flow
 */
import React from 'react';
import { connect } from 'react-redux';
import {
  KeyValue,
  Row,
  Col,
  AccordionSet,
  FilterAccordionHeader,
  Accordion,
  MultiColumnList
} from '@folio/stripes/components';
import { ActionTypes } from '../../redux/actions/Actions';
import type { Props } from '../../shared';
import { getTag100, getTitle100, remapForAssociatedBibList } from '../../utils/Mapper';
import { EMPTY_STRING } from '../../config/constants';
import { resultsFormatterForAssociated, columnMapperForAssociated } from '../../utils/Formatter';
import style from '../../shared/styles/common.css';

type P = Props & {
}

export class BrowseItemDetail extends React.Component<P, {
  recordDetailsArray: [],
}> {
  constructor(props: P) {
    super(props);
    this.state = {
      recordDetailsArray: []
    };
  }

  render() {
    const { browseDetailRecords, authorityDetails } = this.props;
    const resultRemapped = (browseDetailRecords && browseDetailRecords.length > 0)
      ? remapForAssociatedBibList(browseDetailRecords)
      : undefined;
    const { isAuthority } = this.props;
    if (isAuthority && authorityDetails !== undefined) {
      const recordDetails = authorityDetails.replace('LEADER', '000');
      this.state.recordDetailsArray = recordDetails.split('\n');
    }
    const { recordDetailsArray } = this.state;
    return (
      <AccordionSet>
        {isAuthority &&
          <Accordion
            separator={false}
            header={FilterAccordionHeader}
            label="Authority Record"
          >
            <div className={style.withSpace}>
              <KeyValue
                label={getTag100(recordDetailsArray) + 'Title'}
                value={getTitle100(recordDetailsArray)}
              />
              {recordDetailsArray.map((item, i) => (
                <Row key={i}>
                  <Col xs={1} className={style.padding8}>
                    {item.trim().substring(0, 3)}
                  </Col>
                  <Col xs={1} className={style.padding8}>
                    {item.substring(6).startsWith('$') ? item.substring(3, 6) : ''}
                  </Col>
                  <Col xs={10} className={style.padding8}>
                    {!item.substring(6).startsWith('$') ? item.substring(3) : item.substring(6)}
                  </Col>
                </Row>
              ))}
            </div>
          </Accordion>
        }
        <div>
          <Accordion
            separator={false}
            header={FilterAccordionHeader}
            label="List of Records"
          >
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
              rowMetadata={['001', 'recordView']}
              contentData={resultRemapped}
              formatter={resultsFormatterForAssociated}
              columnMapping={columnMapperForAssociated}
              onRowClick={(e, meta) => {
                const { dispatch } = this.props;
                const id = meta['001'];
                dispatch({ type: ActionTypes.BROWSE_ASSOCIATED_DETAILS, query: id, recordType: meta.recordView, mustOpenPanel: true });
              }}
              visibleColumns={[
                'resultView',
                '245',
                'name',
                'format'
              ]}
            />
          </Accordion>
        </div>
      </AccordionSet>
    );
  }
}
export default (connect(
  ({ marccat: { browseDetails } }) => ({
    browseDetailRecords: browseDetails.results,
    authorityDetails: browseDetails.records,
    isAuthority: browseDetails.isAuthority,
  })
)(BrowseItemDetail));
