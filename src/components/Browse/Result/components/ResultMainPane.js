/**
 * @format
 * @flow
 */
import React from 'react';
import { MultiColumnList, Pane, Icon } from '@folio/stripes/components';
import { FormattedMessage } from 'react-intl';
import { EmptyMessage, NoResultsMessage, ToolbarButtonMenu } from '../../../../lib';
import { browseFormatter, browseColMapper } from '../../../../utils/Formatter';
import * as C from '../../../../utils/Constant';
import { injectCommonProp } from '../../../../core';

class ResultMainPane extends React.Component {
    renderButtonMenu = () => {
      return (
        <ToolbarButtonMenu
          create
          {...this.props}
          label={
            <Icon icon="plus-sign">
              <FormattedMessage id="ui-marccat.browse.record.create" />
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
        browseRecords
      } = this.props;
      return (
        <Pane
          padContent={isFetchingBrowse || isPadRequired}
          defaultWidth="fill"
          actionMenu={this.getActionMenu}
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
                    autosize
                    isEmptyMessage={C.EMPTY_MESSAGE}
                    formatter={browseFormatter}
                    onRowClick={handleBrowseDetails}
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
export default injectCommonProp(ResultMainPane);
