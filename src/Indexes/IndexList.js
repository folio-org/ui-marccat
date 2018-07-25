
import Button from '@folio/stripes-components/lib/Button';
import Pane from '@folio/stripes-components/lib/Pane';
import Paneset from '@folio/stripes-components/lib/Paneset';
import { connect } from '@folio/stripes-connect';
import React from 'react';
import { Row, Col } from '@folio/stripes-components/lib/LayoutGrid';
import { FormattedMessage } from 'react-intl';
import PaneMenu from '@folio/stripes-components/lib/PaneMenu';
import IconButton from '@folio/stripes-components/lib/IconButton';
import PrinterProvider from '../Core/Provider/MARCcatPrinter';
import s from '../Theme/override.css';
import css from '../Search/style/Search.css';
import * as C from '../Utils';

const mainIndexResults = require('../../config/static/main-index-list');
const secondaryIndexResults = require('../../config/static/secondary-index-list');

// function printDiv(divName, anotherDivName) {
//   const printContentsMain = document.getElementById(divName).innerHTML;
//   const printContentsSecondary = document.getElementById(anotherDivName).innerHTML;
//   const originalContents = document.body.innerHTML;
//   document.body.innerHTML = `--------------------------------------------------------------- MAIN INDEXES ---------------------------------------------------------------${printContentsMain}---------------------------------------------------------- SECONDARY INDEXES ----------------------------------------------------------${printContentsSecondary}`;
//   window.print();
//   document.body.innerHTML = originalContents;
// }

class IndexList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <Paneset static >
        <Pane
          defaultWidth="100%"
          paneTitle="INDEX GUIDE"
        >
          <PrinterProvider
            trigger={() => <IconButton title="Print" key="icon-gear" icon="duplicate" className={css.stripes__icon} />}
            content={() => (this.componentRef)}
          />
          <div ref={(el) => this.componentRef = el} >

            <Col xs={6} id="main" className={s.CustomDivTableContainer} >
              <h1><b>Main Indexes</b></h1>
              {
                mainIndexResults.map((dynamicMainData) => (
                  <table style={{ paddingTop: '20pt' }}>
                    <thead>
                      <tr>
                        <th colSpan="2"> <p><h4 className={s.CustomIndexesH2}>{dynamicMainData.title}</h4></p></th>
                      </tr>
                    </thead>
                    {
                      dynamicMainData.descriptions.map((dynamicMainValues) => (
                        <tbody>
                          <tr className={s.CustomIndexTR}>
                            <td colSpan="1"><b>{dynamicMainValues.key}</b></td>
                            <td colSpan="1">{dynamicMainValues.value}</td>
                          </tr>
                        </tbody>
                      ))
                    }
                  </table>
                ))
              }
            </Col>
            <Col xs={6} id="secondary" className={s.CustomDivTableContainer}>
              <h1><b>Secondary Indexes</b></h1>
              {
                secondaryIndexResults.map((dynamicSecondaryData) => (
                  <table style={{ paddingTop: '20pt' }}>
                    <thead>
                      <tr>
                        <th colSpan="2"> <p><h4 className={s.CustomIndexesH2}>{dynamicSecondaryData.title}</h4></p></th>
                      </tr>
                    </thead>
                    {
                      dynamicSecondaryData.descriptions.map((dynamicMainValues) => (
                        <tbody>
                          <tr className={s.CustomIndexTR}>
                            <td colSpan="1"><b>{dynamicMainValues.key}</b></td>
                            <td colSpan="1">{dynamicMainValues.value}</td>
                          </tr>
                        </tbody>
                      ))
                    }
                  </table>
                ))
              }
            </Col>
          </div>
        </Pane>
      </Paneset>
    );
  }
}
export default connect(IndexList, C.META.MODULE_NAME);
