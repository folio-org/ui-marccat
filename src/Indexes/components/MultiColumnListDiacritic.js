import React, { Component } from 'react';
import MultiColumnList from '@folio/stripes-components/lib/MultiColumnList';
import Icon from '@folio/stripes-components/lib/Icon';
import { connect } from '@folio/stripes-connect';
import * as C from '../../Utils';

type MultiColumnListDiacriticProps = {
  stripes: Object;
  resources: Object;
  onRowClick: Function,
};

type MultiColumnListDiacriticState = {
  value: string;
  charCopied: string;
  isOpen: boolean;
};

class MultiColumnListDiacritic extends Component
  <MultiColumnListDiacriticProps, MultiColumnListDiacriticState> {
  static manifest = Object.freeze({
    views: {
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
      charCopied: '',//eslint-disable-line
    };
    /** bind handler **/
  }

  render() {
    const { resources: { views } } = this.props;
    if (!views || !views.hasLoaded) return <Icon icon="spinner-ellipsis" />;
    const data = views.records;
    const formatMsg = this.props.stripes.intl.formatMessage;
    const columnMapping = {
      value: formatMsg({ id: 'ui-marccat.diacritic.list.id' }),
      character: formatMsg({ id: 'ui-marccat.diacritic.list.character' }),
      label: formatMsg({ id: 'ui-marccat.diacritic.list.description' }),
      characterSet: formatMsg({ id: 'ui-marccat.diacritic.list.charset' }),
      unicode: formatMsg({ id: 'ui-marccat.diacritic.list.unicode' }),
    };
    return (
      <MultiColumnList
        onRowClick={this.props.onRowClick}
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
    );
  }
}
export default connect(MultiColumnListDiacritic, C.META.MODULE_NAME);
