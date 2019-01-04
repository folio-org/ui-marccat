/* eslint-disable no-unused-vars */
/**
 * @format
 * @flow
 */
/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
import React from 'react';
import { connect } from 'react-redux';
import {
  Pane,
  Paneset,
  AccordionSet,
  Row,
  Accordion,
  KeyValue,
  Icon
} from '@folio/stripes/components';
import { reduxForm } from 'redux-form';
import { Props, injectCommonProp } from '../../core';
import { ActionMenuTemplate } from '../../lib';
import { VariableFields } from '.';
import MarcField from './Marc/MarcField';
import * as C from '../../utils/Constant';
import { SingleCheckboxIconButton } from '../../lib/components/Button/OptionButton';
import type { VariableField } from '../../core';
import style from './Style/style.css';
import { MarcLeader } from './Marc/MarcLeader';
import { ActionTypes } from '../../redux/actions/Actions';

export class MarcRecordManager extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isPresent006: false,
      isPresent007: false,
      isPresent008: false,
    };
  }

  render() {
    const {
      bibliographicRecord,
      settings,
      translate,
      dispatch
    } = this.props;
    let {
      isPresent006,
      isPresent007,
      isPresent008
    } = this.state;
    const defaultTemplate = (settings) ? settings.defaultTemplate : C.DEFAULT_TEMPLATE;

    // const resultNotReady = (leaderValuesResults === undefined);
    // headerTypes006NotReady = (headerTypes006Result === undefined);
    // headerTypes007NotReady = (headerTypes007Result === undefined);
    // headerTypes008NotReady = (headerTypes008Result === undefined);

    if (bibliographicRecord === undefined) {
      return (
        <Paneset static>
          <Pane
            defaultWidth="fullWidth"
            paneTitle={(bibliographicRecord) ? bibliographicRecord.name : defaultTemplate.name}
            paneSub={(bibliographicRecord) ? 'id. ' + bibliographicRecord.id : 'id. ' + defaultTemplate.id}
            appIcon={{ app: C.META.ICON_TITLE }}
            actionMenu={ActionMenuTemplate}
            dismissible
            onClose={() => {}}
          >
            <Icon icon="spinner-ellipsis" />
          </Pane>
        </Paneset>);
    } else {
      dispatch({ type: ActionTypes.LEADER_VALUES_FROM_TAG, leader: bibliographicRecord.leader.value, code: bibliographicRecord.leader.code, typeCode: '15' });
      return (
        <Paneset static>
          <Pane
            defaultWidth="fullWidth"
            dismissible
            onClose={() => {}}
            paneTitle={(bibliographicRecord) ? defaultTemplate.name : defaultTemplate.name}
            paneSub={(bibliographicRecord) ? 'id. ' + bibliographicRecord.id : 'id. ' + defaultTemplate.id}
            appIcon={{ app: C.META.ICON_TITLE }}
            actionMenu={ActionMenuTemplate}
          >
            <Row center="xs">
              <div className={style.recordContainer}>
                <AccordionSet>
                  <KeyValue
                    value={<h2>{bibliographicRecord.name}</h2>}
                  />
                  <form name="bibliographicRecordForm" onSubmit={this.handleOnSubmit}>
                    <Accordion label="Suppress" id="suppress" separator={false}>
                      <SingleCheckboxIconButton labels={['Suppress from Discovery']} pullLeft widthPadding />
                    </Accordion>
                    <Accordion label="Leader" id="leader">
                      <MarcField
                        {...this.props}
                        label="Leader"
                        name="leader"
                        value={bibliographicRecord.leader.value}
                      />
                      {/* <MarcLeader {...this.props} /> */}
                    </Accordion>
                    <Accordion label="Control fields (001, 003, 005)" id="control-field">
                      {bibliographicRecord.fields.map(el => {
                        if (el.variableField === undefined) {
                          if (el.fixedField.code === '001' || el.fixedField.code === '003' || el.fixedField.code === '005') {
                            return (
                              <div>
                                <MarcField
                                  {...this.props}
                                  label={el.fixedField.code}
                                  name={el.fixedField.code}
                                  value={el.fixedField.displayValue}
                                />
                              </div>
                            );
                          } else if (
                            el.fixedField.code === '006' ||
                            el.fixedField.code === '007' ||
                            el.fixedField.code === '008') {
                            if (el.fixedField.code === '006') {
                              isPresent006 = true;
                            } else if (el.fixedField.code === '007') {
                              isPresent007 = true;
                            } else if (el.fixedField.code === '008') {
                              isPresent008 = true;
                            }
                            return (
                              <div>
                                <MarcField
                                  {...this.props}
                                  label={el.fixedField.code}
                                  name={el.fixedField.code}
                                  value={el.fixedField.displayValue}
                                />
                              </div>
                            );
                          }
                        }
                      })
                      }
                    </Accordion>
                  </form>
                  <Accordion label={translate({ id: 'ui-marccat.cataloging.variablefield.section.label' })} id="variable-field">
                    {bibliographicRecord.fields.map(f => (
                      <VariableFields {...this.props} record={(f.variableField) || {}} />
                    ))
                    }
                  </Accordion>
                </AccordionSet>
              </div>
            </Row>
          </Pane>
        </Paneset>
      );
    }
  }
}

export default reduxForm({
  form: 'bibliographicRecordForm',
  navigationCheck: true,
  enableReinitialize: true,
  destroyOnUnmount: false
})(connect(
  ({ marccat: { template, leaderValues, headerTypes006, headerTypes007, headerTypes008, settings } }) => ({
    bibliographicRecord: template.recordsById,
    leaderValuesResults: leaderValues.records,
    tagIsLoading: leaderValues.isLoading,
    tagIsReady: leaderValues.isReady,
    headerTypes006Result: headerTypes006.records,
    headerTypes006IsLoading: headerTypes006.isLoading,
    headerTypes007Result: headerTypes007.records,
    settings: settings.data,
    headerTypes007IsLoading: headerTypes007.isLoading,
    headerTypes008Result: headerTypes008.records,
    headerTypes008IsLoading: headerTypes008.isLoading
  }),
)(injectCommonProp(MarcRecordManager)));
