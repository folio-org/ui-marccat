/**
 * @format
 * @flow
 */
import * as React from 'react';
import { connect } from '@folio/stripes-connect';
import Pane from '@folio/stripes-components/lib/Pane';
import PaneMenu from '@folio/stripes-components/lib/PaneMenu';
import Paneset from '@folio/stripes-components/lib/Paneset';
import IconButton from '@folio/stripes-components/lib/IconButton';
import * as C from '../../Utils';
import SimpleSearchForm from './form/SimpleSearchForm';
import { PrinterProvider } from '../../Core';
import css from '../style/Search.css';

class SimpleSearch extends React.Component<*, *> {
  /* TO-DO fill this empty manifest */
  static manifest = Object.freeze({
    initializedFilterConfig: { initialValue: false },
    query: { initialValue: {} },
    resultCount: { initialValue: C.INITIAL_RESULT_COUNT },
    recordsSearch: {},
  });

  constructor(props) {
    super(props);
    this.state = {};
  }

  testPrint = () => {

  };

  render() {
    const formatMsg = this.props.stripes.intl.formatMessage;
    const lastMenu = (
      <PaneMenu className={css.icon_plus} {...this.props}>
        <PrinterProvider
          trigger={() => <IconButton key="icon-gear" icon="gear" className={css.stripes__icon} />}
          content={() => this.componentRef}
        />
        <IconButton key="icon-gear" icon="gear" className={css.custom_svg} />
        <IconButton key="icon-plus-sign" icon="plus-sign" className={css.stripes__icon} />
      </PaneMenu>
    );

    const actionMenuItems = [
      {
        label: formatMsg({
          id: 'ui-marccat.template.create',
        }),
        onClick: () => {
          this.props.history.push(C.INTERNAL_URL.ADD_TEMPLATE);
        },
      },
    ];
    return (
      <Paneset static ref={(el) => this.componentRef = el}>
        <Pane
          actionMenuItems={actionMenuItems}
          lastMenu={lastMenu}
          defaultWidth="fill"
          paneSub="search result"
          appIcon={{ app: C.META.ICON_TITLE }}
          paneTitle={formatMsg({
            id: 'ui-marccat.navigator.simpleSearch',
          })}
        >
          <SimpleSearchForm {...this.props} initialValues={{}} />
        </Pane>
      </Paneset>
    );
  }
}

export default connect(
  SimpleSearch,
  C.META.MODULE_NAME,
);
