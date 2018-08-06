import React from 'react';
import { Row, Col } from '@folio/stripes-components/lib/LayoutGrid';
import Select from '@folio/stripes-components/lib/Select';
import css from '../../style/Search.css';

export default class SearchSelect extends React.Component {
  render() {
    const { categories, innerIndexes, constraintIndexes } = this.props; // eslint-disable-line react/prop-types
    return (
      <Row>
        <Col xs={12} className={css.colFirstSelect}>
          {categories &&
            <Select
              name="categorySelect"
              value={this.state.firstSelect}
              onChange={this.handleChangeFirstSelect}
            >
              {'options'}
            </Select>
          }
        </Col>
        <Col xs={12}>
          {innerIndexes &&
            <Select
              value={this.state.secondSelect}
              onChange={this.handleChangeSecondSelect}
            >
              <option value="">--</option>
              {'optionsInnerIndex'}
            </Select>
          }
        </Col>
        <Col xs={12}>
          {constraintIndexes && constraintIndexes.records.length > 0 &&
            <Select
              value={this.state.thirdSelect}
              onChange={this.handleChangeThirdSelect}
            >
              <option value="">--</option>
              {'optionsConstraintIndex'}
            </Select>
          }
        </Col>
      </Row>
    );
  }
}
