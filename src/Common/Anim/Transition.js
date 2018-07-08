import React from 'react';
import { Slide, Fade } from '@material-ui/core/';

export const CSS3Slide = props => {
  return <Slide direction={props.direction} {...props} />;
};

export const CSS3Fade = props => {
  return <Fade {...props} />;
};
