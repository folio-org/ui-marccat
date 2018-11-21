import React from 'react';
import { MultiColumnList, Pane, Paneset } from '@folio/stripes-components';
import { connect } from 'react-redux';
import { injectCommonProp, Props } from '../../../core';
import BrowseItemDetail from './BrowseItemDetail';
import { EMPTY_MESSAGE } from '../../../utils/Constant';
import { ToolbarButtonMenu } from '../../../lib';
import { browseResultsFormatter } from '../../../utils/Formatter';
import { browseResults } from '../../Mock/browseData';

type P = Props & {};
type S = {
  browseDetailPanelIsVisible: bool;
  rowClicked: bool;
};

export class BrowseResults extends React.Component<P, S> {
  constructor(props:P) {
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
    const { translate, firstMenu } = this.props;
    console.log(this.props.browseRecords);
    return (
      <Paneset static>
        <Pane
          defaultWidth="fill"
          actionMenuItems={this.renderActionMenuItems()}
          paneTitle={translate({ id: 'ui-marccat.browse.results.title' })}
          paneSub={EMPTY_MESSAGE}
          firstMenu={firstMenu}
          lastMenu={this.renderButtonMenu()}
        >
          <MultiColumnList
            contentData={this.props.browseRecords}
            defaultWidth="fill"
            isEmptyMessage={EMPTY_MESSAGE}
            formatter={browseResultsFormatter}
            onRowClick={this.handlePanelDetails}
            rowMetadata={['Access point', 'Authority Records', 'Bibliographic Records']}
            columnWidths={
              {
                'type': '8%',
                'Access point': '30%',
                'Authority Records': '30%',
                'Bibliographic Records': '30%',
              }
            }
            visibleColumns={[
              'type',
              'Access point',
              'Authority Records',
              'Bibliographic Records'
            ]}
          />
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
    browseRecords: browse.records
  }),
)(injectCommonProp(BrowseResults)));
