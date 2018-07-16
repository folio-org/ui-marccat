import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { connect } from '@folio/stripes-connect';
import _ from 'lodash';
import { Row, Col } from '@folio/stripes-components/lib/LayoutGrid';
import Button from '@folio/stripes-components/lib/Button';
import Select from '@folio/stripes-components/lib/Select';
import CategorySelect from '../field/CategorySelect';
import * as C from '../../Utils/';

class TagForm extends React.Component {
  static propTypes = {
    stripes: PropTypes.shape({
      intl: PropTypes.object.isRequired,
    }).isRequired,
    handleSubmit: PropTypes.func.isRequired,
    defaultValue: PropTypes.object.isRequired,
  };

  getInitialState() {
    return {
      inputs: [0, 1],
    };
  }

  componentDidMount() {
    this.props.initialize({
      lang: C.ENDPOINT.DEFAULT_LANG,
      firstArgs: this.props.defaultValue.displayValue.split('$a')[1],
    });
  }

  constructor(props) {
    super(props);
    this.state = {
      inputs: [0],
    };
    this.handleForm = this.handleForm.bind(this);
    this.appendItem = this.appendItem.bind(this);
    this.onCancel = this.onCancel.bind(this);
  }

  onCancel() {
    this.setState({ inputs: this.state.inputs.splice(0, this.state.inputs.length - 1) });
  }
  appendItem() {
    const newInput = `input-${this.state.inputs.length}`;
    this.setState({ inputs: this.state.inputs.concat([newInput]) });
  }

  handleForm() {
    this.setState(curState => {
      const newState = _.cloneDeep(curState);
      newState.isTagInputVisible = !newState.isTagInputVisible;
      return newState;
    });
  }

  render() {
    return (
      <div>
        <Row>
          <CategorySelect {...this.props} title="Source" />
        </Row>
        {this.state.isTagInputVisible}
        <Row>
          <Select dataOptions={[{ value: 'a', label: 'a' }]} />
          <Col xs={6}>
            <Field
              style={{
                width: `${100}%`,
              }}
              name="firstArgs"
              id="firstArgs"
              withRef
              validationEnabled={false}
              component="input"
            />
          </Col>
          <Button type="button" onClick={this.onCancel} buttonStyle="primary">
            Cancel
          </Button>
          <Button type="button" onClick={this.onOpen} buttonStyle="primary">
            Open
          </Button>
        </Row>
        <Row>
          <Select dataOptions={[{ value: 'a', label: 'a' }]} />
          <Col xs={6}>
            <Field
              style={{
                width: `${100}%`,
              }}
              name="lang"
              id="lang"
              withRef
              validationEnabled={false}
              component="input"
            />
          </Col>
          <Button type="button" onClick={this.onCancel} buttonStyle="primary">
            Cancel
          </Button>
          <Button type="button" onClick={this.onOpen} buttonStyle="primary">
            Open
          </Button>
        </Row>
        {this.state.inputs.map(i => (
          <Row>
            <Select dataOptions={[{ value: 'a', label: 'a' }]} />
            <Col xs={6}>
              <Field
                style={{
                  width: `${100}%`,
                }}
                name={`${this.props.defaultValue.code}-${i}`}
                id={`${this.props.defaultValue.code}-${i}`}
                withRef
                validationEnabled={false}
                component="input"
              />
            </Col>
            <Button type="button" onClick={this.onCancel} buttonStyle="primary">
              Cancel
            </Button>
            <Button type="button" onClick={this.onOpen} buttonStyle="primary">
              Open
            </Button>
          </Row>
        ))}
        <Row>
          <Select dataOptions={[{ value: 'b', label: 'b' }, { value: 'c', label: 'c' }]} />
          <Col xs={6}>
            <Field
              style={{
                width: `${100}%`,
              }}
              fullWidth
              name="langField"
              id="secondField"
              withRef
              validationEnabled={false}
              component="input"
            />
          </Col>
          <Button type="button" onClick={this.appendItem} buttonStyle="primary">
            Add Subfield
          </Button>
        </Row>
        <hr />
      </div>
    );
  }
}
export default connect(
  TagForm,
  'ui-marccat',
);
