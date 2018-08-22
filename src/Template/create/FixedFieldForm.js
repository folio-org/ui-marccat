/**
 * @format
 */
import * as React from 'react';
import Select from '@folio/stripes-components/lib/Select';
import { Row, Col } from '@folio/stripes-components/lib/LayoutGrid';
import TextArea from '@folio/stripes-components/lib/TextArea';
import { FormattedMessage } from 'react-intl';
import { getDateNow, organize } from '../../Utils/TemplateUtils';


type FixedFieldFormProps = {
    tag: Object,
    fetchData: Array,
    defaultValues: Object
};

class FixedFieldForm extends React.Component<FixedFieldFormProps, {}> {
  constructor(props) {
    super(props);
    this.renderFixedFieldSelect = this.renderFixedFieldSelect.bind(this);
  }

  renderFixedFieldSelect(input, tag, defaultValues) {
    const arrayInput = organize(input, defaultValues);
    const toRender = [];
    // only for 008
    if (tag && tag.code === '008') {
      toRender.push(
        <Row>
          <Col xs={2}>
            <FormattedMessage id="ui-marccat.template.catalogDate" />
          </Col>
          <Col xs={5}>
            <TextArea
              {...this.props}
              value={getDateNow()}
            />
          </Col>
        </Row>
      );
      toRender.push(
        <Row>
          <Col xs={2}>
            <FormattedMessage id="ui-marccat.template.date1" />
          </Col>
          <Col xs={5}>
            <TextArea
              {...this.props}
            />
          </Col>
        </Row>
      );
      toRender.push(
        <Row>
          <Col xs={2}>
            <FormattedMessage id="ui-marccat.template.date2" />
          </Col>
          <Col xs={5}>
            <TextArea
              {...this.props}
            />
          </Col>
        </Row>
      );
    }
    arrayInput.map(current => {
      return toRender.push(
        <Row>
          <Col xs={2}>
            <FormattedMessage id={`ui-marccat.template.${current.label}`} />
          </Col>
          <Col xs={5}>
            <Select
              dataOptions={current.values}
              value={current.default}
              /* onChange={(e) => this.props.handleChange("", e)} */
            />
          </Col>
        </Row>
      );
    });
    return toRender;
  }

  render() {
    return (
      <div>
        {this.renderFixedFieldSelect(this.props.fetchData, this.props.tag, this.props.defaultValues)}
      </div>
    );
  }
}

export default FixedFieldForm;
