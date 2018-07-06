import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import MenuIcon from '@material-ui/icons/Menu';
import SendIcon from '@material-ui/icons/Send';
import NavMenuItem, { searchMenuItem, reportMenuItem, templateMenuItem } from './NavMenu';
import { VersionModal } from '../../Common/';
import Router from '../../router';
import { styles } from '../style/NavStyles';

const pack = require('../../../package');

@withStyles(styles, { withTheme: true })
class NavDrawer extends React.Component {
  state = {
    open: true,
    openModal: false,
  };

  handleClickOpen = () => {
    this.setState({ openModal: true });
  };

  handleClose = () => {
    this.setState({ openModal: false });
  };

  toggleDrawer = () => {
    this.setState({ open: !this.state.open });
  };

  toggleModalVersion = () => {
    this.setState({ openModal: !this.state.openModal });
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Drawer
          variant="permanent"
          classes={{
            paper: classNames(classes.drawerPaper, !this.state.open && classes.drawerPaperClose),
          }}
          open={this.state.open}
        >
          <div className={classes.toolbar}>
            <IconButton onClick={this.toggleDrawer}>
              {this.state.open ? <ChevronLeftIcon /> : <MenuIcon />}
            </IconButton>
          </div>
          <Divider />
          <List subheader={this.state.open && <ListSubheader component="div">Search</ListSubheader>}>{searchMenuItem}</List>
          <Divider />
          <List subheader={this.state.open && <ListSubheader component="div">Report</ListSubheader>}>{reportMenuItem}</List>
          <Divider />
          <List onClick={this.toggleModalVersion} subheader={this.state.open && <ListSubheader component="div">Template</ListSubheader>}>{templateMenuItem}</List>
        </Drawer>
        <main className={classes.content}>
          <VersionModal appTitle={pack.appName} appVersion={pack.version} open={this.state.openModal} onClose={this.handleClose} />
          <Router {...this.props} />
        </main>
      </div>
    );
  }
}

NavDrawer.propTypes = {
  classes: PropTypes.object
};

export default NavDrawer;
