/**
 * @format
 * @flow
 */
import * as React from 'react';
import Select from '@folio/stripes-components/lib/Select';
import { Row, Col } from '@folio/stripes-components/lib/LayoutGrid';
import TextArea from '@folio/stripes-components/lib/TextArea';
import { FormattedMessage } from 'react-intl';
import { getDateNow } from '../../Utils/TemplateUtils';


type FixedFieldFormProps = {
    tag: Object,
    selectArray: Array
};

type FixedFieldFormState = {};

class FixedFieldForm extends React.Component<FixedFieldFormProps, FixedFieldFormState> {
  constructor(props) {
    super(props);
    this.renderFixedFieldSelect = this.renderFixedFieldSelect.bind(this);
  }

  renderFixedFieldSelect(input, tag) {
    const toRender = [];
    // only for 008
    if (tag && tag.code === '008') {
      toRender.push(
        <Row>
          <Col xs={4}>
            <FormattedMessage id="ui-marccat.template.catalogDate" />
          </Col>
          <Col xs={8}>
            <TextArea
              {...this.props}
              value={getDateNow()}
            />
          </Col>
        </Row>
      );
    }
    input.map(current => {
      return toRender.push(
        <Row>
          <Col xs={4}>
            <FormattedMessage id={`ui-marccat.template.${current.label}`} />
          </Col>
          <Col xs={8}>
            <Select dataOptions={current.values} />
          </Col>
        </Row>
      );
    });
    return toRender;
  }

  render() {
    return (
      <div>
        {this.renderFixedFieldSelect(this.props.selectArray, this.props.tag)}
      </div>
    );
  }
}

export default FixedFieldForm;
