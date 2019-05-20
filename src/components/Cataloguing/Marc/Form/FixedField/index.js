import * as React from 'react';
import { Accordion } from '@folio/stripes-components';
import { reduxForm } from 'redux-form';
import { Localize, CheckBoxLabelField } from '../../../../../shared';
import FixedFields from '../../Record/Components/FidexFieldProvider';
import { REDUX, EMPTY_SPACED_STRING } from '../../../../../config/constants';

/**
 *
 *
 * @param {*} { leaderData, record, ...props }
 * @returns
 */
function FixedFieldForm({ leaderData, record, ...props }) {
  return (
    <form name="fixedFieldForm" style={{ textAlign: 'left' }}>
      <Accordion label={Localize({ key: 'cataloging.accordion.checkbox.label' })} id="suppress" separator={false}>
        <CheckBoxLabelField label="suppress from discovery" {...props} />
      </Accordion>
      <FixedFields
        {...props}
        id="form-fixed-field"
        // eslint-disable-next-line react/destructuring-assignment
        leaderData={leaderData || props.datasore.leaderData}
        record={record}
      />
    </form>
  );
}

export default reduxForm({
  form: REDUX.FORM.FIXED_FIELD_FORM,
  navigationCheck: true,
  enableReinitialize: true,
  destroyOnUnmount: true,
})(FixedFieldForm);
