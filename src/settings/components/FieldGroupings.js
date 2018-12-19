/**
 * @format
 * @flow
 */
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import Pane from '@folio/stripes-components/lib/Pane';
import MultiColumnList from '@folio/stripes-components/lib/MultiColumnList';
import Icon from '@folio/stripes-components/lib/Icon';
import { ToolbarButtonMenu } from '../../lib';
import { Props, injectCommonProp } from '../../core';

type P = Props & {
  label: string;
};
const data = [
  { 'Name': 'Title', 'Description': 'Lorem ipsum dolor sit amet', 'Heading Fields': '130, 130, 130, 130', 'Title Fields': 'James Edward' },
  { 'Name': 'Author', 'Description': 'Lorem ipsum dolor sit amet', 'Heading Fields': '130, 130, 130, 130', 'Title Fields': 'James Edward' },
  { 'Name': 'Collection title', 'Description': 'Lorem ipsum dolor sit amet', 'Heading Fields': '130, 130, 130, 130', 'Title Fields': 'James Edward' },
  { 'Name': 'Keword B', 'Description': 'Lorem ipsum dolor sit amet', 'Heading Fields': '130, 130, 130, 130', 'Title Fields': 'James Edward' },
  { 'Name': 'Donor name', 'Description': 'Lorem ipsum dolor sit amet', 'Heading Fields': '130, 130, 130, 130', 'Title Fields': 'James Edward' },
  { 'Name': 'Subject', 'Description': 'Lorem ipsum dolor sit amet', 'Heading Fields': '130, 130, 130, 130', 'Title Fields': 'James Edward' },
];
class FieldGroupings extends React.Component<P, {}> {
  render() {
    const { label } = this.props;
    const rightMenu = (
      <ToolbarButtonMenu
        create
        {...this.props}
        label={
          <Icon icon="plus-sign">
            <FormattedMessage id="ui-marccat.button.add" />
          </Icon>
        }
      />
    );
    return (
      <Pane
        defaultWidth="fill"
        fluidContentWidth
        paneTitle={label}
        lastMenu={rightMenu}
      >
        <MultiColumnList
          id="field-groupings"
          defaultWidth="fill"
          contentData={data}
          columnWidths={
            {
              'Name': '20%',
              'Description': '30%',
              'Heading Fields': '30%',
              'Title Fields': '20%',
            }
          }
          visibleColumns={[
            'Name',
            'Description',
            'Heading Fields',
            'Title Fields',
          ]}
        />
      </Pane>
    );
  }
}
export default injectCommonProp(FieldGroupings);
