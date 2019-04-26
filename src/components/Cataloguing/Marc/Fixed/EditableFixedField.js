/**
 * @format
 * @flow
 */
import * as React from 'react';
import { first } from 'lodash';
import { Row, Col } from '@folio/stripes/components';
import AddTagButton from '../Button/AddTagButton';
import {
  TAGS,
  EMPTY_FIXED_FIELD
} from '../../Utils/MarcConstant';
import Tag008 from './Tags/Tag008';
import MarcField from '../MarcField';

import style from '../../Style/index.css';

export default class EditableFixedField extends React.Component<{}, {}> {

 state = {
   fields: []
 };


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

renderTag00X(tags, tagName) {
  // eslint-disable-next-line no-unused-vars
  let { fields } = this.state;
  fields = tags;
  if (tags.length === 0) tags.push(EMPTY_FIXED_FIELD(tagName));
  return (
    <React.Fragment>
      {tags.map((t, idx) => (
        <Row middle="xs">
          <Col xs={6}>
            <div className={style.controlFieldContainer}>
              <MarcField
                {...this.props}
                key={idx}
                withIcon
                label={t.fixedField.code}
                name={t.fixedField.code}
                value={t.fixedField.displayValue}
              />
            </div>
          </Col>
          <Col xs={2}>
            <AddTagButton {...this.props} tagCode={tagName} onClick={() => this.handleAdd()} />
          </Col>
        </Row>
      ))}
    </React.Fragment>
  );
}

  renderTag008 = (tag) => {
    const { record } = this.props;
    return (
      <Tag008
        {...this.props}
        tag={tag}
        leaderCode={record.leader.code}
        leaderValue={record.leader.value}
      />
    );
  };


  render() {
    const { fixedfields } = this.props;
    const field006 = fixedfields.filter(f => f.fixedField.code === TAGS._006);
    const field007 = fixedfields.filter(f => f.fixedField.code === TAGS._007);
    const field008 = first(fixedfields.filter(f => f.fixedField.code === TAGS._008));
    return (
      <React.Fragment>
        {this.renderTag00X(field006, TAGS._006)}
        {this.renderTag00X(field007, TAGS._007)}
        {this.renderTag008(field008)}
      </React.Fragment>
    );
  }
}
