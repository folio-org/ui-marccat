/* eslint-disable react/no-multi-comp */

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import CancelIcon from '@material-ui/icons/Cancel';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ClearIcon from '@material-ui/icons/Clear';
import Chip from '@material-ui/core/Chip';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import styles from '../Style/Autocomplete';

class Option extends React.Component {
  handleClick = event => {
    this.props.onSelect(this.props.option, event); // eslint-disable-line react/prop-types
  };

  render() {
    const {
      children,
      isFocused,
      isSelected,
      onFocus,
    } = this.props; // eslint-disable-line react/prop-types

    return (
      <MenuItem
        onFocus={onFocus}
        selected={isFocused}
        onClick={this.handleClick}
        component="div"
        style={{
          fontWeight: isSelected ? 500 : 400,
        }}
      >
        {children}
      </MenuItem>
    );
  }
}

function SelectWrapped(props) {
  const { classes, ...other } = props; // eslint-disable-line react/prop-types
  return (
    <Select
      optionComponent={Option}
      noResultsText={
        <Typography>No results found</Typography>
      }
      arrowRenderer={arrowProps => {
        return arrowProps.isOpen ? (
          <ArrowDropUpIcon />
        ) : (
          <ArrowDropDownIcon />
        );
      }}
      clearRenderer={() => <ClearIcon />}
      valueComponent={valueProps => {
        const { value, children, onRemove } = valueProps;

        const onDelete = event => {
          event.preventDefault();
          event.stopPropagation();
          onRemove(value);
        };

        if (onRemove) {
          return (
            <Chip
              tabIndex={-1}
              label={children}
              className={classes.chip}
              deleteIcon={
                <CancelIcon onTouchEnd={onDelete} />
              }
              onDelete={onDelete}
            />
          );
        }

        return (
          <div className="Select-value">{children}</div>
        );
      }}
      {...other}
    />
  );
}

class CatalogingSelect extends React.Component {
  state = {
    single: null, // eslint-disable-line react/no-unused-state
    multi: null, // eslint-disable-line react/no-unused-state
    multiLabel: null,
  };

  handleChange = name => value => {
    this.setState({
      [name]: value,
    });
  };

  render() {
    const {
      classes,
      options,
      label = 'Database',
    } = this.props; // eslint-disable-line react/prop-types

    return (
      <div className={classes.root}>
        <TextField
          fullWidth
          value={this.state.multiLabel}
          onChange={this.handleChange('multiLabel')}
          placeholder="Select logical view"
          name="react-select-chip-label"
          label={label}
          InputLabelProps={{
            shrink: true,
          }}
          InputProps={{
            inputComponent: SelectWrapped,
            inputProps: {
              classes,
              multi: true,
              instanceId: 'react-select-chip-label',
              id: 'react-select-chip-label',
              simpleValue: true,
              options,
            },
          }}
        />
      </div>
    );
  }
}

CatalogingSelect.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CatalogingSelect);
