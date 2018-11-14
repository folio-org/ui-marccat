import React from 'react';
import MultiColumnList from '@folio/stripes-components/lib/MultiColumnList';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Icon from '@folio/stripes-components/lib/Icon';
import Pane from '@folio/stripes-components/lib/Pane';
import Paneset from '@folio/stripes-components/lib/Paneset';
import * as C from '../../../utils/Constant';
import { ActionTypes } from '../../../redux/actions';
import type { Props } from '../../../core';
import { actionMenuItem, ToolbarButtonMenu, ToolbarMenu, EmptyMessage } from '../../Lib';
import { remapForAssociatedBibList } from '../Utils/Mapper';
import { resultsFormatter, columnMapper } from '../Utils/Formatter';
import { isAuthorityRecord } from '../Utils/SearchUtils';
import RecordDetails from './RecordDetails';
import { injectCommonProp } from '../../../core';
import AssociatedBibDetails from './AssociatedBibDetails';

type P = Props & {
  headings: Array<any>;
  inputValue: string;
  getPreviousPage: Function;
  getNextPage: Function;
  detail: Object;
  dataLoaded: boolean;
  loading: boolean;
  isPanelOpen: boolean;
}

export class SearchResults extends React.Component<P, {}> {
  constructor(props: P) {
    super(props);
    this.state = {
      detailPanelIsVisible: false,
      checkBibAssociatedReady: false,
      noResults: false,
      loading: false,
    };
    this.handleDeatils = this.handleDeatils.bind(this);
    this.onNeedMoreData = this.onNeedMoreData.bind(this);
  }

  handleDeatils = (e, meta) => {
    const { dispatch } = this.props;
    // fetch detail from store (todo continue in this way)
    const id = meta['001'];

    dispatch({ type: ActionTypes.DETAILS, query: id, recordType: meta.recordView });
    if (isAuthorityRecord(meta)) {
      dispatch({ type: ActionTypes.ASSOCIATED_BIB_REC, query: meta.queryForBibs, recordType: meta.recordView });
    }
    this.setState(prevState => {
      const detailPanelIsVisible = Object.assign({}, prevState.detailPanelIsVisible);
      return { detailPanelIsVisible };
    });
  };

  onNeedMoreData = (initialData: Array<any>) => {
    return initialData.slice(10, 20);
  };

