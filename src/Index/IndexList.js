
import Button from '@folio/stripes-components/lib/Button';
import Pane from '@folio/stripes-components/lib/Pane';
import Paneset from '@folio/stripes-components/lib/Paneset';
import { connect } from '@folio/stripes-connect';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import s from '../Theme/override.css';
import * as C from '../Utils';

const mainIndexResults = require('../../config/static/main-index-list');
const secondaryIndexResults = require('../../config/static/secondary-index-list');

function printDiv(divName, anotherDivName) {
  const printContentsMain = document.getElementById(divName).innerHTML;
  const printContentsSecondary = document.getElementById(anotherDivName).innerHTML;
  const originalContents = document.body.innerHTML;
  document.body.innerHTML = `--------------------------------------------------------------- MAIN INDEXES ---------------------------------------------------------------${printContentsMain}---------------------------------------------------------- SECONDARY INDEXES ----------------------------------------------------------${printContentsSecondary}`;
  window.print();
  document.body.innerHTML = originalContents;
}

class IndexList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <Paneset
        static
      >
        <Button
          onClick={() => printDiv('main', 'secondary')}
          type="button"
          buttonStyle="primary"
          style={{ position: 'absolute', minHeight: '36px' }}
        >
          <FormattedMessage id="Print" />
        </Button>
        <Pane
          defaultWidth="100%"
          paneTitle="INDEX GUIDE"
        >
          <Paneset static>
            <Pane
              defaultWidth="fill"
              paneTitle="Main Indexes"
              appIcon={{ app: 'cataloging' }}
            >
              <div id="main">
                {
                  mainIndexResults.map((dynamicMainData) => (
                    <table style={{ float: 'left', width: '50%', paddingTop: '30pt' }}>
                      <thead>
                        <tr>
                          <th colSpan="2"> <p><h2 className={s.CustomIndexesH2}>{dynamicMainData.title}</h2></p></th>
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
                <div >
                  <h1 style={{ visibility: 'hidden' }}>MAIN INDEXES</h1>
                </div>
                <div >
                  <h1 style={{ visibility: 'hidden' }}>MAIN INDEXES</h1>
                </div>
                <div >
                  <h1 style={{ visibility: 'hidden' }}>MAIN INDEXES</h1>
                </div>
                <div >
                  <h1 style={{ visibility: 'hidden' }}>MAIN INDEXES</h1>
                </div>
                <div >
                  <h1 style={{ visibility: 'hidden' }}>MAIN INDEXES</h1>
                </div>
                <div >
                  <h1 style={{ visibility: 'hidden' }}>MAIN INDEXES</h1>
                </div>
                <div >
                  <h1 style={{ visibility: 'hidden' }}>MAIN INDEXES</h1>
                </div>
              </div>
            </Pane>
            <Pane
              defaultWidth="fill"
              paneTitle="Secondary Indexes"
              appIcon={{ app: 'cataloging' }}
            >
              <div id="secondary">
                {
                  secondaryIndexResults.map((dynamicSecondaryData) => (
                    <table style={{ float: 'left', width: '50%', paddingTop: '30pt' }}>
                      <thead>
                        <tr>
                          <th colSpan="2"> <p><h2 className={s.CustomIndexesH2}>{dynamicSecondaryData.title}</h2></p></th>
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
              </div>
            </Pane>
          </Paneset>
        </Pane>
      </Paneset>
    );
  }
}
export default connect(IndexList, C.META.MODULE_NAME);
