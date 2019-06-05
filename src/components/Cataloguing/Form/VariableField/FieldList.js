/* @flow strict  */
import * as React from 'react';
import PropTypes from 'prop-types';
import { sortBy } from 'lodash';
import FieldForm from './FieldForm';

type Props = {
  columnMapping?: PropTypes.object,
  columnWidths?: PropTypes.object,
  contentData: Array<{}>,
  formatter?: {},
  id: string,
  itemSelected: number,
  nameKey?: string,
  readOnlyFields?: Array<String>,
};
/**
 *
 *
 * @export
 * @param {Props} props
 * @returns
 */
export default function (props: Props) {
  const { contentData, nameKey = 'code' } = props;
  const items = sortBy(contentData, [t => t[nameKey] && t[nameKey].toLowerCase()]);
  return (<FieldForm initialValues={{ items }} {...props} />);
}
