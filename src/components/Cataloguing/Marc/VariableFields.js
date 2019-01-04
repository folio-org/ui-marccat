/**
 * @format
 * @flow
 */
import React from 'react';
import { HotKeys } from '@folio/stripes/components';
import { isEmpty } from 'lodash';
import MarcTableList from './MarcTableList';
import type { Props } from '../../../core';


export default class VariableFields extends React.Component<Props, {}> {
  constructor(props) {
    super(props);
    this.keys = {
      'new' : ['enter'],
    };
    this.handlers = {
      'new': this.handleAdd,
    };
  }

  render() {
    const { record } = this.props;
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
        {!isEmpty(record) &&
        <MarcTableList
          contentData={contentData}
          visibleFields={['tag', 'count', 'ref', 'displayValue']}
          columnMapping={{ tag: 'tag', count: 'count', ref: 'ref', displayValue: 'displayValue' }}
          actionButtonLabel="Actions"
        />}
      </HotKeys>
    );
  }
}
