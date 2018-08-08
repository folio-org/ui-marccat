
/**
 * @format
 * @flow
 */
import * as React from 'react';
import { connect } from '@folio/stripes-connect';
import MultiColumnList from '@folio/stripes-components/lib/MultiColumnList';
import Icon from '@folio/stripes-components/lib/Icon';
import Paneset from '@folio/stripes-components/lib/Paneset';
import Pane from '@folio/stripes-components/lib/Pane';
import PreviousButton from '../advanced/button/PreviousButton';
import NextButton from '../advanced/button/NextButton';
import * as C from '../../Utils';
import css from '../style/Search.css';
import { Row, Col } from '../../../node_modules/react-flexbox-grid';

type AdvancedBrowsingProps = {
  stripes: Object;
  resources: Object;
  query: string;
};

type AdvancedBrowsingState = {

};

class AdvancedBrowsing extends React.Component
  <AdvancedBrowsingProps, AdvancedBrowsingState> {
  static manifest = Object.freeze({
    query: {},
    firstPage: {
      type: C.RESOURCE_TYPE,
      root: C.ENDPOINT.BASE_URL,
      path: `first-page?mainLibrary=170&view=1&query=%{query}&lang=${C.ENDPOINT.DEFAULT_LANG}`,
      headers: C.ENDPOINT.HEADERS,
      records: C.API_RESULT_JSON_KEY.BROWSING,
      accumulate: true,
      fetch: false
    },
    previousPage: {
      type: C.RESOURCE_TYPE,
      root: C.ENDPOINT.BASE_URL,
      path: `previous-page?mainLibrary=170&view=1&query=%{query}&lang=${C.ENDPOINT.DEFAULT_LANG}`,
      headers: C.ENDPOINT.HEADERS,
      records: C.API_RESULT_JSON_KEY.BROWSING,
      accumulate: true,
      fetch: false
    },
    nextPage: {
      type: C.RESOURCE_TYPE,
      root: C.ENDPOINT.BASE_URL,
      path: `next-page?mainLibrary=170&view=1&query=%{query}&lang=${C.ENDPOINT.DEFAULT_LANG}`,
      headers: C.ENDPOINT.HEADERS,
      records: C.API_RESULT_JSON_KEY.BROWSING,
      accumulate: true,
      fetch: false
    },
  });


  constructor(props: AdvancedBrowsingProps) {
    super(props);
    this.state = {
    };
    /** bind handler **/
  }

  render() {
    const { resources: { firstPage } } = this.props;
    const dataFirstPage = firstPage.records;
    if (!firstPage || !firstPage.hasLoaded) return <Icon icon="spinner-ellipsis" />;
    const formatMsg = this.props.stripes.intl.formatMessage;
    const columnMapping = {
      stringText: formatMsg({ id: 'ui-marccat.browsing.col.heading' }),
      database: formatMsg({ id: 'ui-marccat.browsing.col.db' }),
      countTitleNameDocuments: formatMsg({ id: 'ui-marccat.browsing.col.nt' }),
      countCrossReferences: formatMsg({ id: 'ui-marccat.browsing.col.refs' }),
      countAuthorities: formatMsg({ id: 'ui-marccat.browsing.col.a' }),
      countDocuments: formatMsg({ id: 'ui-marccat.browsing.col.docs' }),
      verificationlevel: formatMsg({ id: 'ui-marccat.browsing.col.level' }),
      indexingLanguage: formatMsg({ id: 'ui-marccat.browsing.col.index' }),
      accessPointlanguage: formatMsg({ id: 'ui-marccat.browsing.col.acc' }),
    };
    return (
      <Paneset static>
        <Pane
          paneTitle={formatMsg({ id: 'ui-marccat.browsing.title' })}
          paneSub={formatMsg({ id: 'ui-marccat.browsing.subtitle' }) + (this.props.resources.query)}
          appIcon={{ app: C.META.ICON_TITLE }}
        >
          <MultiColumnList
            fullWidth
            onRowClick={this.onRowClick}
            contentData={dataFirstPage}
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
            ]}
            columnMapping={columnMapping}
            columnWidths={{
              stringText: '40%',
              database: '20%',
              countTitleNameDocuments: '4%',
              countCrossReferences: '4%',
              countAuthorities: '4%',
              countDocuments: '4%',
              verificationlevel: '8%',
              indexingLanguage: '7%',
              accessPointlanguage: '9%'
            }}
          />
          <Row className={css.rowButtonBrowsing}>
            <Col xs={6}>
              <PreviousButton {...this.props} />
            </Col>
            <Col xs={6}>
              <NextButton {...this.props} />
            </Col>
          </Row>
        </Pane>
      </Paneset>
    );
  }
}
export default connect(AdvancedBrowsing, C.META.MODULE_NAME);
