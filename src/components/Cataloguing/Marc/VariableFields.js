/**
 * @format
 * @flow
 */
import React from 'react';
import {
  HotKeys,
} from '@folio/stripes/components';
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
    const contentData = [{
      tag: 1,
      name: 'Item 1',
    }];
    return (
      <HotKeys keyMap={this.keys} handlers={this.handlers} data-full-width>
        <MarcTableList
          contentData={contentData}
          visibleFields={['tag']}
          columnMapping={{ tag: 'tag' }}
          createButtonLabel="Actions"
        />
      </HotKeys>
    );
  }
}
