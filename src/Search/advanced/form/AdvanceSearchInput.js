import * as React from 'react';
import { Row, Col } from '@folio/stripes-components/lib/LayoutGrid';
import { Field } from 'redux-form';
import { connect } from 'react-redux';

import css from '../../style/Search.css';


type Props = {
  defaultValue: string;
  onChange: Function;
}

function AdvanceSearchInput({ defaultValue, onChange } : Props) {
  return (
    <Row>
      <Col xs={12}>
        <Field
          defaultValue={defaultValue}
          onChange={onChange}
          rows="8"
          name="searchTextArea"
          id="searchTextArea"
          component="textarea"
          className={css.largeBox}
        />
      </Col>
    </Row>
  );
}

const mapStateToProps = state => ({
  data: state.marccat.data
});

const mapDispatchToProps = {
  performSearch: '@@ui-marccat/FIND'
};
export default connect(mapStateToProps, mapDispatchToProps)(AdvanceSearchInput);
