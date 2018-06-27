// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import type { RestricionProps, RestricionState } from '../type';

export default class RestrictionView extends Component<RestricionProps, RestricionState> {
  static propTypes = {
    res: PropTypes.string
  }

  render() {
    const res = this.props.res;
    return (
      <div>Restriction</div>
    );
  }
}
