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
import { remapForResultList } from '../Utils/Mapper';
import { resultsFormatter, columnMapper } from '../Utils/Formatter';
import RecordDetails from './RecordDetails';
import { injectCommonProp } from '../../../core';

type P = Props & {
  headings: Array<any>;
  inputValue: string;
  getPreviousPage: Function;
  getNextPage: Function;
  dataLoaded: boolean;
  isPanelOpen: boolean;
}

export class SearchResults extends React.Component<P, {}> {
  constructor(props: P) {
    super(props);
    this.state = {
      detailPanelIsVisible: false
    };
    this.handleDeatils = this.handleDeatils.bind(this);
  }

  handleDeatils = (e, meta) => {
    const { store } = this.props;
    store.dispatch({ type: ActionTypes.DETAILS, query: meta['001'], recordType: meta.recordView });
    if (meta.recordView === -1) {
      store.dispatch({ type: ActionTypes.ASSOCIATED_BIB_REC, query: meta.queryForBibs, recordType: meta.recordView });
    }
    this.setState(prevState => {
      const detailPanelIsVisible = Object.assign({}, prevState.detailPanelIsVisible);
      return { detailPanelIsVisible };
    });
  };

  render() {
    const { detailPanelIsVisible } = this.state;
    const { fetching, headings, fetchingDetail, authHeadings, authFetching } = this.props;
    const actionMenuItems = actionMenuItem(['ui-marccat.indexes.title', 'ui-marccat.diacritic.title']);
    const rightMenu = <ToolbarButtonMenu create {...this.props} label="ui-marccat.search.record.new.keyboard" />;
    const rightMenuEdit = <ToolbarButtonMenu create {...this.props} label="ui-marccat.search.record.edit" />;
    const leftMenu = <ToolbarMenu {...this.props} icon={['search']} />;
    let authRecordReady = false;
    let bibRecordReady = false;
    let mergedRecord = [];
    if (authHeadings && authHeadings.length > 0) {
      mergedRecord = [...mergedRecord, ...authHeadings];
      authRecordReady = true;
    }
    if (headings && headings.length > 0) {
      mergedRecord = [...mergedRecord, ...headings];
      bibRecordReady = true;
    }
    const marcJSONRecords = (mergedRecord && mergedRecord.length > 0) ? remapForResultList(mergedRecord) : [];
    const blankMessage = '';
    const message = (fetching || authFetching) ? 'Searching....' : (headings) ? headings.length + ' Bibliographic' : 'No Bibliographic results found';
    const messageAuthority = (fetching || authFetching) ? 'Searching....' : (authHeadings) ? authHeadings.length + ' Authority' : 'No Authority results found';
    if ((authHeadings && authHeadings.length > 0) || (headings && headings.length > 0)) {
      return (
        <Paneset static>
          <Pane
            defaultWidth="fill"
            paneTitle={<FormattedMessage id="ui-marccat.search.record" />}
            paneSub={bibRecordReady || authRecordReady ? message + ' / ' + messageAuthority : blankMessage}
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
              (fetching && authFetching) ?
                <Icon icon="spinner-ellipsis" /> :
                <MultiColumnList
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
                  loading
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
          {
            detailPanelIsVisible &&
            <Pane
              id="pane-details"
              defaultWidth="35%"
              paneTitle={<FormattedMessage id="ui-marccat.search.record.preview" />}
              paneSub={C.EMPTY_MESSAGE}
              appIcon={{ app: C.META.ICON_TITLE }}
              dismissible
              onClose={() => this.setState({ detailPanelIsVisible: false })}
              actionMenuItems={actionMenuItems}
              lastMenu={rightMenuEdit}
            >
              {
                (fetchingDetail) ?
                  <Icon icon="spinner-ellipsis" /> :
                  <RecordDetails {...this.props} />
              }
            </Pane>
          }
        </Paneset>
      );
    } else {
      return (
        <Paneset static>
          <Pane
            defaultWidth="fill"
            paneTitle={<FormattedMessage id="ui-marccat.search.record" />}
            paneSub={blankMessage}
            appIcon={{ app: C.META.ICON_TITLE }}
            actionMenuItems={actionMenuItems}
            firstMenu={leftMenu}
            lastMenu={rightMenu}
          >
            <EmptyMessage {...this.props} />
          </Pane>
        </Paneset>);
    }
  }
}

export default (connect(
  ({ marccat: { search, details, authSearch, countDoc } }) => ({
    headings: search.records,
    authHeadings: authSearch.records,
    fetching: search.isLoading,
    authFetching: authSearch.isLoading,
    fetchingDetail: details.isLoadingDetail,
    countRecord: countDoc.records
  }),
)(injectCommonProp(SearchResults)));

