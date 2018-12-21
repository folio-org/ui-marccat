import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Icon, Selection } from '@folio/stripes/components';
import { injectCommonProp, Props } from '../../../../core';
import style from '../style.css';

type P = Props & {
}

export class Custom008 extends React.Component<P, {}> {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { headerTypesResult, tagValuesResults } = this.props;

    if (headerTypesResult === undefined || tagValuesResults === undefined) {
      return <Icon icon="spinner-ellipsis" />;
    } else {
      return (
        <div className={style.rcornerspanel} id="rcornerspanel">
          {
            (headerTypesResult) &&
            <Row>
              <Col xs={4}>
                <Selection
                  label="Header types"
                  placeholder="Select header..."
                  dataOptions={headerTypesResult.headingTypes}
                />
              </Col>
            </Row>
          }
        </div>
      );
    }
  }
}

export default (connect(
  ({ marccat: { headerTypes008 } }) => ({
    headerTypesResult: headerTypes008.records }),
)(injectCommonProp(Custom008)));
