// @flow
import * as React from 'react';
import { MultiColumnList, Pane, Icon } from '@folio/stripes/components';
import { FormattedMessage } from 'react-intl';
import {
  EmptyMessage,
  NoResultsMessage,
  ToolbarButtonMenu,
  withProps,
  browseColMapper
} from '../../../shared';

class ResultMainPane extends React.Component<{}, {}> {
    renderButtonMenu = () => {
      return (
        <ToolbarButtonMenu
          {...this.props}
          label={
            <Icon icon="plus-sign">
              <FormattedMessage id="ui-marccat.search.record.new" />
            </Icon>
          }
        />
      );
    };

    render() {
      const {
        translate,
        isFetchingBrowse,
        isPadRequired,
        messageNoContent,
        firstMenu,
        noResults,
        isReadyBrowse,
        handleBrowseDetails,
        browseRecords,
        getActionMenu
      } = this.props;
      return (
        <Pane
          padContent={isFetchingBrowse || isPadRequired}
          defaultWidth="fill"
          actionMenu={getActionMenu()}
          paneTitle={translate({ id: 'ui-marccat.browse.results.title' })}
          paneSub={messageNoContent}
          firstMenu={firstMenu}
          lastMenu={this.renderButtonMenu()}
        >
          {
            (isFetchingBrowse) ?
              <Icon icon="spinner-ellipsis" /> :
              (!isFetchingBrowse && noResults) ?
                <NoResultsMessage {...this.props} /> :
                (isReadyBrowse) ?
                  <MultiColumnList
                    contentData={browseRecords}
                    autosize={true.toString()}
                    isEmptyMessage={<NoResultsMessage {...this.props} />}
                    formatter={() => { }}
                    onRowClick={handleBrowseDetails()}
                    rowMetadata={['Access point', 'Authority Records', 'Bibliographic Records']}
                    columnMapping={browseColMapper}
                    columnWidths={
                      {
                        'type': '10%',
                        'headingNumber': '15%',
                        'stringText': '25%',
                        'countAuthorities': '25%',
                        'countDocuments': '25%',
                      }
                    }
                    visibleColumns={[
                      'type',
                      'headingNumber',
                      'stringText',
                      'countAuthorities',
                      'countDocuments'
                    ]}
                  />
                  : <EmptyMessage {...this.props} />}
        </Pane>
      );
    }
}
export default withProps(ResultMainPane);
