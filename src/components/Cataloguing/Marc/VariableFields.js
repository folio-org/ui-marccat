/**
 * @format
 * @flow
 */
import React from 'react';
import { isEmpty } from 'lodash';
import { HotKeys } from '@folio/stripes/components';
import MarcTableList from './MarcTableList';
import type { Props } from '../../../core';
import { EMPTY_MESSAGE } from '../../../utils/Constant';


export default class VariableFields extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props);
    this.state = {
      variableFields: [{ name: EMPTY_MESSAGE }],
    };
    this.keys = {
      'new' : ['enter'],
    };
    this.handlers = {
      'new': () => this.handleAddSearchForm(),
    };
  }


handleAddSearchForm = () => {
  const { variableFields } = this.state;
  this.setState({
    variableFields: variableFields.concat([{ name: '' }])
  });
}

render() {
  const { variableFields } = this.state;
  const { record, editable } = this.props;
  const contentData = [
    {
      tag: (!isEmpty(record)) ? record.code : '000',
      count: '1',
      ref:  '1',
      displayValue: (!isEmpty(record)) ? record.displayValue : ''
    }
  ];
  return (
    <HotKeys keyMap={this.keys} handlers={this.handlers}>
      {!isEmpty(record) && variableFields.map((v, idx) => (
        <MarcTableList
          key={idx}
          id={idx}
          editable={editable}
          contentData={contentData}
          visibleFields={['tag', 'count', 'ref', 'displayValue']}
          columnWidths={{
            'tag':'15%',
            'count': '15%',
            'ref': '15%',
            'displayValue': '50%'
          }}
          columnMapping={{ tag: '', count: '', ref: '', displayValue: '' }}
          actionButtonLabel="Actions"
        />))}
    </HotKeys>
  );
}
}
