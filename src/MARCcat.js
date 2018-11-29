/**
 * @format
 * @flow
 */
import * as React from 'react';
import Paneset from '@folio/stripes-components/lib/Paneset';
import Pane from '@folio/stripes-components/lib/Pane';
import { FormattedMessage } from 'react-intl';
import { Row, Col } from 'react-flexbox-grid';
import { Icon } from '@folio/stripes-components';
import { injectCommonProp, Props } from './core';
import { SearchPanel } from './components/Search';
import * as C from './utils/Constant';

type P = Props & {};
type S = {
};

/**
 * @module MARCcat
 */
class MARCcat extends React.Component<P, S> {
  myActionMenu = () => {
    return (
      <div>
        <Row>
          <Col xs={2}>
            <Icon icon="diacritic" />
          </Col>
          <Col xs={10}>
            <FormattedMessage id="ui-marccat.diacritic.title" />
          </Col>
        </Row>
        <br />
        <Row>
          <Col xs={2}>
            <Icon icon="indexes" />
          </Col>
          <Col xs={10}>
            <FormattedMessage id="ui-marccat.indexes.title" />
          </Col>
        </Row>
      </div>
    );
  };

  render() {
    const { translate, filterPaneIsVisible, toggleFilterPane, children } = this.props;
    return (
      <Paneset static>
        {filterPaneIsVisible &&
          <Pane
            dismissible
            defaultWidth="18%"
            actionMenu={this.myActionMenu}
            onClose={toggleFilterPane}
            paneTitle={translate({ id: 'ui-marccat.searchAndFilter' })}
            paneSub={C.EMPTY_MESSAGE}
          >
            <SearchPanel {...this.props} />
          </Pane>}
        {...children}
      </Paneset>
    );
  }
}
export default injectCommonProp(MARCcat);
