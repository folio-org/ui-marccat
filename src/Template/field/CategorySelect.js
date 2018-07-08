import PropTypes from 'prop-types';
import React from 'react';
import {
  Row,
  Col,
} from '@folio/stripes-components/lib/LayoutGrid';
import { withStyles } from '@material-ui/core/styles';
import MultiColumnList from '@folio/stripes-components/lib/MultiColumnList';
import { connect } from '@folio/stripes-connect';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import * as C from '../../Utils';

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
  static manifest = Object.freeze({
    marcCategory: {},
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
      path:
        'heading-types?lang=ita&marcCategory=%{marcCategory}',
      headers: C.ENDPOINT.HEADERS,
      records: C.API_RESULT_JSON_KEY.HEADING_TYPES,
    },
  });

  constructor(props) {
    super(props);
    this.state = {
      firstSelect: '',
      secondSelect: '',
      marcCategoryValue: 1,
      tableContent: this.props.mandatoryField,
      open: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleChangeSource = this.handleChangeSource.bind(
      this
    );
  }

  componentDidMount() {
    this.props.mutator.marcCategory.replace(
      this.state.marcCategoryValue
    );
  }

  handleChange = event => {
    this.setState({
      firstSelect: event.target.value,
    });
    this.props.mutator.marcCategory.replace(
      event.target.value
    );
  };

  handleChangeSource = event => {
    this.setState({ secondSelect: event.target.value });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  handleOpen = () => {
    this.setState({ open: true });
  };

  buildPreviewChoosed = () => {};

  render() {
    const {
      classes,
      resources: { marcCategories, heading },
    } = this.props;
    if (!marcCategories || !marcCategories.hasLoaded) {
      return <div />;
    }
    if (!heading || !heading.hasLoaded) return <div />;

    let options = {};
    let headings = {};
    if (marcCategories) {
      options = marcCategories.records.map(element => {
        return (
          <option value={element.value}>
            {element.label}
          </option>
        );
      });
    }
    if (heading) {
      headings = heading.records.map(element => {
        return (
          <option value={element.value}>
            {element.label}
          </option>
        );
      });
    }
    return (
      <div>
        <Row id="section-table">
          <MultiColumnList
            contentData={this.state.tableContent}
            onRowClick={() => {}}
            visibleColumns={[
              'categoryCode',
              'headerTypeCode',
              'code',
              'displayValue',
              'description',
            ]}
            ariaLabel="TemplateNewMandatory"
          />
        </Row>
        <p>
          Default value:{' '}
          <strong>
            {this.props.defaultValue.description}{' '}
            {this.props.defaultValue.displayValue}
          </strong>
        </p>
        <Row>
          <Col xs={12}>
            <FormControl className={classes.formControl}>
              <Select
                native
                open={this.state.open}
                onClose={this.handleClose}
                onOpen={this.handleOpen}
                value={this.state.firstSelect}
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
                value={this.state.secondSelect}
                onChange={this.handleChangeSource}
                inputProps={{
                  name: 'Source',
                  id: 'demo-controlled-open-select',
                }}
              >
                {headings}
              </Select>
            </FormControl>
          </Col>
        </Row>
      </div>
    );
  }
}

CategorySelect.propTypes = {
  resources: PropTypes.shape({
    query: PropTypes.object,
    heading: PropTypes.shape({
      GET: PropTypes.func,
    }),
  }),
  stripes: PropTypes.object,
  mutator: PropTypes.shape({
    heading: PropTypes.shape({
      GET: PropTypes.func,
    }),
  }),
  classes: PropTypes.object,
  categories: PropTypes.object,
  headings: PropTypes.object,
  marcCategory: PropTypes.number,
};

export default withStyles(styles)(
  connect(
    CategorySelect,
    C.META.MODULE_NAME
  )
);
