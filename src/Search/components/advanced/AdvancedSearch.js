/* @flow */
import React from 'react';
import { connect } from '@folio/stripes-connect';
import Pane from '@folio/stripes-components/lib/Pane';
import Paneset from '@folio/stripes-components/lib/Paneset';
import PaneMenu from '@folio/stripes-components/lib/PaneMenu';
import IconButton from '@folio/stripes-components/lib/IconButton';
import AdvancedSearchForm from './form/AdvancedSearchForm';
import { SearchProps, SearchState } from '../../type';
import { RestrictionView } from '../restriction/';
import css from '../../style/Search.css';
import * as C from '../../../Utils';

class AdvancedSearch extends React.Component<
  SearchProps,
  SearchState
> {
  static manifest = Object.freeze({
    query: { initialValue: {} },
    resultCount: { initialValue: C.INITIAL_RESULT_COUNT },
    indexCategories: {
      type: C.RESOURCE_TYPE,
      root: C.ENDPOINT.BASE_URL,
      path: C.ENDPOINT.INDEX_CATEGORY,
      headers: C.ENDPOINT.HEADERS,
      records: 'categories',
      GET: {
        params: {
          lang: C.ENDPOINT.DEFAULT_LANG,
          type: 'P',
        },
      },
    },
  });

  constructor(props) {
    super(props);
    this.state = {
      showRestrictionSettings: false,
    };
    this.connectedRestrictionSettingsView = props.stripes.connect(
      RestrictionView
    );
    this.handleClick = this.handleClick.bind(this);
    this.handleCloseRestrictionPanel = this.handleCloseRestrictionPanel.bind(
      this
    );
  }

  handleClose() {
    this.props.history.goBack();
  }

  handleCloseRestrictionPanel() {
    this.setState({
      showRestrictionSettings: false,
    });
  }

  handleClick() {
    this.setState({
      showRestrictionSettings: true,
    });
  }

  render() {
    const formatMsg = this.props.stripes.intl.formatMessage;

    const lastMenu = (
      <PaneMenu className={css.icon_plus} {...this.props}>
        <IconButton
          key="icon-gear"
          icon="gear"
          onClick={this.handleClick}
        />
        <IconButton
          key="icon-plus-sign"
          icon="plus-sign"
          className={css.icon_plus}
        />
      </PaneMenu>
    );

    const actionMenuItems = [
      {
        label: formatMsg({
          id: 'ui-cataloging.template.create',
        }),
        onClick: () => {
          this.props.history.goBack();
        },
      },
    ];
    return (
      <Paneset static>
        <Pane
          dismissible
          onClose={() => {
            return this.props.history.goBack();
          }}
          actionMenuItems={actionMenuItems}
          lastMenu={lastMenu}
          defaultWidth="fill"
          paneSub="search result"
          appIcon={{ app: 'cataloging' }}
          paneTitle={formatMsg({
            id: 'ui-cataloging.navigator.search',
          })}
        >
          <AdvancedSearchForm
            {...this.props}
            initialValues={{}}
          />
        </Pane>
        {this.state.showRestrictionSettings && (
          <Pane
            defaultWidth="fill"
            paneTitle="Search Settings"
            paneSub="restriction"
            appIcon={{ app: 'cataloging' }}
            dismissible
            onClose={this.handleCloseRestrictionPanel}
          >
            <this.connectedRestrictionSettingsView
              {...this.props}
            />
          </Pane>
        )}
      </Paneset>
    );
  }
}
export default connect(
  AdvancedSearch,
  C.META.MODULE_NAME
);
