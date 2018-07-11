import React from 'react';
import PropTypes from 'prop-types';
import { connect } from '@folio/stripes-connect';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { Row, Col } from '@folio/stripes-components/lib/LayoutGrid';
import { Field } from 'redux-form';
import RadioButtonGroup from '@folio/stripes-components/lib/RadioButtonGroup';
import RadioButton from '@folio/stripes-components/lib/RadioButton';
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
      records: C.API_RESULT_JSON_KEY.INDEX_CATEGORIES
    },
    innerIndexValue: {},
    innerIndexes: {
      type: C.RESOURCE_TYPE,
      root: C.ENDPOINT.BASE_URL,
      path: 'indexes?categoryType=%{indexType}&categoryCode=%{innerIndexValue}&lang=ita',
      headers: { 'x-okapi-tenant': 'tnx' },
      records: C.API_RESULT_JSON_KEY.INDEX_INNER
    },
    constraintIndexValue: {},
    constraintIndexes: {
      type: C.RESOURCE_TYPE,
      root: C.ENDPOINT.BASE_URL,
      headers: { 'x-okapi-tenant': 'tnx' },
      path: 'indexes/%{constraintIndexValue}?lang=ita',
      records: C.API_RESULT_JSON_KEY.CONSTRAINT_INDEX
    }
  });


  constructor(props) {
    super(props);
    this.state = {
      open: false,
      firstSelect: '',
      secondSelect: '',
      thirdSelect: '',
      checkedP: true,
    };
    this.handleChange = this.handleChangeRadio.bind(this);
    this.handleChangeFirstSelect = this.handleChangeFirstSelect.bind(this);
    this.handleChangeSecondSelect = this.handleChangeSecondSelect.bind(this);
    this.handleChangeThirdSelect = this.handleChangeThirdSelect.bind(this);
    // default value
    this.props.mutator.indexType.replace('P');
    this.props.mutator.innerIndexValue.replace('2');
    this.props.mutator.constraintIndexValue.replace('LIB');
  }

  /*
  componentDidMount() {
    this.props.mutator.indexType.replace(this.state.indexTypeValue);
  }
  */


  handleClose = () => {
    this.setState({ open: false });
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  buildPreviewChoosed = () => {

  }

  handleChangeRadio = event => {
    this.setState({
      firstSelect: event.target.value,
      checkedP: (event.target.value === 'P'),
    });
    this.props.mutator.indexType.replace(event.target.value);
    // reset last select
    this.props.mutator.constraintIndexValue.replace('LIB');
  };

  handleChangeFirstSelect = event => {
    this.setState({
      firstSelect: event.target.value,
    });
    this.props.mutator.innerIndexValue.replace(event.target.value);
    // reset last select
    this.props.mutator.constraintIndexValue.replace('LIB');
  };

  handleChangeSecondSelect = event => {
    this.setState({
      secondSelect: event.target.value,
    });
    this.props.mutator.constraintIndexValue.replace(event.target.value);
    this.props.onSelectIndex(event.target.value);
  };

  handleChangeThirdSelect = event => {
    const splitted = event.target.value.split(C.SEPARATOR);    
    this.setState({      
      thirdSelect: event.target.value,
    });
    this.props.onSelectConstraint(splitted[0], splitted[1]);
  };

  render() {
    const { resources: { categories, innerIndexes, constraintIndexes } } = this.props;
    const formatMsg = this.props.stripes.intl.formatMessage;
    let options = {};
    let optionsInnerIndex = {};
    let optionsConstraintIndex = {};

    if (categories) {
      options = categories.records.map((element) => {
        return (
          <option value={element.value}>{element.label}</option>
        );
      });
    }

    if (innerIndexes) {
      optionsInnerIndex = innerIndexes.records.map((element) => {
        return (
          <option value={element.value}>{element.label} ({element.value})</option>
        );
      });
    }

    if (constraintIndexes) {
      optionsConstraintIndex = constraintIndexes.records.map((element) => {
        const valueLabel = element.value  + C.SEPARATOR + element.label 
        return (
          <option value={valueLabel}> {element.label} </option>
        );
      });
    }

    return (
      <Row>
        <Col xs={12}>
          <Field name="indexRadio" component={RadioButtonGroup} label={formatMsg({ id: 'ui-cataloging.search.indexes' })}>
            <RadioButton
              label={formatMsg({ id: 'ui-cataloging.search.primary' })}
              id="actingSponsor001"
              value="P"
              checked={this.state.checkedP}
              onChange={this.handleChangeRadio}
              inline
            />
            <RadioButton
              label={formatMsg({ id: 'ui-cataloging.search.secondary' })}
              id="actingSponsor002"
              value="S"
              checked={!this.state.checkedP}
              onChange={this.handleChangeRadio}
              inline
            />
          </Field>
        </Col>
        <Col xs={3} style={{marginLeft:'20px', marginTop:'20px'}}>
          {categories &&
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
        }
        </Col>
        <Col xs={3} style={{ marginTop:'20px'}}>
          {innerIndexes &&
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
              <option value="">--</option>
              {optionsInnerIndex}
            </Select>
          </FormControl>
          }
        </Col>
        <Col xs={3} style={{ marginTop:'20px'}}>
          {constraintIndexes && constraintIndexes.records.length > 0 &&
          <FormControl>
            <Select
              name="testSelected"
              native
              open={this.state.open}
              onClose={this.handleClose}
              onOpen={this.handleOpen}
              value={this.state.thirdSelect}
              onChange={this.handleChangeThirdSelect}
              inputProps={{
                          name: 'Index',
                          id: 'demo-third-controlled-open-select',
              }}
            >
              <option value="">--</option>
              {optionsConstraintIndex}
            </Select>
          </FormControl>
          }
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


export default connect(IndexCategory, C.META.MODULE_NAME);