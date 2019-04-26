/**
 * @format
 * @flow
 */
import React from 'react';
import { first } from 'lodash';
import { Row, Col } from '@folio/stripes/components';
import AddTagButton from '../Button/AddTagButton';
import {
  TAGS,
} from '../../Utils/MarcConstant';
import { EMPTY_STRING } from '../../../../config/constants';
import Tag008 from './Tags/Tag008';
import MarcField from '../MarcField';

import style from '../../Style/index.css';

export default class EditableFixedField extends React.Component<{}, {}> {

  renderTag00X(tags, tagName) {
    return (tags.length > 0) ? (
      <React.Fragment>
        {tags.map((tag, idx) => (
          <div className={style.controlFieldContainer}>
            <MarcField
              {...this.props}
              key={idx}
              withIcon
              label={tag.fixedField.code}
              name={tag.fixedField.code}
              value={tag.fixedField.displayValue}
            />
          </div>
        ))}
      </React.Fragment>
    ) :
      (
        <Row middle="xs">
          <Col xs={6}>
            <div className={style.controlFieldContainer}>
              <MarcField
                {...this.props}
                withIcon
                tag={{}}
                label={tagName}
                name={tagName}
                value={EMPTY_STRING}
              />
            </div>
          </Col>
          <Col xs={2}>
            <AddTagButton {...this.props} tagCode={tagName} />
          </Col>
        </Row>
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
