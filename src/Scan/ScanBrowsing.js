import React from 'react';
import MultiColumnList from '@folio/stripes-components/lib/MultiColumnList';
import Button from '@folio/stripes-components/lib/Button';
import { connect } from 'react-redux';
import { Row, Col } from 'react-flexbox-grid';
import { FormattedMessage } from 'react-intl';
import Pane from '@folio/stripes-components/lib/Pane';
import { fetchDetails } from '../Redux/actions/ActionCreator';
import * as C from '../Utils/Constant';
import { DotLoader } from '../Lib';


type BrowsingTableProps = {
    headings: Array<any>,
    inputValue: string,
    getPreviousPage: Function,
    getNextPage: Function,
    dataLoaded: boolean,
}

const columnMapping = {
  stringText: <FormattedMessage id="ui-marccat.browsing.col.heading" />,
  database: <FormattedMessage id="ui-marccat.browsing.col.db" />,
  headingNumber: <FormattedMessage id="ui-marccat.browsing.col.headingNum" />,
  countTitleNameDocuments: <FormattedMessage id="ui-marccat.browsing.col.nt" />,
  countCrossReferences: <FormattedMessage id="ui-marccat.browsing.col.refs" />,
  countAuthorities: <FormattedMessage id="ui-marccat.browsing.col.a" />,
  countDocuments: <FormattedMessage id="ui-marccat.browsing.col.docs" />,
  verificationlevel: <FormattedMessage id="ui-marccat.browsing.col.level" />,
  indexingLanguage: <FormattedMessage id="ui-marccat.browsing.col.index" />,
  accessPointlanguage: <FormattedMessage id="ui-marccat.browsing.col.acc" />
};

function BrowsingTable(props: BrowsingTableProps) {
  if (!props.headings || props.headings.length === 0) {
    return <DotLoader />;
  } else {
    return (
      <Pane
        defaultWidth="fullWidth"
        paneTitle={<FormattedMessage id="ui-marccat.browsing.title" />}
        paneSub={props.inputValue}
        appIcon={{ app: C.META.ICON_TITLE }}
      >
        <MultiColumnList
          fullWidth
          onRowClick={(evt) => props.getRecordDetails(evt)}
          contentData={props.headings}
          visibleColumns={[
            'stringText',
            'database',
            'countTitleNameDocuments',
            'countCrossReferences',
            'countAuthorities',
            'countDocuments',
            'verificationlevel',
            'indexingLanguage',
            'accessPointlanguage',
            'headingNumber'
          ]}
          columnMapping={columnMapping}
          columnWidths={{
            stringText: '40%',
            database: '20%',
            countTitleNameDocuments: '4%',
            countCrossReferences: '4%',
            countAuthorities: '4%',
            countDocuments: '4%',
            verificationlevel: '4%',
            indexingLanguage: '7%',
            accessPointlanguage: '5%',
            headingNumber: '8%'
          }}
        />
        {props.dataLoaded &&
          <Row>
            <Col xs={6} >
              <Button fullWidth buttonStyle="primary" onClick={(evt) => props.getPreviousPage(evt, props.inputValue)}>Previous Page</Button>
            </Col>
            <Col xs={6}>
              <Button fullWidth buttonStyle="primary" onClick={(evt) => props.getNextPage(evt, props.inputValue)}>Next Page</Button>
            </Col>
          </Row>
        }
      </Pane>
    );
  }
}
export default (connect(
  ({ marccat: { scan } }) => ({
    headings: scan.records
  }),
  (dispatch /* ownProps*/) => ({
    getRecordDetails: (evt) => dispatch((_ /* getState*/) => {
      dispatch(fetchDetails(evt.currentTarget.lastChild.innerText));
    })
  })
)(BrowsingTable));

