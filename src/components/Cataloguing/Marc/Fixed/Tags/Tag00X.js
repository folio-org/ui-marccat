/**
 * @format
 * @flow
 */
import React from 'react';
import { RepeatableField, Row, Col } from '@folio/stripes/components';
import AddTagButton from '../../Button/AddTagButton';
import { EMPTY_STRING } from '../../../../../config/constants';
import SingleTag00X from './SingleTag00X';

export default class Tag00X extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      fields: []
    };
  }

  handleAdd = () => {
    this.setState(({ fields }) => ({
      fields: fields.concat({})
    }));
  }

  handleRemove = index => {
    this.setState(({ fields }) => ({
      fields: [...fields.slice(0, index), ...fields.slice(index + 1)]
    }));
  }


  renderedField = ({ ...props }) => {
    const { tag, tagName } = props;
    this.handleAdd(tag);
    return (
      <Row middle="xs">
        <Col xs={6}>
          <SingleTag00X
            {...props}
            withIcon
            tag={tag || {}}
            label={tagName}
            name={tagName}
            value={EMPTY_STRING}
          />
        </Col>
        <Col xs={2}>
          <AddTagButton {...this.props} tagCode={tagName} />
        </Col>
      </Row>
    );
  }

  render() {
    const { fields } = this.state;
    const { tag, tagName } = this.props;
    return (
      <RepeatableField
        fields={fields}
        onAdd={this.handleAdd}
        onRemove={this.handleRemove}
        renderField={() => (
          <Row middle="xs">
            <Col xs={6}>
              <SingleTag00X
                {...this.props}
                withIcon
                tag={tag || {}}
                label={tagName}
                name={tagName}
                value={EMPTY_STRING}
              />
            </Col>
            <Col xs={2}>
              <AddTagButton {...this.props} tagCode={tagName} />
            </Col>
          </Row>)}
      />
    );
  }
}
