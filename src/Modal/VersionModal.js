/* @flow */
import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { MuiThemeProvider, createMuiTheme, withStyles } from '@material-ui/core/styles';

type VersionModalProps = {|
    appTitle: string;
    appVersion: string;
    classes: Object;
    appIcon: string,
    open: boolean,
    onClose: Function,
    message: string,
    credits: string,
    translate: Function
|}
type VersionModalState = {|
  open: boolean;
|}

const soureImg = require('../../icons/app-modal.svg');

const theme = createMuiTheme({
  overrides: {
    MuiDialogContentText: {
      root: {
        fontFamily: '.AppleSystemUIFont',
        fontSize: '11px',
        color: 'rgba(0,0,0,0.62)',
        letterSpacing: '0.31px',
        textAlign: 'center'
      }
    },
    MuiDialogTitle: {
      root: {
        padding: '24px 24px 0px'
      }
    },
    MuiBackdrop: {
      root: {
        backgroundColor: 'rgba(0, 0, 0, .75)',
        boxShadow: '0 5px 28px 1px rgba(0, 0, 0, 0.75)'
      },
    },
    MuiDialog: {
      paperWidthSm: {
        maxWidth: '400px'
      }
    },
  },
});

const styles = {
  avatar: {
    margin: 10,
  },
  row: {
    display: 'flex',
    justifyContent: 'center',
  },
  title: {
    fontFamily: '.SFNSDisplay',
    fontSize: '36px',
    color: '#000000',
    letterSpacing: '0.4px',
    textAlign: 'center',
    margin: '20px'
  },
  version: {
    fontFamily: '.AppleSystemUIFont',
    fontSize: '14px',
    color: '#616161',
    letterSpacing: '0.4px',
    textAlign: 'center'
  },
  credits: {
    fontFamily: '.AppleSystemUIFont',
    fontSize: '12px',
    color: 'rgba(0,0,0,0.62)',
    letterSpacing: '0.34px',
    textAlign: 'center'
  }
};
@withStyles(styles)
export default class VersionModalApp extends React.Component<VersionModalProps, VersionModalState> {

  state = {
    open: true
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });

  };

  render() {
    const { open, appTitle, appVersion, appIcon, classes, credits, onClose, pippo } = this.props; // eslint-disable-line no-unused-vars
    return (
      <MuiThemeProvider theme={theme}>
        <Dialog
          open={this.state.open}
          keepMounted
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">
            <div className={classes.row}>
              <img src={soureImg} alt="app" />
            </div>
            <p className={classes.title}>{appTitle}</p>
            <p className={classes.version}>{appVersion}</p>
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              <p className={classes.credits}>Credits</p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
            </DialogContentText>
          </DialogContent>
        </Dialog>
      </MuiThemeProvider>
    );
  }
}
