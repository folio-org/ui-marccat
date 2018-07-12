import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  overrides: {
    MuiDialogContentText: {
      root: {
        fontFamily: '.AppleSystemUIFont',
        fontSize: '11px',
        color: 'rgba(0,0,0,0.62)',
        letterSpacing: '0.31px',
        textAlign: 'center',
      },
    },
    MuiDialogTitle: {
      root: {
        padding: '24px 24px 0px',
      },
    },
    MuiBackdrop: {
      root: {
        backgroundColor: 'rgba(0, 0, 0, .75)',
        boxShadow: '0 5px 28px 1px rgba(0, 0, 0, 0.75)',
      },
    },
    MuiDialog: {
      paperWidthSm: {
        maxWidth: '400px',
      },
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
    margin: '20px',
  },
  version: {
    fontFamily: '.AppleSystemUIFont',
    fontSize: '14px',
    color: '#616161',
    letterSpacing: '0.4px',
    textAlign: 'center',
  },
  credits: {
    fontFamily: '.AppleSystemUIFont',
    fontSize: '12px',
    color: 'rgba(0,0,0,0.62)',
    letterSpacing: '0.34px',
    textAlign: 'center',
  },
};

export { theme, styles };
