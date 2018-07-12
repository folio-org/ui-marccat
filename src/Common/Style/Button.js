import green from '@material-ui/core/colors/green';

export const stylesFabProgress = theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  cssRoot: {
    backgroundColor: 'blue',
    '&:hover': {
      backgroundColor: 'blue',
    },
  },
  wrapper: {
    margin: theme.spacing.unit,
    position: 'relative',
    marginTop: 50,
  },
  buttonSuccess: {
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
  },
  fabProgress: {
    color: green[500],
    position: 'absolute',
    top: -6,
    left: -6,
    zIndex: 1,
  },
});
