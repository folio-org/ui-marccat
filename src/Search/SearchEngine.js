import React from 'react';
import Button from '@folio/stripes-components/lib/Button';
import TextField from '@folio/stripes-components/lib/TextField';
import { Row, Col } from 'react-flexbox-grid';
import type { Props } from '../Core/type/props';

type P = Props & {
  inputValue: string,
}

export default function SearchEngine(props: P) {
  return (
    <Row>
      <Row>
        <Col xs={12}>
          <TextField
            style={{ width: '100%', marginBottom: '10px' }}
            defaultValue={props.inputValue}
            placeholder="What are you searching for?"
            rows="2"
            name="searchTextArea"
            id="searchTextArea"
            component="textarea"
          />
        </Col>
      </Row>
      <Row>
        <Col xs={6}>
          <Button fullWidth buttonStyle="primary" onClick={() => {}}>Search</Button>
        </Col>
        <Col xs={6}>
          <Button fullWidth buttonStyle="primary" onClick={() => {}}>Scan</Button>
        </Col>
      </Row>
    </Row>
  );
}
