import PropTypes from 'prop-types';
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from '@folio/stripes-connect';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import * as C from '../../Utils';

let pippo = '4';

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


class CategorySelect extends React.Component {

    state = {
      title: '',
      currentMarc: '1',
      open: false,
    };

    static manifest = Object.freeze({
      query: {},
      marcCategories: {
        type: C.RESOURCE_TYPE,
        root: C.ENDPOINT.BASE_URL,
        path: C.ENDPOINT.CATEGORY_URL,
        headers: C.ENDPOINT.HEADERS,
        records: C.API_RESULT_JSON_KEY.CATEGORIES,
        params: { lang: 'ita' },
      },
      heading: {
        type: C.RESOURCE_TYPE,
        root: C.ENDPOINT.BASE_URL,
        path: C.ENDPOINT.HEADING_TYPES,
        headers: C.ENDPOINT.HEADERS,
        records: C.API_RESULT_JSON_KEY.HEADING_TYPES,
        GET: {
          params: { lang: 'ita', marcCategory: '4' }
        }
      }
    });

    componentDidMount() {
    }

    componentWillReceiveProps(nextProps) {
      console.log('componentDidUpdate');

    }
    componentDidUpdate = (prevProps, prevState) => {
      console.log('componentDidUpdate')
    };

    handleChange = event => {
      this.setState({ title: event.target.value });
      this.state.currentMarc = event.target.value;
    };
    handleClose = () => {
      this.setState({ open: false });
    };
    handleOpen = () => {
      this.setState({ open: true });
    };
    render() {
      const { classes, resources: { marcCategories, heading } } = this.props;
      if (!marcCategories || !marcCategories.hasLoaded) return <div />;
      if (!heading || !heading.hasLoaded) return <div />;


      let options = {};
      let headings = {};
      if (marcCategories) {
        options = marcCategories.records.map((element) => {
          return (
            <option value={element.code}>{element.description}</option>
          );
        });
      }
      if (heading) {
        headings = heading.records.map((element) => {
          return (
            <option value={element.code}>{element.description}</option>
          );
        });
      }
      return (
        <div>
          <FormControl className={classes.formControl}>
            <Select
              native
              open={this.state.open}
              onClose={this.handleClose}
              onOpen={this.handleOpen}
              value={this.state.title}
              onChange={this.handleChange}
              inputProps={{
            name: 'Category',
            id: 'demo-controlled-open-selectr',
          }}
            >
              {options}
            </Select>
          </FormControl>
          <FormControl className={classes.formControl}>
            <Select
              native
              open={this.state.open}
              onClose={this.handleClose}
              onOpen={this.handleOpen}
              value={this.state.title}
              onChange={this.handleChange}
              inputProps={{
            name: 'Source',
            id: 'demo-controlled-open-select',
          }}
            >
              {headings}
            </Select>
          </FormControl>
        </div>
      );
    }
}

CategorySelect.propTypes = {
  resources: PropTypes.shape({
    query: PropTypes.object,
    heading: PropTypes.shape({
      GET: PropTypes.func.isRequired,
    }),
  }),
  stripes: PropTypes.object,
  mutator: PropTypes.shape({
    query: PropTypes.object.isRequired,
    heading: PropTypes.shape({
      GET: PropTypes.func.isRequired,
    }),
  }),
  classes: PropTypes.object.isRequired,
  categories: PropTypes.object.isRequired,
  headings: PropTypes.object.isRequired,
  marcCategory: PropTypes.number.isRequired,
};

export default withStyles(styles)(connect(CategorySelect, C.META.MODULE_NAME));
