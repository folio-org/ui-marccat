/* @flow */
import React from 'react';
import { connect } from '@folio/stripes-connect';
import Pane from '@folio/stripes-components/lib/Pane';
import Paneset from '@folio/stripes-components/lib/Paneset';
import PaneMenu from '@folio/stripes-components/lib/PaneMenu';
import IconButton from '@folio/stripes-components/lib/IconButton';
import AdvancedSearchForm from './form/AdvancedSearchForm';
import { SearchProps, SearchState } from '../type';
import IntegrationReactSelect from '../../LogicalView/Select';
import css from '../Search.css';
import * as C from '../../Utils';

class AdvancedSearch extends React.Component<SearchProps, SearchState> {

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
        params: { lang: C.ENDPOINT.DEFAULT_LANG, type: 'P' },
      },
    }
  });

  handleClose() {
    this.props.history.goBack();
  }

  render() {
    const formatMsg = this.props.stripes.intl.formatMessage;

    const lastMenu = (
      <PaneMenu className={css.icon_plus} {...this.props}>
        <IconButton key="icon-gear" icon="gear" />
        <IconButton key="icon-plus-sign" icon="plus-sign" className={css.icon_plus} />
      </PaneMenu>
    );

    const actionMenuItems = [
      {
        label: formatMsg({ id: 'ui-cataloging.template.create' }),
        onClick: () => {
          this.props.history.goBack();
        },
      }
    ];
    return (
      <Paneset static>
        <Pane
          dismissible
          onClose={() => { return this.props.history.goBack(); }}
          actionMenuItems={actionMenuItems}
          lastMenu={lastMenu}
          defaultWidth="fill"
          paneSub="search result"
          appIcon={{ app: 'cataloging' }}
          paneTitle={formatMsg({ id: 'ui-cataloging.navigator.search' })}
        >
          <AdvancedSearchForm {...this.props} initialValues={{}} />
          <IntegrationReactSelect />
        </Pane>
      </Paneset>
    );
  }
}
export default connect(AdvancedSearch, C.META.MODULE_NAME);
