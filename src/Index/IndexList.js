import React from 'react';
import Pane from '@folio/stripes-components/lib/Pane';
import Paneset from '@folio/stripes-components/lib/Paneset';
import { connect } from '@folio/stripes-connect';
import * as C from '../Utils';
import s from '../Theme/override.css';


const mainIndexResults = require('../../config/static/main-index-list')
const secondaryIndexResults = require('../../config/static/secondary-index-list')

const propTypes = {

}


class IndexList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      open: true, // eslint-disable-line react/no-unused-state
    };

  }

  render() {
    return (
      <Paneset
        static
      >
        <Pane
          dismissible
          defaultWidth="100%"
          paneTitle={<h2>INDEX GUIDE</h2>}
        >
          <Paneset static>
            <Pane
              defaultWidth="fill"
              paneTitle={<h3>Main Indexes</h3>}
              paneSub=""
              appIcon={{ app: 'cataloging' }}
            >
              <div>
                {
                  mainIndexResults.map((dynamicData, i) =>
                    <div className={s.CustomDivContentIndexes}>
                      <p><h2 className={s.CustomIndexesH2}>{dynamicData.title}</h2></p>
                      {
                        dynamicData.descriptions.map((dynamicValues, k) =>
                          <div>
                            <span style={{paddingRight: '7pt'}}><b>{dynamicValues.key}</b></span>
                            <span >{dynamicValues.value}</span>
                          </div>)
                      }
                      <br />
                      <br />
                    </div>
                  )
                }
              </div>
            </Pane>
            <Pane
              defaultWidth="fill"
              paneTitle={<h3>Secondary Indexes</h3>}
              paneSub=""
              appIcon={{ app: 'cataloging' }}
            >
              <div>
                {
                  secondaryIndexResults.map((dynamicData, i) =>
                    <div className={s.CustomDivContentIndexes} >
                      <p><h2 className={s.CustomIndexesH2}>{dynamicData.title}</h2></p>
                      {
                        dynamicData.descriptions.map((dynamicValues, k) =>
                          <div>
                            <span style={{paddingRight: '7pt'}}><b>{dynamicValues.key}</b></span>
                            <span>{dynamicValues.value}</span>
                          </div>)
                      }
                      <br />
                      <br />
                    </div>
                  )
                }
              </div>
            </Pane>
          </Paneset>
        </Pane>
      </Paneset>
    );
  }
}
IndexList.propTypes = propTypes;

export default connect(IndexList, C.META.MODULE_NAME)