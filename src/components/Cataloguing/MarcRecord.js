/* eslint-disable react/no-unused-state */
/**
 * @format
 * @flow
 */
import React from 'react';
import {
  Pane,
  Paneset,
  AccordionSet,
  Callout,
  Row,
  Accordion,
  KeyValue,
  Icon
} from '@folio/stripes/components';
import { AppIcon } from '@folio/stripes-core';
import { FormattedMessage } from 'react-intl';
import { isEmpty, first, union, sortBy } from 'lodash';
import {
  VariableFields,
  MarcLeader,
  FixedFields,
  RECORD_ACTION
} from '.';
import { ActionMenuTemplate, SingleCheckboxIconButton } from '../../lib';
import * as C from '../../shared/Constants';
import { headingAction, headingDeleteAction, createRecordAction } from './Actions/MarcActionCreator';
import style from './Style/style.css';
import { findParam } from '../../redux';


class MarcRecord extends React.Component<{}, {}> {
  constructor(props) {
    super(props);
    this.state = {
      page: RECORD_ACTION.CREATION_MODE
    };
    this.handleClose = this.handleClose.bind(this);
  }

  componentDidMount() {
    const isCreateNew = findParam('mode');
    if (isCreateNew !== RECORD_ACTION.CREATION_MODE) { this.setState({ page: RECORD_ACTION.EDIT_MODE }); }
  }

  createNewHeading = () => {
    const { dispatch } = this.props;
    dispatch(headingAction);
  };

  handleClose = () => {
    const { router, toggleFilterPane, emptyRecord } = this.props;
    toggleFilterPane();
    const id = emptyRecord.id;
    router.push(`/marccat/search?id=${id}`);
  };

  onDelete = item => {
    const { dispatch } = this.props;
    const heading = {
      ind1: item.variableField.ind1,
      ind2: item.variableField.ind2,
      displayValue: item.variableField.displayValue,
      tag: item.code,
      categoryCode: item.variableField.categoryCode,
      keyNumber: item.variableField.keyNumber
    };
    dispatch(headingDeleteAction(heading));
  };

  composeBodyJson = () => {
    const { dispatch, data, data: { data: { emptyRecord } }, store: { getState } } = this.props;
    const formData = getState().form.bibliographicRecordForm.values;
    const tagVariableData = getState().form.marcEditableListForm.values.items;

    const bibliographicRecord = Object.assign({}, emptyRecord.results);
    bibliographicRecord.leader.value = formData.Leader;

    const recordTemplate = {
      id: first(data.template.records).id,
      name: first(data.template.records).name,
      type: 'B',
      fields: Object.values(emptyRecord.results.fields.reduce((acc, cur) => Object.assign(acc, { [cur.code]: cur }), {}))
    };
    bibliographicRecord.fields = Object.values(bibliographicRecord.fields.reduce((acc, cur) => Object.assign(acc, { [cur.code]: cur }), {}));
    bibliographicRecord.fields = union(bibliographicRecord.fields, tagVariableData);
    bibliographicRecord.fields = sortBy(bibliographicRecord.fields, 'code');

    const recordContainer = {
      bibliographicRecord,
      recordTemplate
    };

    dispatch(createRecordAction(recordContainer));
  }

  render() {
    const {
      settings,
      leaderData,
      datastore: { emptyRecord },
    } = this.props;
    const defaultTemplate = (settings) ? settings.defaultTemplate : C.SETTINGS.DEFAULT_TEMPLATE;
    const bibliographicRecord = !isEmpty(emptyRecord) ? emptyRecord.results : {};
    return (!bibliographicRecord) ?
      (
        <Paneset static>
          <Pane
            defaultWidth="fullWidth"
            paneTitle={(bibliographicRecord) ? 'New Monograph' : 'New Monograph'}
            paneSub={(bibliographicRecord) ? 'id. ' + bibliographicRecord.id : 'id. ' + defaultTemplate.id}
            appIcon={<AppIcon app={C.META.ICON_TITLE} />}
            actionMenu={ActionMenuTemplate}
            dismissible
            onClose={() => this.handleClose()}
            lastMenu={this.renderButtonMenu()}
          >
            <Icon icon="spinner-ellipsis" />
          </Pane>
        </Paneset>
      ) :
      (
        <React.Fragment>
          <Paneset static>
            <Pane
              defaultWidth="fullWidth"
              paneTitle={(bibliographicRecord) ? 'New Monograph' : 'New Monograph'}
              paneSub={(bibliographicRecord) ? 'id. ' + bibliographicRecord.id : 'id. ' + defaultTemplate.id}
              appIcon={<AppIcon app={C.META.ICON_TITLE} />}
              actionMenu={ActionMenuTemplate}
              dismissible
              onClose={() => this.handleClose()}
              lastMenu={this.renderButtonMenu()}
            >
              <Row center="xs">
                <div className={style.recordContainer}>
                  <AccordionSet>
                    <KeyValue
                      value={<h2>{bibliographicRecord.name}</h2>}
                    />
                    <form name="bibliographicRecordForm" onSubmit={this.saveRecord}>
                      <Accordion label={<FormattedMessage id="ui-marccat.cataloging.accordion.checkbox.label" />} id="suppress" separator={false}>
                        <SingleCheckboxIconButton labels={[<FormattedMessage id="ui-marccat.cataloging.checkbox.label" />]} pullLeft widthPadding />
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
                      <Accordion
                        label={<FormattedMessage id="ui-marccat.cataloging.accordion.fixedfield.label" />}
                        id="control-field-create-record"
                      >
                        <FixedFields
                          {...this.props}
                          record={bibliographicRecord}
                          fixedFields={bibliographicRecord.fields}
                        />
                      </Accordion>
                    </form>
                    <Accordion
                      label={<FormattedMessage id="ui-marccat.cataloging.accordion.variablefield.label" />}
                      id="variable-field"
                    >
                      <VariableFields
                        fields={bibliographicRecord.fields.filter(f => f.fixedField === undefined || !f.fixedField)}
                        onDelete={this.onDelete}
                        onSave={this.onSave}
                        onUpdate={this.onUpdate}
                        onCreate={this.onCreate}
                        {...this.props}
                      />
                    </Accordion>
                  </AccordionSet>
                </div>
              </Row>
            </Pane>
          </Paneset>
          <Callout ref={this.callout} />
        </React.Fragment>
      );
  }
}

export default MarcRecord;
