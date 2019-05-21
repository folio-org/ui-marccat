import React, { useEffect, useState } from 'react';
import { Field, FieldArray } from 'redux-form';
import { RepeatableField } from '@folio/stripes-components';
import { first } from 'lodash';
import { connect, useSelector } from 'react-redux';
import Tag00X from './Tag00X';
import { TAGS, EMPTY_FIXED_FIELD } from '../../Utils/MarcConstant';


function RenderField006(props) {
  const { fields, headertype006 } = props;
  return (
    fields.map((field, index) => (
      <Tag00X
        {...props}
        key={index}
        label={TAGS._006}
        name={`${field}.code`}
        element={fields.get(index)}
        headingTypes={headertype006}
      />
    ))
  );
}

function RenderField007(props) {
  const { fields, headertype007 } = props;
  return (
    fields.map((field, index) => (
      <Tag00X
        {...props}
        key={index}
        label={TAGS._007}
        name={`${field}.code`}
        element={fields.get(index)}
        headingTypes={headertype007}
      />
    ))
  );
}

function RenderField008(props) {
  const { element, headertype008 } = props;
  return (
    <Tag00X
      {...props}
      label={TAGS._008}
      element={element}
      headingTypes={headertype008}
    />
  );
}

function FixedFieldArray(props) {
  const { record, headertype006, headertype007, headertype008 } = props;

  const [field, setField] = useState(record.fields);
  const [field006, setField006] = useState(record.fields.filter(f => f.code === TAGS._006));
  const [field007, setField007] = useState(record.fields.filter(f => f.code === TAGS._007));

  useEffect(() => {
    if (field006.length === 0) setField006([EMPTY_FIXED_FIELD(TAGS._006)]);
    if (field007.length === 0) setField007([EMPTY_FIXED_FIELD(TAGS._007)]);
    setField([...field006, ...field007]);
  }, [field006, field006.length, field007, field007.length]);

  return (
    <React.Fragment>
      <RepeatableField
        {...props}
        addLabel="+ Add 006"
        fields={field}
        renderField={(f, index) => (
          <Tag00X
            key={index}
            {...props}
            label={f.code}
            element={f}
            headingTypes={headertype006}
          />
        )}
      />
      <RepeatableField
        {...props}
        addLabel="+ Add 007"
        fields={record.fields}
        renderField={(f, index) => (
          <Tag00X
            key={index}
            {...props}
            label={f.code}
            element={f}
            headingTypes={headertype007}
          />
        )}
      />
      <Field
        name={TAGS._008}
        element={first(record.fields.filter(f => f.code === TAGS._008))}
        component={RenderField008}
        headingTypes={headertype008}
        {...props}
      />
    </React.Fragment>
  );
}


export default (connect(
  ({ marccat: { data: {
    headertype006,
    headertype007,
    headertype008 } }
  }) => ({
    headertype006,
    headertype007,
    headertype008,
  })
)((FixedFieldArray)));
