/**
 * @format
 * @flow
 */
import React, { Fragment } from 'react';
import { isEmpty, first } from 'lodash';
import { Tag00X, Tag006, Tag007, Tag008, MarcField } from '..';
import type { Props } from '../../../shared';
import style from '../Style/index.css';
import { ActionTypes } from '../../../redux/actions/Actions';
import {
  TAGS,
} from '../Utils/MarcConstant';
import { filterFixedFields } from '../Utils/MarcApiUtils';
import StaticTag00X from './Tags/StaticTag00X';

type P = Props & {};
class StaticFixedFields extends React.Component<P, {}> {
  constructor(props: P) {
    super(props);
    this.state = {
    };
  }

  renderStaticTag00X(tags) {
    return (
      <div>
        {tags.map((tag, idx) => <StaticTag00X
          {...this.props}
          key={idx}
          readOnly
          tag={tag}
          label={tag.fixedField.code}
          name={tag.fixedField.code}
          value={tag.fixedField.displayValue}
        />)}
      </div>
    );
  }

  render() {
    const { staticFixedFields } = this.props;
    return (
      <Fragment>
        {this.renderStaticTag00X(staticFixedFields)}
      </Fragment>
    );
  }
}

export default StaticFixedFields;
