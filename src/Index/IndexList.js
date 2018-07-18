
import React from 'react';
import Pane from '@folio/stripes-components/lib/Pane';
import Paneset from '@folio/stripes-components/lib/Paneset';
import { FormattedMessage } from 'react-intl';
import Button from '@folio/stripes-components/lib/Button';
import { connect } from '@folio/stripes-connect';
import * as C from '../Utils';
import s from '../Theme/override.css';

type IndexListProps = {
};

type IndexListState = {
  open: boolean;
}
const mainIndexResults = require('../../config/static/main-index-list');
const secondaryIndexResults = require('../../config/static/secondary-index-list');

function printDiv(divName, anotherDivName) {
  const printContentsMain = document.getElementById(divName).textContent;// eslint-disable-lines
  const printContentsSecondary = document.getElementById(anotherDivName).textContent;
  const originalContents = document.body.textContent;
  document.body.textContent = `--------------------------------------------------------------- MAIN INDEXES ---------------------------------------------------------------" + printContentsMain + "---------------------------------------------------------- SECONDARY INDEXES ----------------------------------------------------------${printContentsSecondary}`;
  window.print();
  document.body.textContent = originalContents;
}

class IndexList extends React.Component<IndexListProps, IndexListState> {
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
        <Pane
          defaultWidth="100%"
          paneTitle="INDEX GUIDE"
        >
          <Button
            onClick={() => printDiv('main', 'secondary')}
            type="button"
            buttonStyle="primary"
            style={{ position: 'absolute', minHeight: '36px' }}
          >
            <FormattedMessage id="Print" />
          </Button>
          <Paneset static>
            <Pane
              defaultWidth="fill"
              paneTitle="Main Indexes"
              appIcon={{ app: 'cataloging' }}
            >
              <div id="main">
                {
                  mainIndexResults.map((dynamicData) =>
                    (<table style={{ float: 'left', width: '50%', paddingTop: '50pt' }}>
                      <thead>
                        <tr>
                          <th colSpan="2"> <p><h2 className={s.CustomIndexesH2}>{dynamicData.title}</h2></p></th>
                        </tr>
                        {
                          dynamicData.descriptions.map((dynamicValues) =>
                            (<tbody>
                              <tr className={s.CustomIndexTR}>
                                <td colSpan="1"><b>{dynamicValues.key}</b></td>
                                <td colSpan="1">{dynamicValues.value}</td>
                              </tr>
                            </tbody>)
                          )}
                      </thead>
                    </table>)
                } 
                <div>
                  <h1 style={{ visibility: 'hidden' }}>MAIN INDEXES</h1>
                </div>
                <div>
                  <h1 style={{ visibility: 'hidden' }}>MAIN INDEXES</h1>
                </div>
                <div>
                  <h1 style={{ visibility: 'hidden' }}>MAIN INDEXES</h1>
                </div>
                <div>
                  <h1 style={{ visibility: 'hidden' }}>MAIN INDEXES</h1>
                </div>
                <div>
                  <h1 style={{ visibility: 'hidden' }}>MAIN INDEXES</h1>
                </div>
                <div>
                  <h1 style={{ visibility: 'hidden' }}>MAIN INDEXES</h1>
                </div>
                <div>
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
                  secondaryIndexResults.map((dynamicData) =>
                    (<table style={{ float: 'left', width: '50%', paddingTop: '50pt' }}>
                      <thead>
                        <tr>
                          <th colSpan="2"> <p><h2 className={s.CustomIndexesH2}>{dynamicData.title}</h2></p></th>
                        </tr>
                        {
                          dynamicData.descriptions.map((dynamicValues) =>
                            (<tbody>
                              <tr className={s.CustomIndexTR}>
                                <td colSpan="1"><b>{dynamicValues.key}</b></td>
                                <td colSpan="1">{dynamicValues.value}</td>
                              </tr>
                            </tbody>))
                        }
                      </thead>
                    </table>))
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
