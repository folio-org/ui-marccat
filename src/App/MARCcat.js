/**
 * @format
 * @flow
 */
import * as React from 'react';
import { injectCommonProp } from '../Core';
import Navigator from '../Nav';
import type Props from '../Core/type/props';


type P = Props & {};
type S = {
  filterPaneIsVisible: bool;
};

/**
 * @module MARCcat
 */
class MARCcat extends React.Component<P, S> {
  render() {
    return (
      <Navigator {...this.props} />
    );
  }
}

export default injectCommonProp(MARCcat);

