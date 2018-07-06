/* @flow */
import React from 'react';
import { connect } from '@folio/stripes-connect';
import Pane from '@folio/stripes-components/lib/Pane';
import PaneMenu from '@folio/stripes-components/lib/PaneMenu';
import Paneset from '@folio/stripes-components/lib/Paneset';
import IconButton from '@folio/stripes-components/lib/IconButton';
import * as C from '../../../Utils';
import SimpleSearchForm from './form/SimpleSearchForm';
import type { SearchProps, SearchState } from '../../type';
import css from '../../style/Search.css';

class SimpleSearch extends React.Component<SearchProps, SearchState> {

  /* TO-DO fill this empty manifest */
  static manifest = Object.freeze({
    initializedFilterConfig: { initialValue: false },
    query: { initialValue: {} },
    resultCount: { initialValue: C.INITIAL_RESULT_COUNT },
    recordsSearch: {
    }
  });

  constructor(props) {
    super(props);
    this.state = {};
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
          this.props.history.push(C.INTERNAL_URL.ADD_TEMPLATE);
        },
      }
    ];
    return (
      <Paneset static>
        <Pane
          actionMenuItems={actionMenuItems}
          lastMenu={lastMenu}
          defaultWidth="fill"
          paneSub="search result"
          appIcon={{ app: 'cataloging' }}
          paneTitle={formatMsg({ id: 'ui-cataloging.navigator.simpleSearch' })}
        >
          <SimpleSearchForm {...this.props} initialValues={{}} />
        </Pane>
      </Paneset>
    );
  }
}

export default connect(SimpleSearch, C.META.MODULE_NAME);
