// @flow
import * as React from 'react';
import { compose, defaultProps, withProps } from 'recompose';
import type { HOC } from 'recompose';

type EnhancedComponentProps = {
  text?: string,
  component: HOC<*, EnhancedComponentProps>
};

const baseComponent = ({ component }) => <div>{component}</div>;

const enhance: HOC<*, EnhancedComponentProps> = compose(
  defaultProps({
    text: 'world',
  }),
  withProps(({ text }) => ({
    text: `Hello ${text}`
  }))
);

export default enhance(baseComponent);
