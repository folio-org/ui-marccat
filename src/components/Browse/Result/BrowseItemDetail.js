import React from 'react';
import { MultiColumnList } from '@folio/stripes-components';
import { connect } from 'react-redux';
import { EMPTY_MESSAGE } from '../../../utils/Constant';
import { ToolbarButtonMenu } from '../../../lib';
// import { ActionTypes } from '../../../redux/actions';
import { remapForAssociatedBibList } from '../../../utils/Mapper';
import { resultsFormatterForAssociated, columnMapperForAssociated } from '../../../utils/Formatter';

export class BrowseItemDetail extends React.Component {
  renderButtonMenu = () => {
    return (<ToolbarButtonMenu create {...this.props} label="ui-marccat.browse.record.create" />);
  };

  render() {
    const resultRemapped = (this.props.browseDetailRecords && this.props.browseDetailRecords.length > 0)
      ? remapForAssociatedBibList(this.props.browseDetailRecords)
      : undefined;
    return (
      <MultiColumnList
        id="bib-associated"
        defaultWidth="30%"
        isEmptyMessage={EMPTY_MESSAGE}
        columnWidths={
          {
            'resultView': '20%',
            '245': '50%',
            'name': '20%',
            'format': '10%'
          }
        }
        // onRowClick={(e, meta) => {
        // const { dispatch } = props;
        // const id = meta['001'];
        // dispatch({ type: ActionTypes.ASSOCIATED_DETAILS, query: id, recordType: meta.recordView, mustOpenPanel: true });
        // }}
        rowMetadata={['001', 'recordView']}
        contentData={resultRemapped}
        formatter={resultsFormatterForAssociated}
        columnMapping={columnMapperForAssociated}
        visibleColumns={[
          'resultView',
          '245',
          'name',
          'format'
        ]}
      />
    );
  }
}
export default (connect(
  ({ marccat: { browseDetails } }) => ({
    browseDetailRecords: browseDetails.results,
  })
)(BrowseItemDetail));

