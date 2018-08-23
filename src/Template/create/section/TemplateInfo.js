import React from 'react';
import { Field } from 'redux-form';
import { Row, Col } from '@folio/stripes-components/lib/LayoutGrid';
import RadioButtonGroup from '@folio/stripes-components/lib/RadioButtonGroup';
import RadioButton from '@folio/stripes-components/lib/RadioButton';
import TextField from '@folio/stripes-components/lib/TextField';
import { Accordion } from '@folio/stripes-components/lib/Accordion';

import css from '../../styles/Template.css';

type TemplateInfoProps = {
    translate: () => void;
    onToggle: () => void;
    expanded: boolean;
    accordionId: string;
};

const TemplateInfo = ({ translate, expanded, accordionId, onToggle }: TemplateInfoProps) => {
  return (
    <Accordion
      label={translate({ id: 'ui-marccat.template.detail.information.title' })}
      open={expanded}
      id={accordionId}
      onToggle={onToggle}
    >
      <Row id="section-name">
        <Col xs={6}>
          <Field
            className={css.largeField}
            label={translate({
              id: 'ui-marccat.template.form.name',
            })}
            name="templateName"
            placeholder={translate({
              id: 'ui-marccat.template.form.name',
            })}
            aria-label={translate({
              id: 'ui-marccat.template.form.name',
            })}
            fullWidth
            id="input-template-name"
            withRef
            validationEnabled={false}
            component={TextField}
          />
        </Col>
        <Col xs={6}>
          <Field
            name="subGroup"
            component={RadioButtonGroup}
            label="Group"
            className={css.colRadio}
          >
            <RadioButton
              label="W"
              id="subGroupW"
              value="W"
              inline
            />
            <RadioButton
              label="E"
              id="subGroupE"
              value="E"
              inline
            />
            <RadioButton
              label="M"
              id="subGroupM"
              value="M"
              inline
            />
          </Field>
        </Col>
      </Row>
    </Accordion>
  );
};

export default TemplateInfo;
