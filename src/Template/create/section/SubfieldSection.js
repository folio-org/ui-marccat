/**
 * @format
 * @flow
 */
import * as React from 'react';
import { Field } from 'redux-form';
import { Row, Col } from '@folio/stripes-components/lib/LayoutGrid';
import TextField from '@folio/stripes-components/lib/TextField';
import Button from '@folio/stripes-components/lib/Button';
import Select from '@folio/stripes-components/lib/Select';
import { FormattedMessage } from 'react-intl';
import { remapSubfield } from '../../../Utils/Mapper';

type SubfieldSectionProps = {
  resources: Object;
};

export default class SubfieldSection extends React.Component<SubfieldSectionProps, { subfield: Array<any>}> {
  constructor(props:SubfieldSectionProps) {
    super(props);
    this.state = {
      subfield: ['']
    };
    this.handleDeleteSection = this.handleDeleteSection.bind(this);
  }

  handleDeleteSection = (e: any) => {
    e.preventDefault();
    const subfield = [
      ...this.state.subfield.slice(0, -1)
    ];
    this.setState({
      subfield
    });
  };

  handleAddSection = (e: any) => {
    e.preventDefault();
    const subfield = this.state.subfield.concat(['b']);
    this.setState({
      subfield
    });
  };

  render() {
    const { subfield } = this.state;
    const { resources: { fieldTemplate } } = this.props;
    if ((!fieldTemplate || !fieldTemplate.hasLoaded)) return <div />;
    const subfieldMapped = remapSubfield(fieldTemplate.records[0]);
    return (
      <div>
        {subfield.map((i, index) => (
          <React.Fragment key={i}>
            <Row id="section-delete-tag" key={i}>
              <Col xs={2}>
                <Field
                  component={Select}
                  name={`deleteSelectSubfield-${index}`}
                  id="subfield-select-delete-section"
                  dataOptions={[{ value: 'a', label: i }]}
                  onChange={() => {}}
                />
              </Col>
              <Col xs={4}>
                <Field
                  name={`deleteField-${index}`}
                  id="input-delete-field-name"
                  component={TextField}
                />
              </Col>
              <Col xs={4}>
                <Button onClick={this.handleDeleteSection} type="button">
                  <FormattedMessage id="ui-marccat.template.tag.delete" />
                </Button>
                <Button onClick={this.handleDeleteSection} type="button">
                  <FormattedMessage id="ui-marccat.template.tag.open" />
                </Button>
              </Col>
            </Row>
          </React.Fragment>
        ))}
        <Row id="section-subfield-tag">
          <Col xs={2}>
            <Field
              component={Select}
              name="subfieldSelect"
              id="select-subfield-section-add"
              dataOptions={subfieldMapped}
              onChange={() => {}}
            />
          </Col>
          <Col xs={4}>
            <Field
              name="subfieldFieldName"
              id="input-subfield-name"
              component={TextField}
            />
          </Col>
          <Col xs={4}>
            <Button onClick={this.handleAddSection} type="button">
              <FormattedMessage id="ui-marccat.template.add.subfield" />
            </Button>
          </Col>
        </Row>
      </div>
    );
  }
}
