import React from 'react';
// import MultiColumnList from '@folio/stripes-components/lib/MultiColumnList';
import Icon from '@folio/stripes-components/lib/Icon';
import { Controlfield, Datafield } from '../../../Xslt/XsltMapper';


type Props = {
    resources: Object;
};

export default class AdvanceSearchResult extends React.Component<Props, {}> {
  render() {
    const { resources: { searchQuery } } = this.props;
    if (!searchQuery || !searchQuery.hasLoaded) return <Icon icon="spinner-ellipsis" />;

    const data = searchQuery.records;
    let result;
    data
      .filter(r => r.data !== null)
      .flatMap(d => result = (d.data))
      .map(() => new DOMParser().parseFromString(result, 'application/xml'));
    const doc = new DOMParser().parseFromString(result, 'application/xml');
    const nodeList:NodeList = doc.childNodes;
    const xml = Array.from(nodeList)[0];
    const controlFields = [];
    const dataFields = [];
    [...xml.childNodes].forEach((e) => {
      if (e.nodeName === 'controlfield') {
        controlFields.push(new Controlfield(e.attributes[0].textContent, e.textContent));
      } else {
        dataFields.push(new Datafield(e.attributes[0].textContent, e.textContent));
      }
    });

    return (
      <Icon icon="spinner-ellipsis" />
    );
  }
}
