/**
 * @format
 * @flow
 */
import * as React from 'react';
import Navigator from '../Navigator/components/Navigator';

type Props = {
  stripes: Object,
  resources: Object,
  mutator: Object,
};

type State = {}

export default class MARCcat extends React.Component<Props, State> {
  static manifest = Object.freeze({
    query: { initialValue: {} },
  });

  render() {
    return <Navigator {...this.props} />;
  }
}
