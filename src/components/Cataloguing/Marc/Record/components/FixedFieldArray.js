import React from 'react';
import { Field, FieldArray } from 'redux-form';
import { first } from 'lodash';
import { Col } from '@folio/stripes/components';
import { connect } from 'react-redux';
import Tag00X from './Tag00X';
import { TAGS, TAGS_NAME } from '../../../Utils/MarcConstant';
import { MarcField } from '../../Form/FixedField/Field';
import SelectField from '../Field/SelectField';

import style from '../../../Style/index.css';


const RenderField = ({ input, name, label, fields, element, meta: { touched, error, submitFailed }, headingTypes, dropdwnComponent, ...props }) => (
  <div className={style.fieldContainer} no-padding={true.toString()}>
    <MarcField
      {...props}
      prependIcon
      label={(element.code === TAGS._006) ? TAGS_NAME._006 : TAGS_NAME._007}
      name={name}
      prepend="true"
    />
    <div className={(expand) ? style.leaderResultsActive : style.leaderResults}>
      <Col xs={12}>
        {headingTypes &&
        <Field
          {...props}
          label={`Tag${element.code}`}
          name={`Tag${fields}.code`}
          component={SelectField}
          onChange={input.onChange}
          placeholder={'Select Heading types for '.concat(element.code)}
          dataOptions={headingTypes.results.headingTypes}
        />}
        {dropdwnComponent}
      </Col>
    </div>
  </div>
);


const RenderField006 = ({ fields, meta: { touched, error, submitFailed }, headertype006, ...props }) => (
  <React.Fragment>
    {fields.map((field, index) => (
      <Field
        {...props}
        key={index}
        name={`${fields}.code`}
        element={fields.get(index)}
        headingTypes={headertype006}
        component={RenderField}
      />
    ))}
  </React.Fragment>
);

const RenderField007 = ({ fields, meta: { touched, error, submitFailed }, headertype007, ...props }) => (
  <React.Fragment>
    {fields.map((field, index) => (
      <Field
        {...props}
        key={index}
        name={`${fields}.code`}
        element={fields.get(index)}
        headingTypes={headertype007}
        component={RenderField}
      />
    ))}
  </React.Fragment>
);


const FixedFieldArray = ({ record, headertype008, ...props }) => {
  return (
    <React.Fragment>
      <FieldArray name="fields006" component={RenderField006} {...props} />
      <FieldArray name="fields007" component={RenderField007} {...props} />
      <Tag00X
        {...props}
        prepend="true"
        name={TAGS_NAME._008}
        element={first(record.fields.filter(f => f.code === TAGS._008))}
        headingTypes={headertype008}
      />
    </React.Fragment>
  );
};

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
