/**
 * @format
 * @flow
 */
import * as React from 'react';
import { first } from 'lodash';
import {
  TAGS
} from '../../Utils/MarcConstant';
import Tag008 from './Tags/Tag008';
import Tag00X from './Tags/Tag00X';

export default ({ ...props }) => {

  const renderTag00X = (field) => {
    const { record } = props;
    return (
      <Tag00X {...props} field={field} record={record} />
    );
  };

  const renderTag008 = (tag) => {
    const { record } = props;
    return (
      <Tag008
        {...props}
        tag={tag}
        leaderCode={record.leader.code}
        leaderValue={record.leader.value}
      />
    );
  };

  const { fixedfields } = props;
  return (
    <React.Fragment>
      {renderTag00X(fixedfields.filter(f => f.fixedField.code !== TAGS._008))}
      {renderTag008(first(fixedfields.filter(f => f.fixedField.code === TAGS._008)))}
    </React.Fragment>
  );
};
