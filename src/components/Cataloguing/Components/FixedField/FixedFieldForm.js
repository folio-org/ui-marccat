import React, { useEffect } from 'react';
import { Accordion } from '@folio/stripes-components';
import { first } from 'lodash';
import { compose, withProps } from 'recompose';
import { reduxForm } from 'redux-form';
import { Localize, CheckBoxLabelField } from '../../../../shared';
import { REDUX, EMPTY_SPACED_STRING } from '../../../../config/constants';
import FixedField from './FixedField';
import FixedFieldArray from './FixedFieldArray';
import Leader from '../Record/Leader';
import * as MARC_CONSTANT from '../../Utils/MarcConstant';

/**
 *
 *
 * @param {*} { leaderData, record, ...props }
 * @returns
 */
function FixedFieldForm(props) {

  const { leaderData, record } = props;
  return (
    <form name="fixedFieldForm" style={{ textAlign: 'left' }}>
      <Accordion label={Localize({ key: 'cataloging.accordion.checkbox.label' })} id="suppress" separator={false}>
        <CheckBoxLabelField label="suppress from discovery" {...props} />
      </Accordion>
      <Accordion label="Leader" id="Leader">
        <Leader
          {...props}
          record={record}
          leaderData={leaderData}
          leaderCode={record.leader.code}
          leaderValue={record.leader.value}
        />
      </Accordion>
      <Accordion
        id="control-field-create-static"
        label={Localize({ key: 'cataloging.accordion.fixedfield.label' })}
      >
        <FixedField
          {...props}
          fixedfields={record.fields.filter(f => f.code < '006')}
        />
      </Accordion>
      <Accordion
        id="control-field-dynamic"
        label={Localize({ key: 'cataloging.accordion.fixedfield.editable.label' })}
      >
        <FixedFieldArray
          {...props}
          record={record}
          field={record.fields.filter(f => f.code > '005' && f.code < '010')}
        />
      </Accordion>
    </form>
  );
}

const enhance = compose(
  withProps(({ initialize, record, leaderData }) => ({
    initialize,
    record,
    leaderData
  }))
);

// eslint-disable-next-line no-func-assign
// FixedFieldForm = () => lifecycle({
//   componentDidMount() {
//     const { initialize, record, leaderData } = this.props;
//     const initializeData = {
//       [MARC_CONSTANT.VERIFICATION_LEVEL]: 1,
//       [MARC_CONSTANT.RECORD_CATALOGING_SOURCE_CODE]: '1',
//       [MARC_CONSTANT.VISUAL_RUNNING_TIME]: '---',
//       [MARC_CONSTANT.IMAGE_BIT_DEPTH]: '|||',
//       [MARC_CONSTANT.DATE_FIRST_PUBBLICATION]: EMPTY_SPACED_STRING,
//       [MARC_CONSTANT.DATE_LAST_PUBBLICATION]: EMPTY_SPACED_STRING,
//       [MARC_CONSTANT.TAGS._000]: record.leader.value,
//       [MARC_CONSTANT.TAGS._001]: first(record.fields.filter(f => f.code === MARC_CONSTANT.TAGS._001)).fixedField.displayValue,
//       [MARC_CONSTANT.TAGS._003]: (record.fields.filter(f => f.code === MARC_CONSTANT.TAGS._003).length !== 0) ? first(record.fields.filter(f => f.code === MARC_CONSTANT.TAGS._003)).fixedField.displayValue : '',
//       [MARC_CONSTANT.TAGS._005]: first(record.fields.filter(f => f.code === MARC_CONSTANT.TAGS._005)).fixedField.displayValue,
//       [MARC_CONSTANT.TAGS._006]: (record.fields.filter(f => f.code === MARC_CONSTANT.TAGS._006).length !== 0) ? first(record.fields.filter(f => f.code === MARC_CONSTANT.TAGS._006)).fixedField.displayValue : '',
//       [MARC_CONSTANT.TAGS._007]: (record.fields.filter(f => f.code === MARC_CONSTANT.TAGS._007).length !== 0) ? first(record.fields.filter(f => f.code === MARC_CONSTANT.TAGS._007)).fixedField.displayValue : '',
//       [MARC_CONSTANT.TAGS._008]: first(record.fields.filter(f => f.code === MARC_CONSTANT.TAGS._008)).fixedField.displayValue,
//       [MARC_CONSTANT.FIELD_NAME.LEADER]: record.leader.value,
//       leaderData,
//       [MARC_CONSTANT.FIELDS]: record.fields,
//       [MARC_CONSTANT.FIELD006]: (record.fields.filter(f => f.code === MARC_CONSTANT.TAGS._006).length === 0) ? [MARC_CONSTANT.EMPTY_FIXED_FIELD(MARC_CONSTANT.TAGS._006)] : record.fields.filter(f => f.code === MARC_CONSTANT.TAGS._006),
//       [MARC_CONSTANT.FIELD007]: (record.fields.filter(f => f.code === MARC_CONSTANT.TAGS._007).length === 0) ? [MARC_CONSTANT.EMPTY_FIXED_FIELD(MARC_CONSTANT.TAGS._007)] : record.fields.filter(f => f.code === MARC_CONSTANT.TAGS._007),
//       [MARC_CONSTANT.FIELD008]: first(record.fields.filter(f => f.code === MARC_CONSTANT.TAGS._008)),
//     };
//     initialize(initializeData);
//   }
// });

export default enhance(reduxForm({
  form: REDUX.FORM.FIXED_FIELD_FORM,
  navigationCheck: true,
  enableReinitialize: true,
  destroyOnUnmount: true
})(FixedFieldForm));
