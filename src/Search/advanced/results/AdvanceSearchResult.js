import React from 'react';
import MultiColumnList from '@folio/stripes-components/lib/MultiColumnList';
import Icon from '@folio/stripes-components/lib/Icon';

type Props = {
    resources: Object;
};

export default class AdvanceSearchResult extends React.Component<Props, {}> {
  render() {
    const { resources: { searchQuery } } = this.props;
    if (!searchQuery || !searchQuery.hasLoaded) return <Icon icon="spinner-ellipsis" />;

    const data = searchQuery.records;
    const result = data[0].data;
    const evaluator = new XPathEvaluator();
    const results = evaluator.evaluate('//controlfield', document.documentElement, null,
      XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);

    if (results) {
      let node = results.iterateNext();
      while (node) {
        alert(node.tag);
        node = results.iterateNext();
      }
    }

    const parser = new DOMParser();
    const unescaped = unescape(result);
    const xmlDoc = parser.parseFromString(unescaped, 'application/xml'); // eslint-disable-line
    return (
      <MultiColumnList
        id="search-results"
        contentData={{}}
        visibleColumns={[
          'id',
          'amicusNumber',
          'title',
          'name',
          'date',
          'date2',
          'edition',
          'serie',
          'volume',
        ]}
        striped
      />
    );
  }
}
