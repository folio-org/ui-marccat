/**
 * @format
 * @flow
 */
import * as React from 'react';
import { RepeatableField, Row, Col } from '@folio/stripes/components';
import AddTagButton from '../../Button/AddTagButton';
import MarcField from '../../MarcField';
import style from '../../../Style/index.css';

export default class Tag00X extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      fields: []
    };
  }

  handleAdd = () => {
    this.setState(({ fields }) => ({
      fields: fields.concat({})
    }));
  }

  handleRemove = index => {
    this.setState(({ fields }) => ({
      fields: [...fields.slice(0, index), ...fields.slice(index + 1)]
    }));
  }

  render() {
    let { fields } = this.state;
    const { t } = this.props;
    fields = t;
    return (
      <RepeatableField
        fields={fields}
        onAdd={this.handleAdd}
        onRemove={this.handleRemove}
        renderField={() => (
          <Row middle="xs">
            <Col xs={6}>
              <div className={style.controlFieldContainer}>
                <MarcField
                  {...this.props}
                  withIcon
                  label={t.fixedField.code}
                  name={t.fixedField.code}
                  value={t.fixedField.displayValue}
                />
              </div>
            </Col>
            <Col xs={2}>
              <AddTagButton {...this.props} tagCode={t.code} />
            </Col>
          </Row>)}
      />
    );
  }
}
