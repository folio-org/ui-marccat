/**
 * @format
 * @flow
 */
import React from 'react';
import type { Props } from '../../core';
import { findParam } from '../../redux';
import { headingAction, RECORD_ACTION } from '.';

type P = {
  callout: Object,
  isEditingMode: boolean
} & Props;


class MarcRecord extends React.Component<P, {}> {
  constructor(props: P) {
    super(props);
    this.state = {
      page: RECORD_ACTION.CREATION_MODE
    };
  }

  componentDidMount() {
    const isCreateNew = findParam('mode');
    if (isCreateNew !== RECORD_ACTION.CREATION_MODE) { this.setState({ page: RECORD_ACTION.EDIT_MODE }); }
  }

  createNewHeading = () => {
    const { dispatch } = this.props;
    dispatch(headingAction);
  };

  render() {
    return (
      <div />
    );
  }
}

export default MarcRecord;
