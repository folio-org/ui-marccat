/**
 * @format
 * @flow
 */
import React, { Fragment } from 'react';
import { isEmpty, first } from 'lodash';
import { MarcField, StaticTag00X } from '..';
import type { Props } from '../../../shared';
import style from '../Style/index.css';
import { ActionTypes } from '../../../redux/actions/Actions';
import {
  TAGS,
} from '../Utils/MarcConstant';
import { filterFixedFields } from '../Utils/MarcApiUtils';
import { DynamicTag00X } from './Tags/DynamicTag00X';
import { EMPTY_STRING } from '../../../config/constants';

type P = Props & {};
class DynamicFixedFields extends React.Component<P, {}> {

  renderDynamicTag00X(tags, tagName) {
    return (tags) ? (
      <div>
        {tags.map((tag, idx) => <DynamicTag00X
          {...this.props}
          key={idx}
          readOnly
          tag={tag}
          label={tag.fixedField.code}
          name={tag.fixedField.code}
          value={tag.fixedField.displayValue}
        />)}
      </div>
    ) : (
      <MarcField
        label={tagName}
        name={tagName}
        value={EMPTY_STRING}
      />
    );
  }

  render() {
    const { dynamicFixedFields } = this.props;
    const field006 = dynamicFixedFields.filter(f => f.fixedField.code === TAGS._006);
    const field007 = dynamicFixedFields.filter(f => f.fixedField.code === TAGS._007);
    const field008 = dynamicFixedFields.filter(f => f.fixedField.code === TAGS._008);
    return (
      <Fragment>
        {() => this.renderDynamicTag00X(field006, TAGS._006)}
        {() => this.renderDynamicTag00X(field007, TAGS._007)}
        {() => this.renderDynamicTag00X(field008, TAGS._008)}
      </Fragment>
    );
  }
}

export default DynamicFixedFields;
