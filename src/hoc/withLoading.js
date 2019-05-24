// @flow
import * as React from 'react';
import compose from 'recompose/compose';
import defaultProps from 'recompose/defaultProps';
import loadingStyles from '../styles/loading.css';

export const Loading = ({ styles, text }) => (
  <div className={styles.main}>
    <div className={styles.spinner} />
    <div className={styles.text}>{text}</div>
  </div>
);

export default compose(
  defaultProps({
    styles: loadingStyles,
    text: 'Loading...',
  })
)(Loading);
