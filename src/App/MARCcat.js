/**
 * @format
 * @flow
 */
import * as React from 'react';
import { Navigator } from '../Navigator';

type MARCcatProps = {
  stripes: Object,
  resources: Object,
  mutator: Object,
};

type MARCcatState = {}

export default class MARCcat extends React.Component<MARCcatProps, MARCcatState> {
  static manifest = Object.freeze({
    query: { initialValue: {} },
  });

  render() {
    return <Navigator {...this.props} />;
  }
}