  render() {
    const { detailPanelIsVisible } = this.state;
    const { fetching, headings, fetchingDetail, authHeadings, authFetching } = this.props;
    if ((headings && (headings.length === undefined || headings.length === 0)) && ((authHeadings && (authHeadings.length === undefined || authHeadings.length === 0)))) {
      this.state.noResults = true;
      this.state.detailPanelIsVisible = false;
    } else {
      this.state.noResults = false;
    }
    const actionMenuItems = actionMenuItem(['ui-marccat.indexes.title', 'ui-marccat.diacritic.title']);
    const rightMenu = <ToolbarButtonMenu create {...this.props} label="ui-marccat.search.record.new.keyboard" />;
    const rightMenuEdit = <ToolbarButtonMenu create {...this.props} label="ui-marccat.search.record.edit" />;
    const leftMenu = <ToolbarMenu icon={['search']} />;
    let mergedRecord = [];
    if (authHeadings && authHeadings.length > 0) {
      mergedRecord = [...mergedRecord, ...authHeadings];
    }
    if (headings && headings.length > 0) {
      mergedRecord = [...mergedRecord, ...headings];
    }
    const marcJSONRecords = (mergedRecord && mergedRecord.length > 0) ? remapForAssociatedBibList(mergedRecord) : [];
    const message = (mergedRecord.length > 0) ? this.props.headingsRecods + ' Results Found' : 'No Result found';
    if (this.props.detailsRecordsAssociatedBib) {
      this.state.checkBibAssociatedReady = this.props.isPanelBibAssOpen;
      if (this.state.checkBibAssociatedReady === undefined) {
        this.state.checkBibAssociatedReady = true;
      }
    }
    const { checkBibAssociatedReady } = this.state;
    return (
      <Paneset static>
        <Pane
          defaultWidth="fill"
          paneTitle={<FormattedMessage id="ui-marccat.search.record" />}
          paneSub={message}
          appIcon={{ app: C.META.ICON_TITLE }}
          actionMenuItems={actionMenuItems}
          firstMenu={leftMenu}
          lastMenu={rightMenu}
        >
          {
            !headings && !fetching &&
            <EmptyMessage {...this.props} />
          }
          {
            (headings && authHeadings && this.state.noResults) ?
              <EmptyMessage {...this.props} /> :
              (fetching && authFetching) ?
                <Icon icon="spinner-ellipsis" /> :
                <MultiColumnList
                  autosize
                  id="tabella"
                  defaultWidth="fill"
                  isEmptyMessage=""
                  columnWidths={
                    {
                      'resultView': '5%',
                      '001': '10%',
                      '245': '25%',
                      'name': '15%',
                      'uniformTitle': '10%',
                      'subject': '10%',
                      'date1': '5%',
                      'date2': '5%',
                      'format': '10%',
                      'countDoc': '5%'
                    }
                  }
                  rowMetadata={['001', 'recordView']}
                  onRowClick={this.handleDeatils}
                  contentData={marcJSONRecords}
                  formatter={resultsFormatter}
                  columnMapping={columnMapper}
                  onNeedMoreData={() => this.onNeedMoreData(marcJSONRecords)}
                  virtualize
                  loading={this.state.loading}
                  visibleColumns={[
                    'resultView',
                    '001',
                    '245',
                    'name',
                    'uniformTitle',
                    'subject',
                    'date1',
                    'date2',
                    'format',
                    'countDoc'
                  ]}
                />
          }
        </Pane>
        { this.state.noResults ? <EmptyMessage {...this.props} /> :
          detailPanelIsVisible &&
          <Pane
            id="pane-details"
            defaultWidth="25%"
            paneTitle={<FormattedMessage id="ui-marccat.search.record.preview" />}
            paneSub={C.EMPTY_MESSAGE}
            appIcon={{ app: C.META.ICON_TITLE }}
            dismissible
            onClose={() => this.setState({ detailPanelIsVisible: false })}
            lastMenu={rightMenuEdit}
          >
            {
              (fetchingDetail) ?
                <Icon icon="spinner-ellipsis" /> :
                <RecordDetails {...this.props} />
            }
          </Pane>
        }
        { this.state.noResults ? <EmptyMessage {...this.props} /> :
          checkBibAssociatedReady && detailPanelIsVisible &&
          <Pane
            id="pane-details"
            defaultWidth="25%"
            paneTitle={<FormattedMessage id="ui-marccat.search.record.preview" />}
            paneSub={C.EMPTY_MESSAGE}
            appIcon={{ app: C.META.ICON_TITLE }}
            dismissible
            onClose={() => this.setState({ checkBibAssociatedReady: false })}
            lastMenu={rightMenuEdit}
          >
            {
              (this.props.detailsForAssociatedBib) ?
                <Icon icon="spinner-ellipsis" /> :
                <AssociatedBibDetails {...this.props} />
            }
          </Pane>
        }
      </Paneset>
    );
  }
}

export default (connect(
  ({ marccat: { search, details, authSearch, countDoc, associatedBibDetails } }) => ({
    headings: search.records,
    headingsRecods: search.count,
    authHeadings: authSearch.records,
    fetching: search.isLoading,
    authFetching: authSearch.isLoading,
    fetchingDetail: details.isLoadingDetail,
    countRecord: countDoc.records,
    detailsForAssociatedBib: associatedBibDetails.isLoadingDetailsForAssociated,
    detailsRecordsAssociatedBib: associatedBibDetails.records,
    isPanelBibAssOpen: associatedBibDetails.mustOpenPanel,
  }),
)(injectCommonProp(SearchResults)));

