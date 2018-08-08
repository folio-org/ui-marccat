
/**
 * @format
 * @flow
 */
import React from 'react';
import Pane from '@folio/stripes-components/lib/Pane';
import Paneset from '@folio/stripes-components/lib/Paneset';
import { connect } from '@folio/stripes-connect';
import { Col } from '@folio/stripes-components/lib/LayoutGrid';
import IconButton from '@folio/stripes-components/lib/IconButton';
import PaneMenu from '@folio/stripes-components/lib/PaneMenu';
import { PrinterProvider, ToolbarMenu } from '../../Core/';
import css from '../style/indexes.css';
import * as C from '../../Utils';

const mainIndexResults = require('../../../config/static/main-index-list');
const secondaryIndexResults = require('../../../config/static/secondary-index-list');

type IndexListProps = {
  stripes: Object;
  actionMenuItems: Object;
};

type IndexListState = {
};
class IndexList extends React.Component<IndexListProps, IndexListState> {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const formatMsg = this.props.stripes.intl.formatMessage;
    const printMenu = (
      <PaneMenu {...this.props}>
        <PrinterProvider
          trigger={() => <IconButton title={formatMsg({ id: 'ui-marccat.indexes.print' })} key="icon-gear" icon="print" />}
          content={() => (this.componentRef)}
        />
      </PaneMenu>
    );
    const rightMenu = <ToolbarMenu icon={['bookmark', 'gear']} />;

    return (
      <Paneset static >
        <Pane
          defaultWidth="fill"
          firstMenu={printMenu}
          lastMenu={rightMenu}
          paneTitle={formatMsg({
            id: 'ui-marccat.indexes.title',
          })}
          actionMenuItems={this.props.actionMenuItems}
          paneSub="Index Guide"
          appIcon={{ app: C.META.ICON_TITLE }}
        >
          <div ref={(el) => this.componentRef = el} >
            <Col xs={6} id="main" className={css.CustomDivTableContainer} >
              <h1><b>{formatMsg({ id: 'ui-marccat.indexes.main.title' })}</b></h1>
              {
                mainIndexResults.map((dynamicMainData) => (
                  <table className={css.CustomTableIndexes}>
                    <thead>
                      <tr>
                        <th colSpan="2"> <p><h4 className={css.CustomIndexesH2}>{dynamicMainData.title}</h4></p></th>
                      </tr>
                    </thead>
                    {
                      dynamicMainData.descriptions.map((dynamicMainValues) => (
                        <tbody>
                          <tr className={css.CustomIndexTR}>
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
            <Col xs={6} id="secondary" className={css.CustomDivTableContainer}>
              <h1><b>{formatMsg({ id: 'ui-marccat.indexes.secondary.title' })}</b></h1>
              {
                secondaryIndexResults.map((dynamicSecondaryData) => (
                  <table className={css.CustomTableIndexes}>
                    <thead>
                      <tr>
                        <th colSpan="2"> <p><h4 className={css.CustomIndexesH2}>{dynamicSecondaryData.title}</h4></p></th>
                      </tr>
                    </thead>
                    {
                      dynamicSecondaryData.descriptions.map((dynamicMainValues) => (
                        <tbody>
                          <tr className={css.CustomIndexTR}>
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
