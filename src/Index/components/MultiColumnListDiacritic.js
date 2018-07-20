import React, { Component } from 'react';
import MultiColumnList from '@folio/stripes-components/lib/MultiColumnList';
import Icon from '@folio/stripes-components/lib/Icon';
import { connect } from '@folio/stripes-connect';
import * as C from '../../Utils';

type MultiColumnListDiacriticProps = {
    stripes: Object;
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
      };
      /** bind handler **/
    }


    render() {
      const { resources: { views } } = this.props;
      if (!views || !views.hasLoaded) return <Icon icon="spinner-ellipsis" />;
      const data = views.records;
      return (
        <MultiColumnList
          contentData={data}
          visibleColumns={[
            'value',
            'character',
            'label',
            'characterSet',
            'unicode']}
        />
      );
    }
}
export default connect(MultiColumnListDiacritic, C.META.MODULE_NAME);
