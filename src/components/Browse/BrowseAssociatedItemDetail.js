// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { Row, Col, KeyValue, AccordionSet, FilterAccordionHeader, Accordion } from '@folio/stripes/components';
import type { Props } from '../../flow/types.js.flow';
import { getTag245, getTitle245 } from '../../shared/utils/Mapper';

import style from '../../shared/styles/common.css';

type P = Props & {
  items: Array<any>,
}

function BrowseAssociatedItemDetail({ translate, ...props }: P) {
  if (props.items !== undefined) {
    const recordDetails = props.items.replace('LEADER', '000');
    const recordDetailsArray = recordDetails.split('\n');
    const tag245 = getTag245(recordDetailsArray);
    const title245 = getTitle245(recordDetailsArray);
    return (
      <AccordionSet>
        <Accordion
          separator={false}
          header={FilterAccordionHeader}
          label={translate({ id: 'ui-marccat.search.details.bibliographic' })}
        >
          <div className={style.withSpace}>
            <KeyValue
              label={tag245 + 'Title'}
              value={title245}
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
      </AccordionSet>
    );
  } else return null;
}

export default (connect(
  ({ marccat: { browseDetailsAssociated } }) => ({
    items: browseDetailsAssociated.records,
  })
)(BrowseAssociatedItemDetail));
