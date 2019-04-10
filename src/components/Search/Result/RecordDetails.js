/**
 * @format
 * @flow
 */
import React from 'react';
import { connect } from 'react-redux';
import { AccordionSet, Col, Row, FilterAccordionHeader, Accordion } from '@folio/stripes/components';
import InventoryPluggableBtn from '../Button/Inventory';
import type { Props } from '../../../core';
import AssociatedBib from './AssociatedBib';
import { ActionTypes } from '../../../redux/actions/Actions';

import style from '../Style/index.css';
import { mapFields } from '../Utils/SearchUtils';
import { FixedFields } from '../../../models/model';
import { SUBFIELD_CHARACTER } from '../../Cataloguing/Utils/MarcConstant';

type P = Props & {
  items: Array<any>,
}

class RecordDetails extends React.Component<P, {}> {
  constructor(props:P) {
    super(props);
    const id = props.detailPaneMeta.meta['001'];
    let mergedResults;
    let detailSelected;
    if (props.data.search.dataOld !== undefined) {
      mergedResults = [...props.data.search.bibliographicResults, ...props.data.search.oldBibArray];
      detailSelected = mergedResults.filter(item => id === item.data.fields[0]['001']);
    } else {
      detailSelected = props.data.search.bibliographicResults.filter(item => id === item.data.fields[0]['001']);
    }
    this.state = {
      detail: detailSelected
    };
  }

  render() {
    const { store: { dispatch }, checkDetailsInRow, translate, checkDetailsBibRec } = this.props;
    const { detail } = this.state;
    dispatch({ type: ActionTypes.SETTINGS, data: { detail } });
    const tags = (detail[0].data.fields.length > 0) ? mapFields(detail[0].data.fields) : [];
    return (
      <AccordionSet>
        <Accordion
          separator={false}
          header={FilterAccordionHeader}
          label={checkDetailsInRow !== checkDetailsBibRec ? translate({ id: 'ui-marccat.search.details.bibliographic' }) : translate({ id: 'ui-marccat.search.details.authority' })}
        >
          {tags && tags.filter(t => parseInt(t.key, 10) < 10).map((t: FixedFields<String, String, String, Array>) => (
            <React.Fragment>
              <Row className={style['record-detail-row']}>
                <Col xs={3} className={style.key}>{t.key}</Col>
                <Col xs={9} className={style.value}>{t.value}</Col>
              </Row>
            </React.Fragment>
          ))}
          {tags && tags.filter(t => t.code).map((t: FixedFields<String, String, String, Array>) => (
            <React.Fragment>
              <Row className={style['record-detail-row']}>
                <Col xs={1} className={style.key}>{t.code}</Col>
                <Col xs={1} className={style.key}>{t.ind1}</Col>
                <Col xs={1} className={style.key}>{t.ind2}</Col>
                <Col xs={8} className={style.value}>
                  {t.subfield.map(x => {
                    return SUBFIELD_CHARACTER.concat(x.key).concat(x.value);
                  })
                  }
                </Col>
              </Row>
            </React.Fragment>
          ))}
          <InventoryPluggableBtn {...this.props} className={style.inventoryButton} buttonLabel={translate({ id: 'ui-marccat.search.goto.inventory' })} />
        </Accordion>
        {checkDetailsBibRec === checkDetailsInRow &&
          <AssociatedBib {...this.props} />}
      </AccordionSet>
    );
  }
}
export default (connect(
  state => ({
    items: state.marccat.details.records,
    checkDetailsInRow: state.marccat.details.recordType,
    checkDetailsBibRec: state.marccat.associatedRecords.recordType,
    recorDetaild: state.marccat.data.marcRecordDetail
  }), () => ({})
)(RecordDetails));
