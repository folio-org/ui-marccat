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
  Col,
  Button,
  Accordion,
  KeyValue,
  Icon
} from '@folio/stripes/components';
import { reduxForm } from 'redux-form';
import { Props, injectCommonProp } from '../../core';
import { ActionMenuTemplate, DropdownButtonMenu } from '../../lib';
import { VariableFields } from '.';
import MarcField from './Marc/MarcField';
import * as C from '../../utils/Constant';
import { SingleCheckboxIconButton } from '../../lib/components/Button/OptionButton';
import type { VariableField } from '../../core';
import { MarcLeader } from './Marc/MarcLeader';
import { ActionTypes } from '../../redux/actions/Actions';

import style from './Style/style.css';

export class MarcRecordManager extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isPresent006: false,
      isPresent007: false,
      isPresent008: false,
      openDropDownMenu: false,
      editable: false,
    };
    this.renderDropdownLabels = this.renderDropdownLabels.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

renderDropdownLabels = () => {
  const { translate } = this.props;
  return [
    {
      label: translate({ id: 'ui-marccat.button.new.auth' }),
      shortcut: translate({ id: 'ui-marccat.button.new.short.auth' }),
      onClick: () => {},
    },
    {
      label: translate({ id: 'ui-marccat.button.new.auth' }),
      shortcut: translate({ id: 'ui-marccat.button.new.short.auth' }),
      onClick: () => {},
    },
    {
      label: translate({ id: 'ui-marccat.button.new.auth' }),
      shortcut: translate({ id: 'ui-marccat.button.new.short.auth' }),
      onClick: () => {},
    },
    {
      label: translate({ id: 'ui-marccat.button.new.auth' }),
      shortcut: translate({ id: 'ui-marccat.button.new.short.auth' }),
      onClick: () => {},
    },
    {
      label: translate({ id: 'ui-marccat.button.new.bib' }),
      shortcut: translate({ id: 'ui-marccat.button.new.short.bib' }),
      onClick: () => {},
    }];
};


handleClose = () => {
  const { dispatch, router, toggleFilterPane } = this.props;
  dispatch({ type: ActionTypes.FILTERS, payload: {}, filterName: '', filterChecked: false });
  toggleFilterPane();
  router.push('/marccat/search');
};

render() {
  const {
    bibliographicRecord,
    settings,
    translate,
    dispatch,
    router,
    leaderValuesResults
  } = this.props;
  let {
    isPresent006,
    isPresent007,
    isPresent008
  } = this.state;
  const { openDropDownMenu, editable } = this.state;
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
          onClose={this.handleClose}
        >
          <Icon icon="spinner-ellipsis" />
        </Pane>
      </Paneset>);
  } else {
    return (
      <Paneset static>
        <Pane
          defaultWidth="fullWidth"
          dismissible
          onClose={this.handleClose}
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
                      leaderValuesResults={leaderValuesResults}
                      bibliographicRecord={bibliographicRecord}
                      label="Leader"
                      name="leader"
                      value={bibliographicRecord.leader.value}
                    />
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
                  <Row between="xs" className={style.marcEditableListFormHeader}>
                    <Col xs>
                      <Row end="xs" style={{ float: 'right' }}>
                        <Col xs>
                          <Button
                            buttonStyle="primary"
                            onClick={() => this.setState({
                              editable: true
                            })}
                          >
                            <Icon icon="edit">Edit</Icon>
                          </Button>
                        </Col>
                        <Col xs>
                          <DropdownButtonMenu
                            {...this.props}
                            marginBottom0
                            label="Actions"
                            labels={this.renderDropdownLabels()}
                            onToggle={() => this.setState({
                              openDropDownMenu: !openDropDownMenu
                            })}
                            open={openDropDownMenu}
                          />
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  {bibliographicRecord.fields.map(f => (
                    <VariableFields {...this.props} record={(f.variableField) || {}} editable={editable} />
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
  ({ marccat: { template, leaderValues, settings } }) => ({
    bibliographicRecord: template.recordsById,
    leaderValuesResults: leaderValues.records,
    tagIsLoading: leaderValues.isLoading,
    tagIsReady: leaderValues.isReady,
    settings: settings.data,
  }),
)(injectCommonProp(MarcRecordManager)));
