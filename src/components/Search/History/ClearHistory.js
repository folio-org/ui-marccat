// @flow
import * as React from 'react';
import { Layout, Headline, Col, Row, IconButton } from '@folio/stripes/components';
import { Localize } from '../../../shared/utils/Function';
import style from '../Style/index.css';

export default ({ ...props }) => {
  const { searchPerformed, resetHistory } = props;
  return (
    <Layout className="display-flex flex-align-items-center">
      <Row>
        <Col xs={6}>
          <Headline size="small" margin="medium" tag="h3">
            {Localize({ key: 'search.history.title', value: searchPerformed })}
          </Headline>
        </Col>
        <Col xs={6}>
          <IconButton
            key="icon-trash-history"
            icon="trash"
            badgeCount={searchPerformed}
            onClick={resetHistory}
            className={style['align-right']}
          />
        </Col>
      </Row>
    </Layout>
  );
};
