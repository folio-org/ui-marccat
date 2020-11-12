// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { AccordionSet, Col, Row, FilterAccordionHeader, Accordion } from '@folio/stripes/components';
import { MultiColumnList } from '@folio/stripes/components';
import InventoryPluggableButton from '../Button/Inventory';
import type { Props } from '../../../flow/types.js.flow';
import AssociatedBib from './AssociatedBib';
import { ACTION } from '../../../redux/actions';

import { mapFields } from '../Utils/SearchUtils';
import { FixedFields } from '../../Cataloguing/Models/model';
import { SUBFIELD_CHARACTER } from '../../Cataloguing/Utils/MarcConstant';
import { SEARCH_SEGMENT } from '../../../config/constants';
import style from '../Style/index.css';
import {
  authDetailsColumnMapper,
  authDetailsRenderColumn,
  authDetailsResultFormatter,
} from '../../../shared/utils/Formatter';

type P = Props & {
  items: Array<any>,
}

class RecordDetails extends React.Component<P, {}> {
  render() {
    const { store: { dispatch }, detailPaneMeta, checkDetailsInRow, translate, checkDetailsBibRec, data: { search: { segment } } } = this.props;
    const list = [
      {
        sampleId: 'a',
        username: 'Jon',
        surname: 'Mugica',
        year: 1973
      }, {
        sampleId: 'b',
        username: 'Ander',
        surname: 'Recalde',
        year: 1997
      }
    ];
    this.state = {
      listData : list
    };
    // eslint-disable-next-line no-unused-vars
    const currentDatail = detailPaneMeta.detail[0];
    dispatch({ type: ACTION.SETTINGS, data: { currentDatail } });

    const tags = (currentDatail) ? mapFields(currentDatail.data.fields) : [];
    return (
      <AccordionSet>
        <Accordion
          separator={false}
          header={FilterAccordionHeader}
          label={detailPaneMeta.title.startsWith('Bib') ? translate({ id: 'ui-marccat.search.details.bibliographic' }) : translate({ id: 'ui-marccat.search.details.authority' })}
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
          {this.inventoryButton(segment, translate)}

        </Accordion>
        {checkDetailsBibRec === checkDetailsInRow &&
          <AssociatedBib {...this.props} />}
      </AccordionSet>
    );
  }

  inventoryButton = (segment, translate) => {

    if (segment === SEARCH_SEGMENT.BIBLIOGRAPHIC) {
      return (
        <InventoryPluggableButton {...this.props} className={style.inventoryButton} buttonLabel={translate({ id: 'ui-marccat.search.goto.inventory' })} />
      );
    } else {
      return (
        <MultiColumnList
          id="dui-marccat.search.goto.inventory"
          rowMetadata={['001', 'recordView']}
          contentData={this.state.listData}
          formatter={authDetailsResultFormatter()}
          columnMapping={authDetailsColumnMapper()}
          visibleColumns={authDetailsRenderColumn()}
        />

      );
    }
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
