import React from 'react';
import PropTypes from 'prop-types';
import { connect } from '@folio/stripes-connect';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { Row, Col } from '@folio/stripes-components/lib/LayoutGrid';
import { Field, reduxForm } from 'redux-form';
import RadioButtonGroup from '@folio/stripes-components/lib/RadioButtonGroup';
import RadioButton from '@folio/stripes-components/lib/RadioButton';
import { FormattedMessage } from 'react-intl';
import * as C from '../../Utils';

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
  });


  constructor(props) {
    super(props);
    this.state = {
      indexTypeValue: 'P',
      open: false,
      firstSelect: '',
    };    
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.props.mutator.indexType.replace(this.state.indexTypeValue);
  }

  handleClose = () => {
    this.setState({ open: false });
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  buildPreviewChoosed = () => {

  }

  handleChange = event => {
    this.setState({
      firstSelect: event.target.value,
    });
    this.props.mutator.indexType.replace(event.target.value);
  };

  render() {

    const formatMsg = this.props.stripes.intl.formatMessage;
    let options = {};

    if (categories) {
      options = categories.records.map((element) => {
        return (
          <option value={element.code}>{element.description}</option>
        );
      });
    }
    
    const { classes, resources: { categories } } = this.props;
    return (      
      <Row>
          <Col xs={3}>
            <Field name="indexRadio" component={RadioButtonGroup} label={formatMsg({ id: 'ui-cataloging.search.indexes' })}>
              <RadioButton
                label={formatMsg({ id: 'ui-cataloging.search.primary' })}
                id="actingSponsor001"
                value="P"
                checked={this.state.indexTypeP}
                onChange={this.handleChange}
                inline
              />
              <RadioButton
                label={formatMsg({ id: 'ui-cataloging.search.secondary' })}
                id="actingSponsor002"
                value="S"
                checked={!this.state.indexTypeP}
                onChange={this.handleChange}
                inline
              />
            </Field>
          </Col>
          <Col xs={6}>
            <FormControl>
                      <Select
                        native
                        open={this.state.open}
                        onClose={this.handleClose}
                        onOpen={this.handleOpen}
                        /* value={this.state.firstSelect} */
                        onChange={this.handleChange}
                        inputProps={{
                          name: 'Category',
                          id: 'demo-controlled-open-selectr',
                        }}
                      >
                        {options}
                      </Select>
            </FormControl>
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
