/**
 * @format
 * @flow
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import CheckIcon from '@material-ui/icons/Check';
import SaveIcon from '@material-ui/icons/Save';
import { stylesFabProgress as styles} from '../Style/Button';
import SnackBar from '../Message/SnackBar';

@withStyles(styles)
class FabSaveProgress extends React.Component {
  timer = null;

  state = {
    loading: false,
    success: false,
    showSnack: false
  };

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  handleButtonClick = () => {
    if (!this.state.loading) {
      this.setState(
        {
          success: false,
          loading: true,
        },
        () => {
          this.timer = setTimeout(() => {
            this.setState({
              loading: false,
              success: true,
              showSnack: true
            });

          }, 2000);
        },
      );
    }
  };

  render() {
    const { loading, success } = this.state;
    const { classes, message, onClose } = this.props;
    const buttonClassname = classNames({
      [classes.buttonSuccess]: success,
    });

    return (
      <div className={classes.root}>
        <div className={classes.wrapper}>
          <Button
            variant="fab"
            color="primary"
            className={buttonClassname}
            onClick={this.handleButtonClick}
          >
            {success ? <CheckIcon /> : <SaveIcon />}
          </Button>
          {loading && <CircularProgress size={68} className={classes.fabProgress} />}
        </div>
        { this.state.showSnack &&
        <SnackBar message={message} onClose={onClose} />
        }
      </div>
    );
  }
}

FabSaveProgress.propTypes = {
  classes: PropTypes.object.isRequired
};

export default FabSaveProgress;