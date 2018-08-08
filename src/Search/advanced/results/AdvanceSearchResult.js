import React from 'react';
import Icon from '@folio/stripes-components/lib/Icon';

type Props = {
    resources: Object;
};

export default class AdvanceSearchResult extends React.Component<Props, {}> {
  render() {
    const { resources: { searchQuery } } = this.props;
    if (!searchQuery || !searchQuery.hasLoaded) return <Icon icon="spinner-ellipsis" />;
    return (
      <Icon icon="spinner-ellipsis" />
    );
  }
}
