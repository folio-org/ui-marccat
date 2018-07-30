import React from 'react';
import { Row, Col } from '@folio/stripes-components/lib/LayoutGrid';
import Select from '@folio/stripes-components/lib/Select';
import Textarea from '@folio/stripes-components/lib/TextArea';
import Button from '@folio/stripes-components/lib/Button';
import { FormattedMessage } from 'react-intl';
import * as C from '../../Utils';

type SubfieldFormProps = {
};

type SubfieldFormState = {
};

class SubfieldForm extends React.Component<SubfieldFormProps, SubfieldFormState> {
  render() {
    return (
      <Row>
        <Col xs={2}>
          <Select />
        </Col>
        <Col xs={6}>
          <Textarea />
        </Col>
        <Col>
          <Button>
            <FormattedMessage
              id="ui-marccat.button.cancel"
            />
          </Button>
        </Col>
      </Row>
    );
  }
}

export default SubfieldForm;
