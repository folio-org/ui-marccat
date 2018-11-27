import React from 'react';
import { MultiColumnList, Pane, Paneset, Icon } from '@folio/stripes-components';
import { connect } from 'react-redux';
import { injectCommonProp } from '../../../core';
import { Props } from '../../../core/type/props';
import BrowseItemDetail from './BrowseItemDetail';
import { EMPTY_MESSAGE } from '../../../utils/Constant';
import { ToolbarButtonMenu, EmptyMessage } from '../../../lib';
import { browseResultsFormatter } from '../../../utils/Formatter';

type P = Props & {};
type S = {
  browseDetailPanelIsVisible: bool;
  rowClicked: bool;
};

export class BrowseResults extends React.Component<P, S> {
  constructor(props: P) {
    super(props);
    this.state = {
      browseDetailPanelIsVisible: false,
      rowClicked: false,
      browseDetail: {
        accessPoint: undefined,
        authorityRecord: undefined,
        bibliographicRecord: undefined,
      }
    };

    this.handleBrowseDetails = this.handleBrowseDetails.bind(this);
  }

  handlePanelDetails = (event, data) => {
    this.setState({
      browseDetailPanelIsVisible: true,
      rowClicked: false,
      browseDetail: {
        accessPoint: data['Access point'],
        authorityRecord: data['Authority Records'],
        bibliographicRecord: data['Bibliographic Records'],
      }
    });
  };

  handleBrowseDetails = () => {
    this.setState({
      browseDetailPanelIsVisible: false,
      rowClicked: true
    });
  };

  renderActionMenuItems = () => {
    return [
      { label: this.props.translate({ id: 'ui-marccat.browse.actionmenu.export.mrc' }) },
      { label: this.props.translate({ id: 'ui-marccat.browse.actionmenu.export.csv' }) },
      { label: this.props.translate({ id: 'ui-marccat.browse.actionmenu.export.dat' }) },
      { label: this.props.translate({ id: 'ui-marccat.browse.actionmenu.printall' }) },
      { label: this.props.translate({ id: 'ui-marccat.browse.actionmenu.merge' }) },
    ];
  };

  renderButtonMenu = () => {
    return (<ToolbarButtonMenu create {...this.props} label="ui-marccat.search.record.new.keyboard" />);
  };

  render() {
    const { browseDetailPanelIsVisible, rowClicked, browseDetail } = this.state;
    const { translate, firstMenu, isFetchingBrowse, isReadyBrowse, browseRecords } = this.props;
    return (
      <Paneset static>
        <Pane
          padContent={(browseRecords) || isFetchingBrowse}
          defaultWidth="fill"
          actionMenuItems={this.renderActionMenuItems()}
          paneTitle={translate({ id: 'ui-marccat.browse.results.title' })}
          paneSub={EMPTY_MESSAGE}
          firstMenu={firstMenu}
          lastMenu={this.renderButtonMenu()}
        >
          {
            (isFetchingBrowse) ?
              <Icon icon="spinner-ellipsis" /> :
              (isReadyBrowse) ?
                <MultiColumnList
                  contentData={browseRecords}
                  autosize
                  isEmptyMessage={EMPTY_MESSAGE}
                  formatter={browseResultsFormatter}
                  onRowClick={this.handlePanelDetails}
                  rowMetadata={['Access point', 'Authority Records', 'Bibliographic Records']}
                  columnWidths={
                    {
                      'type': '5%',
                      'headingNumber': '10%',
                      'database': '15%',
                      'stringText': '10%',
                      'verificationlevel': '10%',
                      'accessPointlanguage': '5%',
                      'countAuthorities': '5%',
                      'countCrossReferences': '5%',
                      'countDocuments': '5%',
                      'countTitleNameDocuments': '5%',
                      'indexingLanguage': '10%',
                    }
                  }
                  visibleColumns={[
                    'type',
                    'headingNumber',
                    'database',
                    'stringText',
                    'verificationlevel',
                    'accessPointlanguage',
                    'countAuthorities',
                    'countCrossReferences',
                    'countDocuments',
                    'countTitleNameDocuments',
                    'indexingLanguage',
                  ]}
                /> : <EmptyMessage {...this.props} />}
        </Pane>
        {browseDetailPanelIsVisible && !rowClicked &&
          <BrowseItemDetail
            {...this.props}
            translate={translate}
            itemDetail={browseDetail}
            onClose={this.handleBrowseDetails}
            actionMenuItems={this.renderActionMenuItems()}
          />
        }
      </Paneset>
    );
  }
}
export default (connect(
  ({ marccat: { browse } }) => ({
    browseRecords: browse.records,
    isFetchingBrowse: browse.isLoading,
    isReadyBrowse: browse.isReady
  }),
)(injectCommonProp(BrowseResults)));
