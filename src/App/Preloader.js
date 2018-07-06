import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';

const styles = {
  root: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
};

class ProgressMobileStepper extends React.Component {
  state = {
    activeStep: 0,
  };

  handleNext = () => {
    setTimeout(() => {
      this.setState(state => ({
        activeStep: state.activeStep + 1,
      }));
    }, 1000);
  };

  render() {
    const { classes } = this.props;
    this.handleNext();
    return (
      <div>
        <MobileStepper
          variant="progress"
          steps={6}
          position="static"
          activeStep={this.state.activeStep}
          className={classes.root}
        />
      </div>
    );
  }
}

ProgressMobileStepper.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(ProgressMobileStepper);
