/**
 * @format
 * @flow
 */
import * as React from 'react';
import Paneset from '@folio/stripes-components/lib/Paneset';
import Pane from '@folio/stripes-components/lib/Pane';
import { AccordionSet, Accordion } from '@folio/stripes-components/lib/Accordion';
import InfoPopover from '@folio/stripes-components/lib/InfoPopover';
import { Row, Col } from 'react-flexbox-grid';
import PropTypes from 'prop-types';
import { LogicalView } from '../DB';
import { injectCommonProp } from '../Core';
import type Props from '../Core/type/props';
import { actionMenuItem, EmptyMessage } from '../Lib';
import SearchEngine from '../Search/SearchEngine';
import SearchSelectFields from '../Mock/SearchSelectFields';
import SearchConditions from '../Mock/SearchConditions';


type P = Props & {};
type S = {
  filterPaneIsVisible: bool;
};

/**
 * @module MARCcat
 */
class MARCcat extends React.Component<P, S> {
  static contextTypes = {
    store: PropTypes.object,
  };
  constructor(props:P) {
    super(props);
    this.state = {
      filterPaneIsVisible: true,
    };
    this.toggleFilterPane = this.toggleFilterPane.bind(this);
  }

  toggleFilterPane = () => {
    this.setState(prevState => ({ filterPaneIsVisible: prevState.filterPaneIsVisible }));
  }

  render() {
    const { okapi } = this.context.store.getState();
    console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', okapi);
    const { translate } = this.props;
    const { filterPaneIsVisible } = this.state;
    const actionMenuItems = actionMenuItem(['ui-marccat.indexes.title', 'ui-marccat.diacritic.title']);
    return (
      <Paneset static>
        {filterPaneIsVisible &&
          <Pane
            id="pane-filter"
            dismissible
            actionMenuItems={actionMenuItems}
            defaultWidth="25%"
            paneTitle={translate({ id: 'ui-marccat.searchAndFilter' })}
            onClose={this.toggleFilterPane}
          >
            <Row>
              <Col xs={11}>
                <LogicalView
                  label={translate({ id: 'ui-marccat.database.label' })}
                  {...this.props}
                />
              </Col>
              <Col xs={1}>
                <InfoPopover
                  content="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                  buttonLabel="Read more"
                  buttonHref="https://wiki.folio.org/"
                  buttonTarget="_blank"
                />
              </Col>
            </Row>
            <AccordionSet>
              <Accordion label={translate({ id: 'ui-marccat.navigator.search' })}>
                <SearchSelectFields />
                <SearchConditions />
                <SearchEngine {...this.props} />
              </Accordion>
            </AccordionSet>
          </Pane>}
        <EmptyMessage {...this.props} />
      </Paneset>
    );
  }
}

export default injectCommonProp(MARCcat);

