/**
 * @format
 * @flow
 */
import React from 'react';
import { connect } from 'react-redux';
import { KeyValue, AccordionSet, Col, Row, FilterAccordionHeader, Accordion } from '@folio/stripes/components';
import InventoryPluggableBtn from '../Button/Inventory';
import type { Props } from '../../../core';
import { getTag245, getTitle245, getTag100, getTitle100 } from '../../../utils/Mapper';
import AssociatedBib from './AssociatedBib';
import { EMPTY_STRING } from '../../../shared/Constants';

import style from '../../../styles/common.css';
import { mapFields } from '../Utils/SearchUtils';
import { FixedFields } from '../../../models/model';

type P = Props & {
  items: Array<any>,
}

class RecordDetails extends React.Component<P, {}> {
  constructor(props:P) {
    super(props);
    const id = props.detailPaneMeta.meta['001'];
    this.state = {
      detail: props.data.search.bibliographicResults.filter(item => id === item.data.fields[0]['001'])
    };
  }

  render() {
    const { store: { dispatch }, items, checkDetailsInRow, translate, checkDetailsBibRec } = this.props;
    const { detail } = this.state;
    dispatch({ type: ActionTypes.SETTINGS, data: { detail } });
    const recordDetails = items.replace('LEADER', '000');
    const recordDetailsArray = recordDetails.split('\n');
    const tag245 = getTag245(recordDetailsArray);
    const title245 = getTitle245(recordDetailsArray);
    const tags: FixedFields<String, String, String, Array>[] = mapFields(detail[0].data.fields);
    return (
      <AccordionSet>
        <Accordion
          separator={false}
          header={FilterAccordionHeader}
          label={checkDetailsInRow !== checkDetailsBibRec ? translate({ id: 'ui-marccat.search.details.bibliographic' }) : translate({ id: 'ui-marccat.search.details.authority' })}
        >
          <div className={style.withSpace}>
            <KeyValue
              label={tag245 === EMPTY_STRING ? getTag100(recordDetailsArray) : tag245 + 'Title'}
              value={title245 === EMPTY_STRING ? getTitle100(recordDetailsArray) : title245}
            />
            {tags.filter(t => parseInt(t.key, 10) < 10).map((t: FixedFields<String, String, String, Array>) => (
              <React.Fragment>
                <Row>
                  <Col xs={3}>{t.key}</Col>
                  <Col xs={9}>{t.value}</Col>
                </Row>
              </React.Fragment>
            ))}
            {tags.filter(t => t.code).map((t: FixedFields<String, String, String, Array>) => (
              <React.Fragment>
                <Row>
                  <Col xs={1}>{t.code}</Col>
                  <Col xs={1}>{t.ind1}</Col>
                  <Col xs={1}>{t.ind2}</Col>
                  <Col xs={9}>
                    {t.subfield.map(x => {
                      return '$' + x.key + x.value;
                    })
                    }
                  </Col>
                </Row>
              </React.Fragment>
            ))}
          </div>
          <InventoryPluggableBtn {...this.props} buttonLabel={translate({ id: 'ui-marccat.search.goto.inventory' })} />
        </Accordion>
        {checkDetailsBibRec === checkDetailsInRow &&
          <AssociatedBib {...this.props} />}
      </AccordionSet>
    );
  }
}
export default (connect(
  ({ marccat: { details, associatedRecords } }) => ({
    items: details.records,
    checkDetailsInRow: details.recordType,
    checkDetailsBibRec: associatedRecords.recordType
  }), () => ({})
)(RecordDetails));
