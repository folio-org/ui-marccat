import React, { Component } from 'react';
import { connect } from '@folio/stripes-connect';
import MultiColumnList from '@folio/stripes-components/lib/MultiColumnList';
import Icon from '@folio/stripes-components/lib/Icon';
import Paneset from '@folio/stripes-components/lib/Paneset';
import Pane from '@folio/stripes-components/lib/Pane';
import * as C from '../../../Utils';

type MultiColumnListBrowsingProps = {
    stripes: Object;
    resources: Object;
    query: string;
};

type MultiColumnListBrowsingState = {

};

class MultiColumnListBrowsing extends Component
    <MultiColumnListBrowsingProps, MultiColumnListBrowsingState> {
  static manifest = Object.freeze({
    query: {},
    firstPage: {
      type: C.RESOURCE_TYPE,
      root: C.ENDPOINT.BASE_URL,
      path: `first-page?mainLibrary=170&view=1&query=%{query}&lang=${C.ENDPOINT.DEFAULT_LANG}`,
      headers: C.ENDPOINT.HEADERS,
      records: C.API_RESULT_JSON_KEY.BROWSING,
      accumulate: true,
      fetch: false
    },
  });


  constructor(props: MultiColumnListBrowsingProps) {
    super(props);
    this.state = {
    };
    /** bind handler **/
  }

  render() {
    const { resources: { firstPage } } = this.props;
    if (!firstPage || !firstPage.hasLoaded) return <Icon icon="spinner-ellipsis" />;
    const dataFirstPage = firstPage.records;
    const formatMsg = this.props.stripes.intl.formatMessage;
    // const columnMapping = {
    //   stringText: formatMsg({ id: 'ui-marccat.' }),
    //   character: formatMsg({ id: 'ui-marccat.diacritic.list.character' }),
    //   label: formatMsg({ id: 'ui-marccat.diacritic.list.description' }),
    //   characterSet: formatMsg({ id: 'ui-marccat.diacritic.list.charset' }),
    //   unicode: formatMsg({ id: 'ui-marccat.diacritic.list.unicode' }),
    // };
    return (
      <Paneset static>
        <Pane
          paneTitle={formatMsg({ id: 'ui-marccat.browsing.title' })}
          paneSub={formatMsg({ id: 'ui-marccat.browsing.subtitle' }) + (this.props.resources.query)}
          appIcon={{ app: C.META.ICON_TITLE }}
        >
          <MultiColumnList
            onRowClick={this.onRowClick}
            contentData={dataFirstPage}
            visibleColumns={[
              'stringText',
              'accessPointlanguage',
              'countAuthorities',
              'countCrossReferences',
              'countDocuments',
              'countTitleNameDocuments',
              'database',
              'headingNumber',
              'indexingLanguage',
              'verificationlevel'
            ]}
            //   columnMapping={columnMapping}
            columnWidths={{}}
          />
        </Pane>
      </Paneset>
    );
  }
}
export default connect(MultiColumnListBrowsing, C.META.MODULE_NAME);
