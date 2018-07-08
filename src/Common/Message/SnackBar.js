import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import styles from '../Style/SnackBar';

@withStyles(styles)
class SnackBar extends React.Component {
  state = {
    open: true,
  };

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({ open: false });
  };

  render() {
    const {
      classes,
      position,
      authHideDuration,
      message,
    } = this.props;
    return (
      <div>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: position || 'left',
          }}
          open={this.state.open}
          autoHideDuration={authHideDuration || 6000}
          onClose={this.handleClose}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">{message}</span>}
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="#fff"
              className={classes.close}
              onClick={this.handleClose}
            >
              <CloseIcon />
            </IconButton>,
          ]}
        />
      </div>
    );
  }
}

SnackBar.propTypes = {
  classes: PropTypes.object.isRequired,
  position: PropTypes.object,
  authHideDuration: PropTypes.number,
  message: PropTypes.string.isRequired,
};

export default withStyles(styles)(SnackBar);
