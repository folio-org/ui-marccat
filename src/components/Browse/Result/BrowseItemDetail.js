import React from 'react';
import { Pane, MultiColumnList } from '@folio/stripes-components';
import { EMPTY_MESSAGE } from '../../../utils/Constant';
import { ToolbarButtonMenu } from '../../../lib';
import { browseDetailResultsFormatter } from '../../../utils/Formatter';
import { browseDetailResults } from '../../Mock/browseData';

export default class BrowseItemDetail extends React.Component {
  renderButtonMenu = () => {
    return (<ToolbarButtonMenu create {...this.props} label="ui-marccat.browse.record.create" />);
  };

  render() {
    const { onClose, actionMenuItems, itemDetail, translate } = this.props;
    return (
      <Pane
        dismissible
        defaultWidth="35%"
        onClose={onClose}
        actionMenuItems={actionMenuItems}
        paneTitle={translate({ id: 'ui-marccat.browse.results.title' })}
        paneSub={itemDetail.accessPoint || EMPTY_MESSAGE}
        lastMenu={this.renderButtonMenu()}
      >
        <MultiColumnList
          contentData={browseDetailResults(itemDetail)}
          isEmptyMessage={EMPTY_MESSAGE}
          formatter={browseDetailResultsFormatter}
          columnWidths={
            {
              'type': '10%',
              'Access point': '90%',
            }
          }
          visibleColumns={[
            'type',
            'Access point',
          ]}
        />
      </Pane>
    );
  }
}
