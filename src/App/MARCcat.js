/**
 * @format
 * @flow
 */
import * as React from 'react';
import Paneset from '@folio/stripes-components/lib/Paneset';
import Pane from '@folio/stripes-components/lib/Pane';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { LogicalView } from '../DB';
import { injectCommonProp, actionMenuItem, EmptyMessage } from '../Core';
import { fetchLogicalViewAction } from '../Redux/actions/ActionCreator';
import { ActionTypes } from '../Redux/actions/Actions';
import SearchEngine from '../Search/SearchEngine';

type Props = {
  translate: (o:Object) => string;
  children: any;
  store: Object;
};
type State = {
  filterPaneIsVisible: bool;
};

/**
 * @module MARCcat
 */
class MARCcat extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      filterPaneIsVisible: true,
    };
    this.toggleFilterPane = this.toggleFilterPane.bind(this);
  }


  componentDidMount() {
    const { store } = this.props;
    const { FETCH_LOGICAL_VIEWS } = ActionTypes;
    store.dispatch({ type: FETCH_LOGICAL_VIEWS });
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
        { filterPaneIsVisible &&
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
            <SearchEngine {...this.props} />
          </Pane>}
        <EmptyMessage {...this.props} />
      </Paneset>
    );
  }
}
const mapStateToProps = state => ({ ...state });

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    fetchLogicalViewAction
  }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(injectCommonProp(MARCcat));

