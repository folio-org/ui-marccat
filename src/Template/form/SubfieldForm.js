import React from 'react';
import { Row, Col } from '@folio/stripes-components/lib/LayoutGrid';
import Select from '@folio/stripes-components/lib/Select';
import Textarea from '@folio/stripes-components/lib/TextArea';
import Button from '@folio/stripes-components/lib/Button';
import { FormattedMessage } from 'react-intl';

type SubfieldFormProps = {
  subfields: Array
};

type SubfieldFormState = {
};

class SubfieldForm extends React.Component<SubfieldFormProps, SubfieldFormState> {
  constructor(props) {
    super(props);
    this.remapSubfields = this.remapSubfields.bind(this);
  }

  remapSubfields(subfields) {
    const result = [];
    if (subfields.length > 0) {
      subfields.map(element => {
        const obj = {
          value: element,
          label: element
        };
        return result.push(obj);
      });
    }
    return result;
  }

  render() {
    return (
      <Row>
        <Col xs={2}>
          <Select
            dataOptions={this.remapSubfields(this.props.subfields)}
          />
        </Col>
        <Col xs={6}>
          <Textarea />
        </Col>
        <Col xs={4}>
          <Row>
            <Col xs={12}>
              <Button>
                <FormattedMessage
                  id="ui-marccat.template.tag.delete"
                />
              </Button>
            </Col>
          </Row>

          <Row>
            <Col xs={12}>
              <Button>
                <FormattedMessage
                  id="ui-marccat.template.add.subfield"
                />
              </Button>
            </Col>
          </Row>

        </Col>
      </Row>
    );
  }
}

export default SubfieldForm;
