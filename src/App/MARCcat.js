/**
 * @format
 * @flow
 */
import * as React from 'react';
import Paneset from '@folio/stripes-components/lib/Paneset';
import Pane from '@folio/stripes-components/lib/Pane';
import { connect } from 'react-redux';
import { LogicalView } from '../DB';
import { injectCommonProp, actionMenuItem, EmptyMessage } from '../Core';
import { fetchLogicalViewAction } from '../Redux/actions/ActionCreator';
import type Props from '../Core/type/props';


type P = Props & {};
type S = {
  filterPaneIsVisible: bool;
};

/**
 * @module MARCcat
 */
class MARCcat extends React.Component<P, S> {
  constructor(props:P) {
    super(props);
    this.state = {
      filterPaneIsVisible: true,
    };
    this.toggleFilterPane = this.toggleFilterPane.bind(this);
  }

  componentDidMount() {
    this.props.onLoad();
  }

  toggleFilterPane = () => {
    this.setState(prevState => ({ filterPaneIsVisible: prevState.filterPaneIsVisible }));
  }

  render() {
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
            <LogicalView
              label={translate({ id: 'ui-marccat.database.label' })}
              {...this.props}
            />
          </Pane>}
        <EmptyMessage {...this.props} />
      </Paneset>
    );
  }
}

export default connect(
  state => ({ ...state }),
  (dispatch /* ownProps*/) => ({
    onLoad: () => dispatch((_ /* getState*/) => {
      dispatch(fetchLogicalViewAction());
    }),
  })
)(injectCommonProp(MARCcat));

