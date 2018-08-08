/**
 * @format
 * @flow
 */
import React from 'react';
import MultiColumnList from '@folio/stripes-components/lib/MultiColumnList';

type CurrentTagDisplayProps = {
    currentTag: Object
};

type CurrentTagDisplayState = {};

class CurrentTagDisplay extends React.Component<CurrentTagDisplayProps, CurrentTagDisplayState> {
  render() {
    const columnMapping = {
      code: '',
      description: '',
      ind1: '',
      ind2: '',
      displayValue: ''
    };
    const currentTag = [];
    currentTag.push(this.props.currentTag);

    return (
      <MultiColumnList
        contentData={currentTag}
        columnMapping={columnMapping}
        visibleColumns={[
          'code',
          'description',
          'ind1',
          'ind2',
          'displayValue',
        ]}
        columnWidths={{ code: '10%', description: '40%', ind1: '5%', ind2: '5%', displayValue: '40%' }}
      />
    );
  }
}

export default CurrentTagDisplay;
