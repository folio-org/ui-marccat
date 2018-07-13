/**
 * @format
 * @flow
 */
import * as React from 'react';
import NavDrawer from '../Navigator/components/NavDrawer';

type Props = {
  stripes: Object,
  resources: Object,
  mutator: Object,
};


export default class MARCcat extends React.Component<Props, {}> {

  static manifest = Object.freeze({
    query: { initialValue: {} },
  });

  render() {
    return <NavDrawer {...this.props} />;
  }
}
