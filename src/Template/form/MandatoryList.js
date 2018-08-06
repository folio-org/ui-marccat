/**
 * @format
 * @flow
 */
import React from 'react';
import MultiColumnList from '@folio/stripes-components/lib/MultiColumnList';
import { connect } from '@folio/stripes-connect';
import { remapMultiArray } from '../../Utils/Mapper';

type CreateTemplateProps = {
    fields: Object
  };
  type CreateTemplateState = {
    currentTemplate: Object;
    leader: String
  };


class MandatoryList extends React.Component<CreateTemplateProps, CreateTemplateState> {
  render() {
    const columnMapping = {
      code: '',
      description: '',
      displayValue: ''
    };
    const obj = remapMultiArray(this.props.fields);
    return (
      <MultiColumnList
        contentData={obj}
        columnMapping={columnMapping}
        visibleColumns={[
          'code',
          'description',
          'displayValue',
        ]}
        ariaLabel="TemplateNewMandatory"
      />
    );
  }
}

export default connect(MandatoryList);
