import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const styles = theme => ({
  button: {
    display: 'block',
    marginTop: theme.spacing.unit * 2,
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 300,
    paddingBottom: 30,
  },
});

class SimpleSelect extends React.Component {
  state = {
    title: '',
    open: false,
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  renderOptions() {
    return this.props.resources.records.map((dt) => {
      return (
        <MenuItem
          value={dt.code}
        >
          {dt.description}
        </MenuItem>
      );
    });
  }

  render() {
    const { classes, title } = this.props;
    const item = this.props.data;
    let options = <MenuItem>vuoto</MenuItem>;
    if (item) {
      options = item.map((element) => {
        return (
          <MenuItem value={element.code}>{element.description}</MenuItem>
        );
      });
    }
    return (
      <form autoComplete="off">
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="demo-controlled-open-select">{title}</InputLabel>
          <Select
            open={this.state.open}
            onClose={this.handleClose}
            onOpen={this.handleOpen}
            value={this.state.title}
            onChange={this.handleChange}
            inputProps={{
              name: title,
              id: 'demo-controlled-open-select',
            }}
          >
            {options}
          </Select>
        </FormControl>
      </form>
    );
  }
}

SimpleSelect.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  resources: PropTypes.object.isRequired
};

export default withStyles(styles)(SimpleSelect);
