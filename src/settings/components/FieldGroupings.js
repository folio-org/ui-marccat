/**
 * @format
 * @flow
 */
import * as React from 'react';
import Pane from '@folio/stripes-components/lib/Pane';
import MultiColumnList from '@folio/stripes-components/lib/MultiColumnList';
import { ToolbarButtonMenu } from '../../components/Lib';

type P = {
  label: string,
};
const data = [
  { 'Name': 'Title', 'Description': 'Lorem ipsum dolor sit amet', 'Heading Fields': '130, 130, 130, 130', 'Title Fields': 'James Edward' },
  { 'Name': 'Author', 'Description': 'Lorem ipsum dolor sit amet', 'Heading Fields': '130, 130, 130, 130', 'Title Fields': 'James Edward' },
  { 'Name': 'Collection title', 'Description': 'Lorem ipsum dolor sit amet', 'Heading Fields': '130, 130, 130, 130', 'Title Fields': 'James Edward' },
  { 'Name': 'Keword B', 'Description': 'Lorem ipsum dolor sit amet', 'Heading Fields': '130, 130, 130, 130', 'Title Fields': 'James Edward' },
  { 'Name': 'Donor name', 'Description': 'Lorem ipsum dolor sit amet', 'Heading Fields': '130, 130, 130, 130', 'Title Fields': 'James Edward' },
  { 'Name': 'Subject', 'Description': 'Lorem ipsum dolor sit amet', 'Heading Fields': '130, 130, 130, 130', 'Title Fields': 'James Edward' },
];
export default class FieldGroupings extends React.Component<P, {}> {
  render() {
    const rightMenu = <ToolbarButtonMenu create {...this.props} label="ui-marccat.button.add" />;
    return (
      <Pane
        defaultWidth="fill"
        fluidContentWidth
        paneTitle={this.props.label}
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
