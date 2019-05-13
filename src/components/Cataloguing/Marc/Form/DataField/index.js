import * as React from 'react';
import { Accordion } from '@folio/stripes-components';
import { reduxForm } from 'redux-form';
// import { compose } from 'redux';
// import { connect } from 'react-redux';
import { Localize, SingleCheckboxIconButton } from '../../../../../shared';
import DataFields from '../../Record/DataFields';
import { REDUX, EMPTY_STRING } from '../../../../../config/constants';


const DataFieldForm = ({ leaderData, record, ...props }) => (
  <form name="dataFieldForm">
    <Accordion label={Localize({ id: 'cataloging.accordion.checkbox.label' })} id="suppress" separator={false}>
      <SingleCheckboxIconButton labels={[Localize({ id: 'cataloging.checkbox.label' })]} pullLeft widthPadding />
    </Accordion>
    <DataFields
      {...props}
      id="form-fixed-field"
      leaderData={leaderData}
      record={record}
    />
  </form>
);

export default
reduxForm({
  form: REDUX.FORM.DATA_FIELD_FORM,
  enableReinitialize: true,
  initialValues: {
    verificationLevel: 1,
    recordCataloguingSourceCode: '1',
    visualRunningTime: '---',
    imageBitDepth: '|||',
    dateFirstPublication: EMPTY_STRING,
    dateLastPublication: EMPTY_STRING,
  }
})(DataFieldForm);
