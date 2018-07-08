import React from 'react';
import PropTypes from 'prop-types';
import { connect } from '@folio/stripes-connect';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {
  Row,
  Col,
} from '@folio/stripes-components/lib/LayoutGrid';
import { Field } from 'redux-form';
import Radio from '@material-ui/core/Radio';
import RadioButtonGroup from '@folio/stripes-components/lib/RadioButtonGroup';
import * as C from '../../../Utils';

class IndexCategory extends React.Component {
  static manifest = Object.freeze({
    indexType: {},
    /* lang: {}, */
    categories: {
      type: C.RESOURCE_TYPE,
      root: C.ENDPOINT.BASE_URL,
      path: 'index-categories?type=%{indexType}&lang=ita',
      headers: { 'x-okapi-tenant': 'tnx' },
      records: C.API_RESULT_JSON_KEY.INDEX_CATEGORIES,
    },
    innerIndexValue: {},
    innerIndexes: {
      type: C.RESOURCE_TYPE,
      root: C.ENDPOINT.BASE_URL,
      path:
        'indexes?categoryType=%{indexType}&categoryCode=%{innerIndexValue}&lang=ita',
      headers: { 'x-okapi-tenant': 'tnx' },
      records: C.API_RESULT_JSON_KEY.INDEX_INNER,
    },
  });

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      firstSelect: '',
      secondSelect: '',
      checkedP: true,
    };
    this.handleChange = this.handleChangeRadio.bind(this);
    this.handleChange = this.handleChangeFirstSelect.bind(
      this
    );
    this.handleChange = this.handleChangeSecondSelect.bind(
      this
    );
    // default value
    this.props.mutator.indexType.replace('P');
    this.props.mutator.innerIndexValue.replace('2');
  }

  handleClose = () => {
    this.setState({ open: false });
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleChangeRadio = event => {
    this.setState({
      firstSelect: event.target.value,
      checkedP: event.target.value === 'P',
    });
    this.props.mutator.indexType.replace(
      event.target.value
    );
  };

  handleChangeFirstSelect = event => {
    this.setState({
      firstSelect: event.target.value,
    });
    this.props.mutator.innerIndexValue.replace(
      event.target.value
    );
  };

  handleChangeSecondSelect = event => {
    this.setState({
      secondSelect: event.target.value,
    });
  };

  render() {
    const {
      resources: { categories, innerIndexes },
    } = this.props;
    const formatMsg = this.props.stripes.intl.formatMessage;
    let options = {};
    let optionsInnerIndex = {};

    if (categories) {
      options = categories.records.map(element => {
        return (
          <option value={element.value}>
            {element.label}
          </option>
        );
      });
    }

    if (innerIndexes) {
      optionsInnerIndex = innerIndexes.records.map(
        element => {
          return (
            <option value={element.value}>
              {element.label} ({element.value})
            </option>
          );
        }
      );
    }

    return (
      <Row>
        <Col xs={3}>
          <Field
            name="indexRadio"
            component={RadioButtonGroup}
            label={formatMsg({
              id: 'ui-cataloging.search.indexes',
            })}
          >
            <Radio
              label={formatMsg({
                id: 'ui-cataloging.search.primary',
              })}
              id="actingSponsor001"
              value="P"
              checked={this.state.checkedP}
              onChange={this.handleChangeRadio}
              inline
            />
            <Radio
              label={formatMsg({
                id: 'ui-cataloging.search.secondary',
              })}
              id="actingSponsor002"
              value="S"
              checked={!this.state.checkedP}
              onChange={this.handleChangeRadio}
              inline
            />
          </Field>
        </Col>
        <Col xs={3}>
          {categories && (
            <FormControl>
              <Select
                native
                open={this.state.open}
                onClose={this.handleClose}
                onOpen={this.handleOpen}
                value={this.state.firstSelect}
                onChange={this.handleChangeFirstSelect}
                inputProps={{
                  name: 'Category',
                  id: 'demo-controlled-open-select',
                }}
              >
                {options}
              </Select>
            </FormControl>
          )}
        </Col>
        <Col xs={5}>
          {innerIndexes && (
            <FormControl>
              <Select
                native
                open={this.state.open}
                onClose={this.handleClose}
                onOpen={this.handleOpen}
                value={this.state.secondSelect}
                onChange={this.handleChangeSecondSelect}
                inputProps={{
                  name: 'Index',
                  id: 'demo-second-controlled-open-select',
                }}
              >
                {optionsInnerIndex}
              </Select>
            </FormControl>
          )}
        </Col>
      </Row>
    );
  }
}

IndexCategory.propTypes = {
  resources: PropTypes.object.isRequired,
  mutator: PropTypes.shape({
    indexType: PropTypes.shape({
      update: PropTypes.func,
    }),
    categories: PropTypes.shape({
      GET: PropTypes.func,
    }),
    language: PropTypes.shape({
      replace: PropTypes.func,
    }),
  }).isRequired,
};

export default connect(
  IndexCategory,
  C.META.MODULE_NAME
);
