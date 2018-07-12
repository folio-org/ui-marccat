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
import MailIcon from '@material-ui/icons/Mail';
import SpellCheckIcon from '@material-ui/icons/Spellcheck';
import SearchIcon from '@material-ui/icons/Search';
import NotificationsIcon from '@material-ui/icons/Notifications';
import ZoomOutIcon from '@material-ui/icons/ZoomOut';
import SettingsIcon from '@material-ui/icons/Settings';
import InfoOutlineIcon from '@material-ui/icons/InfoOutline';
import BubbleChartIcon from '@material-ui/icons/BubbleChart';
import FormatAlignLeftIcon from '@material-ui/icons/FormatAlignLeft';
import NavMenuItem from './NavMenu';
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

  temporaryFix = () => {
    // absolutely to remove
    setTimeout(() => {
      let main = document.getElementById('ModuleContainer');
      main.style.overflowY = 'hidden';
    }, 1000);
  };

  render() {
    const { classes } = this.props;
    this.temporaryFix();
    return (
      <div className={classes.root}>
        <Drawer
          variant="permanent"
          classes={{
            paper: classNames(
              classes.drawerPaper,
              !this.state.open && classes.drawerPaperClose
            ),
          }}
          open={this.state.open}
        >
          <div className={classes.toolbar}>
            <IconButton onClick={this.toggleDrawer}>
              {this.state.open ? (
                <ChevronLeftIcon />
              ) : (
                <MenuIcon />
              )}
            </IconButton>
          </div>
          <Divider />
          <List
            subheader={
              this.state.open && (
                <ListSubheader component="div">
                  Search
                </ListSubheader>
              )
            }
          >
            <NavMenuItem
              to={`${this.props.match.path}/simple`}
              label="Simple Search"
            >
              <ZoomOutIcon />
            </NavMenuItem>
            <NavMenuItem
              to={`${this.props.match.path}/advancedSearch`}
              label="Advanced Search"
            >
              <SearchIcon />
            </NavMenuItem>
            <NavMenuItem
              to={`${this.props.match.path}/indexList`}
              label="Indexes List"
            >
              <SpellCheckIcon />
            </NavMenuItem>
            <NavMenuItem
              to={`${this.props.match.path}/diacritic`}
              label="Diacritic"
            >
              <SpellCheckIcon />
            </NavMenuItem>
          </List>
          <Divider />
          <List
            subheader={
              this.state.open && (
                <ListSubheader component="div">
                  Report
                </ListSubheader>
              )
            }
          >
            <NavMenuItem
              {...this.props}
              to={`${this.props.match.path}/report`}
              label="Show Report"
            >
              <BubbleChartIcon />
            </NavMenuItem>
          </List>
          <Divider />
          <List
            subheader={
              this.state.open && (
                <ListSubheader component="div">
                  Template
                </ListSubheader>
              )
            }
          >
            <NavMenuItem
              to={`${this.props.match.path}/templateList`}
              label="Template Management"
            >
              <FormatAlignLeftIcon />
            </NavMenuItem>
          </List>
          <Divider />
          <List
            subheader={
              this.state.open && (
                <ListSubheader component="div">
                  Settings
                </ListSubheader>
              )
            }
          >
            <NavMenuItem
              to={`${this.props.match.path}/mail`}
              label="Email Settings"
            >
              <MailIcon />
            </NavMenuItem>
            <NavMenuItem
              to={`${this.props.match.path}/push`}
              label="Notifications"
            >
              <NotificationsIcon />
            </NavMenuItem>
            <NavMenuItem
              onClick={this.toggleModalVersion}
              to={`${this.props.match.path}/version`}
              label="Info"
            >
              <InfoOutlineIcon />
            </NavMenuItem>
            <NavMenuItem to="/settings" label="Settings">
              <SettingsIcon />
            </NavMenuItem>
          </List>
        </Drawer>
        <main className={classes.content}>
          <VersionModal
            appTitle={pack.appName}
            appVersion={pack.version}
            open={this.state.openModal}
            onClose={this.handleClose}
            credits={pack.compnay}
          />
          <Router {...this.props} />
        </main>
      </div>
    );
  }
}

NavDrawer.propTypes = {
  classes: PropTypes.object,
};

export default NavDrawer;
