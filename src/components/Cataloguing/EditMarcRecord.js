import React, { Component } from 'react';
import { connect } from 'react-redux';
import stripesForm from '@folio/stripes/form';
import {
  Pane,
  Paneset,
  AccordionSet,
  Row,
  TextField,
  Col,
  Button,
  Accordion,
  KeyValue,
  Icon
} from '@folio/stripes/components';
import { Field } from 'redux-form';
import MarcField from './Marc/MarcField';
import { ActionMenuTemplate, SingleCheckboxIconButton } from '../../lib';
import { MarcLeader, FixedFields } from '.';
import * as C from '../../utils/Constant';
import { injectCommonProp } from '../../core';
import { ActionTypes } from '../../redux/actions';
import { findParam } from '../../redux/helpers';
import style from './Style/style.css';

class EditMarcRecord extends Component {
  // eslint-disable-next-line react/no-deprecated
  componentWillMount() {
    const { store } = this.props;
    const id = findParam('id');
    store.dispatch({ type: ActionTypes.LOCK_RECORD, id });
  }

  handleClose = () => {
    const { dispatch, router, toggleFilterPane } = this.props;
    dispatch({ type: ActionTypes.FILTERS, payload: {}, filterName: '', filterChecked: false });
    toggleFilterPane();
    router.push('/marccat/search');
  };

  renderField = ({ input, label, type, meta: { touched, error } }) => (
    <div>
      <div>
        <input {...input} type={type} placeholder={label} />
        {touched && error && <span>{error}</span>}
      </div>
    </div>
  )


  render() {
    const {
      translate,
      recordDetail,
      headerTypes006IsLoading,
      headerTypes007IsLoading,
      headerTypes008IsLoading,
      leaderData
    } = this.props;
    let bibliographicRecord;
    let variableFields;
    if (recordDetail) {
      bibliographicRecord = recordDetail.bibliographicRecord;
      variableFields = bibliographicRecord.fields.filter(f => f.fixedField === undefined || !f.fixedField);
    }
    const fieldStyle = { flex: '0 0 20%', width: ' 20%', padding: '6px' };
    const lastFieldStyle = { flex: '0 0 40%', width: ' 40%', padding: '6px' };
    return (!bibliographicRecord) ? <Icon icon="spinner-ellipsis" /> : (
      <React.Fragment>
        <Paneset static>
          <Pane
            defaultWidth="fullWidth"
            dismissible
            onClose={this.handleClose}
            paneTitle="Edit Record"
            appIcon={{ app: C.META.ICON_TITLE }}
            actionMenu={ActionMenuTemplate}
          >
            <Row center="xs">
              <div className={style.recordContainer}>
                <AccordionSet>
                  <KeyValue />
                  <form name="bibliographicRecordForm" onSubmit={this.saveRecord}>
                    <Accordion label="Suppress" id="suppress" separator={false}>
                      <SingleCheckboxIconButton labels={['Suppress from Discovery']} pullLeft widthPadding />
                    </Accordion>
                    <Accordion label="Leader" id="leader">
                      <MarcLeader
                        {...this.props}
                        readOnly
                        leaderData={leaderData}
                        leaderCode={bibliographicRecord.leader.code}
                        leaderValue={bibliographicRecord.leader.value}
                      />
                    </Accordion>
                    <Accordion label="Control fields (001, 003, 005)" id="control-field">
                      <FixedFields
                        {...this.props}
                        recordDetail={recordDetail}
                        headerTypes006IsLoading={headerTypes006IsLoading}
                        headerTypes007IsLoading={headerTypes007IsLoading}
                        headerTypes008IsLoading={headerTypes008IsLoading}
                        record={bibliographicRecord}
                      />
                    </Accordion>
                    <Accordion label={translate({ id: 'ui-marccat.cataloging.variablefield.section.label' })} id="variable-field">
                      <Row between="xs" className={style.marcEditableListFormHeader}>
                        <Col xs>
                          <Row end="xs" style={{ float: 'right' }}>
                            <Col xs>
                              <Button
                                buttonStyle="primary"
                                onClick={() => {}}
                              >
                                <Icon icon="edit">Edit</Icon>
                              </Button>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                      {variableFields.map((f, i) => (
                        <Row className={style.marcEditableListFormHeader} key={i}>
                          <Col xs={12}>
                            <div className={style.marcEditableListRow} role="row">
                              <div style={fieldStyle}>
                                <MarcField
                                  {...this.props}
                                  id={`${i}-variablefield-${f.variableField.code}`}
                                  name={`${i}-variablefield-${f.variableField.code}`}
                                  component={TextField}
                                  value={f.variableField.code}
                                />
                              </div>
                              <div style={fieldStyle}>
                                <MarcField
                                  {...this.props}
                                  id={`${i}-variablefield-${f.variableField.ind1}`}
                                  name={`${i}-variablefield-${f.variableField.ind1}`}
                                  component={TextField}
                                  value={f.variableField.ind1}
                                />
                              </div>
                              <div style={fieldStyle}>
                                <MarcField
                                  {...this.props}
                                  id={`${i}-variablefield-${f.variableField.ind2}`}
                                  name={`${i}-variablefield-${f.variableField.ind2}`}
                                  component={TextField}
                                  value={f.variableField.ind2}
                                />
                              </div>
                              <div style={lastFieldStyle}>
                                {this.renderField(f)}
                              </div>
                            </div>
                          </Col>
                        </Row>
                      ))}
                    </Accordion>
                  </form>
                </AccordionSet>
              </div>
            </Row>
          </Pane>
        </Paneset>
      </React.Fragment>
    );
  }
}

export default stripesForm({
  form: 'bibliographicRecordForm',
  navigationCheck: true,
  enableReinitialize: true,
  destroyOnUnmount: false,
})(connect(
  ({ marccat: { recordDetail, leaderData, headerTypes006, headerTypes007, headerTypes008 } }) => ({
    recordDetail: recordDetail.record,
    headerTypes006Result: headerTypes006.records,
    leaderData: leaderData.records,
    headerTypes006IsLoading: headerTypes006.isLoading,
    headerTypes007Result: headerTypes007.records,
    headerTypes007IsLoading: headerTypes007.isLoading,
    headerTypes008Result: headerTypes008.records,
    headerTypes008IsLoading: headerTypes008.isLoading
  }),
)(injectCommonProp(EditMarcRecord)));
