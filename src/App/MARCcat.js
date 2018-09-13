
/**
 * @format
 * @flow
 */
import * as React from 'react';
import Paneset from '@folio/stripes-components/lib/Paneset';
import Pane from '@folio/stripes-components/lib/Pane';
import Button from '@folio/stripes-components/lib/Button';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { injectCommonProp, EmptyMessage, actionMenuItem } from '../Core';
import { LogicalView } from '../DB';
import { fetchLogicalViewAction, fetchWhiskies } from '../Redux/actions/ActionCreator';

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

  toggleFilterPane = () => {
    this.setState(prevState => ({ filterPaneIsVisible: !prevState.filterPaneIsVisible }));
  }

  render() {
    const { translate, store } = this.props;
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
          </Pane>}
        <Button onClick={() => store.dispatch({ type: 'FETCH_WHISKYS' })}>get logical View</Button>
      </Paneset>
    );
  }
}

const mapStateToProps = state => ({ ...state });

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    fetchWhiskies
  }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(injectCommonProp(MARCcat));

