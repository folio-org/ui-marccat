/**
 * @format
 * @flow
 */
import React from 'react';
import { Row, Col } from '@folio/stripes-components/lib/LayoutGrid';
import SubfieldForm from '../form/SubfieldForm';

type SubfieldSectionProps = {
  subfields: Array,
};

type SubfieldSectionState = {
  count: Number,
};

class SubfieldSection extends React.Component<SubfieldSectionProps, SubfieldSectionState> {
  constructor(props) {
    super(props);
    this.state = {
      count: 1
    };
    this.renderSubfield = this.renderSubfield.bind(this);
    this.addNewSubfield = this.addNewSubfield.bind(this);
    this.deleteSubfield = this.deleteSubfield.bind(this);
  }

  addNewSubfield() {
    const newCount = this.state.count + 1;
    this.setState({ count: newCount });
  }

  deleteSubfield() {
    const newCount = this.state.count - 1;
    this.setState({ count: newCount });
  }

  renderSubfield(subfieldsAccepted, count) {
    const subfields = [];
    for (let i = 0; i < count; i++) {
      const isLast = i === count - 1;
      subfields.push(<SubfieldForm
        subfields={subfieldsAccepted}
        isLast={isLast}
        addNewSubfield={this.addNewSubfield}
        deleteSubfield={this.deleteSubfield}
      />);
    }
    return subfields;
  }

  render() {
    return (
      <Row>
        <Col xs={12} id="subfieldsData">
          {this.renderSubfield(this.props.subfields, this.state.count)}
        </Col>
      </Row>
    );
  }
}

export default SubfieldSection;
