import React from 'react';
import { Slide, Fade } from '@material-ui/core/';

const CSS3Slide = props => {
  return <Slide direction={props.direction} {...props} />;
};

const CSS3Fade = props => {
  return <Fade {...props} />;
};

export { CSS3Slide, CSS3Fade }