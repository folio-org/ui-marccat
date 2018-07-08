import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';

type SelectProps<T> = {|
  id: string,
  native: boolean,
  label: string,
  placeholder: string,
  options: Array<T>,
  classes: Object,
|};

type SelectState = {|
  value: string,
|};

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  menu: {
    width: 200,
  },
});

class Select<T: Array<*>> extends React.Component<
  SelectProps<T>,
  SelectState
> {
  state = {
    currency: 'EUR',
  };
  constructor(props) {
    // eslint-disable-line  no-useless-constructor
    super(props);
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  render() {
    const currencies = [
      {
        value: 'USD',
        label: '$',
      },
      {
        value: 'EUR',
        label: '€',
      },
      {
        value: 'BTC',
        label: '฿',
      },
      {
        value: 'JPY',
        label: '¥',
      },
    ];
    const {
      id,
      native,
      classes,
      label,
      placeholder,
    } = this.props;
    return (
      <TextField
        id={id}
        select
        label={label}
        className={classes.textField}
        value={this.state.currency}
        onChange={this.handleChange('currency')}
        SelectProps={{
          native: false,
          MenuProps: {
            className: classes.menu,
          },
        }}
        helperText={placeholder}
        margin="normal"
      >
        {!native &&
          currencies.map(option => (
            <MenuItem
              key={option.value}
              value={option.value}
            >
              {option.label}
            </MenuItem>
          ))}
        {native &&
          currencies.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
      </TextField>
    );
  }
}

export default withStyles(styles)(Select);
