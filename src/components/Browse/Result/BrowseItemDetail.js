import React from 'react';
import { connect } from 'react-redux';
import KeyValue from '@folio/stripes-components/lib/KeyValue';
import { AccordionSet, FilterAccordionHeader, Accordion, MultiColumnList } from '@folio/stripes-components';
import { Row, Col } from 'react-flexbox-grid';
import type { Props } from '../../../core';
import { getTag100, getTitle100, remapForAssociatedBibList } from '../../../utils/Mapper';
import { EMPTY_MESSAGE } from '../../../utils/Constant';
import { ToolbarButtonMenu } from '../../../lib';
import { resultsFormatterForAssociated, columnMapperForAssociated } from '../../../utils/Formatter';
import style from '../../../styles/common.css';

type P = Props & {}

export class BrowseItemDetail extends React.Component<P, {}> {
  renderButtonMenu = () => {
    return (<ToolbarButtonMenu create {...this.props} label="ui-marccat.browse.record.create" />);
  };
  render() {
    const resultRemapped = (this.props.browseDetailRecords && this.props.browseDetailRecords.length > 0)
      ? remapForAssociatedBibList(this.props.browseDetailRecords)
      : undefined;
    const { isAuthority } = this.props;
    const recordDetails = this.props.authorityDetails;
    const recordDetailsArray = recordDetails.split('\n');
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
              isEmptyMessage={EMPTY_MESSAGE}
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

