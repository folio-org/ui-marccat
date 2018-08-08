/**
 * @format
 * @flow
 */
import React from 'react';
import MultiColumnList from '@folio/stripes-components/lib/MultiColumnList';
import Icon from '@folio/stripes-components/lib/Icon';
import IconButton from '@folio/stripes-components/lib/IconButton';
import Paneset from '@folio/stripes-components/lib/Paneset';
import PaneMenu from '@folio/stripes-components/lib/PaneMenu';
import Pane from '@folio/stripes-components/lib/Pane';
import { connect } from '@folio/stripes-connect';
import { ToolbarMenu, PrinterProvider } from '../../Core';
import * as C from '../../Utils';

type MultiColumnListDiacriticProps = {
  stripes: Object;
  resources: Object;
  actionMenuItems: Object;
};

type MultiColumnListDiacriticState = {
  value: string;
  charCopied: string;
  isOpen: boolean;
};

class MultiColumnListDiacritic extends React.Component
  <MultiColumnListDiacriticProps, MultiColumnListDiacriticState> {
  static manifest = Object.freeze({
    diacritics: {
      type: C.RESOURCE_TYPE,
      root: C.ENDPOINT.BASE_URL,
      path: C.ENDPOINT.DIACRITIC_LIST_URL,
      headers: C.ENDPOINT.HEADERS,
      records: C.API_RESULT_JSON_KEY.DIACRITIC,
      GET: {
        params: { lang: C.ENDPOINT.DEFAULT_LANG },
      },
    },
  });

  constructor(props: MultiColumnListDiacriticProps) {
    super(props);
    this.state = {
      charCopied: '', // eslint-disable-line react/no-unused-state
    };
    /** bind handler **/
    this.onRowClick = this.onRowClick.bind(this);
  }

  onRowClick = (event) => { // FIX ME
    const evt = new CustomEvent(C.EVENTS.CHAR_COPIED, { detail: event.target.textContent });
    window.dispatchEvent(evt);
  }

  render() {
    const { resources: { diacritics } } = this.props;
    if (!diacritics || !diacritics.hasLoaded) return <Icon icon="spinner-ellipsis" />;
    const data = diacritics.records;
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
    const columnMapping = {
      value: formatMsg({ id: 'ui-marccat.diacritic.list.id' }),
      character: formatMsg({ id: 'ui-marccat.diacritic.list.character' }),
      label: formatMsg({ id: 'ui-marccat.diacritic.list.description' }),
      characterSet: formatMsg({ id: 'ui-marccat.diacritic.list.charset' }),
      unicode: formatMsg({ id: 'ui-marccat.diacritic.list.unicode' }),
    };
    return (
      <Paneset static ref={(el) => this.componentRef = el} >
        <Pane
          defaultWidth="full"
          firstMenu={printMenu}
          lastMenu={rightMenu}
          actionMenuItems={this.props.actionMenuItems}
          paneTitle={formatMsg({
            id: 'ui-marccat.diacritic.title',
          })}
          paneSub={formatMsg({
            id: 'ui-marccat.diacritic.subTitle',
          })}
          appIcon={{ app: C.META.ICON_TITLE }}
        >
          <MultiColumnList
            onRowClick={this.onRowClick}
            contentData={data}
            visibleColumns={[
              'value',
              'character',
              'label',
              'characterSet',
              'unicode']}
            columnMapping={columnMapping}
            columnWidths={{ value: '15%', character: '15%', label: '40%', characterSet: '15%', unicode: '15%' }}
          />
        </Pane>
      </Paneset>
    );
  }
}
export default connect(MultiColumnListDiacritic, C.META.MODULE_NAME);
