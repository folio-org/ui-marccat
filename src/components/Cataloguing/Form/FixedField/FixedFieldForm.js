import React from 'react';
import { Accordion } from '@folio/stripes-components';
import { first } from 'lodash';
import { compose, lifecycle } from 'recompose';
import { reduxForm } from 'redux-form';
import { Localize, CheckBoxLabelField } from '../../../../shared';
import { REDUX, EMPTY_SPACED_STRING } from '../../../../config/constants';
import FixedField from './FixedField';
import FixedFieldArray from './FixedFieldArray';
import Leader from '../Common/Leader';
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

const withLifecycle = lifecycle({
  componentDidMount() {
    const { initialize, record } = this.props;
    const initializeData = {
      [MARC_CONSTANT.VERIFICATION_LEVEL]: 1,
      [MARC_CONSTANT.RECORD_CATALOGING_SOURCE_CODE]: '1',
      [MARC_CONSTANT.VISUAL_RUNNING_TIME]: '---',
      [MARC_CONSTANT.IMAGE_BIT_DEPTH]: '|||',
      [MARC_CONSTANT.DATE_FIRST_PUBBLICATION]: EMPTY_SPACED_STRING,
      [MARC_CONSTANT.DATE_LAST_PUBBLICATION]: EMPTY_SPACED_STRING,
      [MARC_CONSTANT.TAGS._001]: first(record.fields.filter(f => f.code === MARC_CONSTANT.TAGS._001)).fixedField.displayValue,
      [MARC_CONSTANT.TAGS._003]: (record.fields.filter(f => f.code === MARC_CONSTANT.TAGS._003).length !== 0) ? first(record.fields.filter(f => f.code === MARC_CONSTANT.TAGS._003)).fixedField.displayValue : '',
      [MARC_CONSTANT.TAGS._005]: first(record.fields.filter(f => f.code === MARC_CONSTANT.TAGS._005)).fixedField.displayValue,
      [MARC_CONSTANT.TAGS._006]: (record.fields.filter(f => f.code === MARC_CONSTANT.TAGS._006)),
      [MARC_CONSTANT.TAGS._007]: (record.fields.filter(f => f.code === MARC_CONSTANT.TAGS._00)),
      [MARC_CONSTANT.TAGS._008]: first(record.fields.filter(f => f.code === MARC_CONSTANT.TAGS._008)).fixedField.displayValue,
      [MARC_CONSTANT.FIELD_NAME.LEADER]: record.leader.value,
    };
    initialize(initializeData);
  }
});


export default compose(
  reduxForm({
    form: REDUX.FORM.FIXED_FIELD_FORM,
    navigationCheck: true,
    enableReinitialize: true,
    destroyOnUnmount: true
  }),
  withLifecycle,
)(FixedFieldForm);
