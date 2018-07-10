/**
 * @format
 * @flow
 */
import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  root: {
    display: 'flex',
    width: '100%',
    position: 'absolute',
    justifyContent: 'center',
    top: '50%',
  },
  progress: {
    width: '80%',
    borderRadius: '6px',
    boxShadow:
      'inset 0 1px 2px rgba(0, 0, 0, 0.25), 0 1px rgba(255, 255, 255, 0.08)',
    padding: '1px',
  },
  progressBar: {
    width: 0,
    height: '6px',
    borderRadius: '9px',
    boxShadow:
      'inset 0 1px 2px rgba(0, 0, 0, 0.25), 0 1px rgba(255, 255, 255, 0.08)',
    backgroundColor: 'rgb(225, 0, 80);',
  },
};
@withStyles(styles)
class PreloaderCataloging extends React.Component {
  animate = () => {
    const elem = document.getElementById('bar');
    let width = 0.1;
    const id = setInterval(frame, 1); // eslint-disable-line no-use-before-define
    function frame() {
      if (width >= 100) {
        clearInterval(id);
      } else {
        width++;
        elem.style.width = width + '%';
      }
    }
  };

  runAnimation = () => {
    setTimeout(() => {
      this.animate();
    }, 2000);
  };

  async callback() {
    await this.runAnimation();
  }

  render() {
    const { classes } = this.props;
    this.callback();
    return (
      <div className={classes.root}>
        <div className={classes.progress}>
          <div id="bar" className={classes.progressBar} />
        </div>
      </div>
    );
  }
}
export default PreloaderCataloging;
