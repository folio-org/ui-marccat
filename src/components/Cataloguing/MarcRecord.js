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
import { ActionMenuTemplate, DropdownButtonMenu, ToolbarButtonMenu } from '../../lib';
import { VariableFields } from '.';
import MarcField from './Marc/MarcField';
import * as C from '../../utils/Constant';
import { SingleCheckboxIconButton } from '../../lib/components/Button/OptionButton';
import type { VariableField } from '../../core';
import { MarcLeader } from './Marc/MarcLeader';
import { ActionTypes } from '../../redux/actions/Actions';
import Tag006 from './Result/Tags/Tag006';
import Tag007 from './Result/Tags/Tag007';
import Tag008 from './Result/Tags/Tag008';
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
      leaderCss: false
    };
    this.renderDropdownLabels = this.renderDropdownLabels.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
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

renderButtonMenu = () => {
  const { translate } = this.props;
  return (
    <ToolbarButtonMenu
      onClick={this.handleOnSubmit}
      create
      {...this.props}
      label={
        <Icon icon="plus-sign">
          {translate({ id:'ui-marccat.template.record.create' })}
        </Icon>
      }
    />
  );
};


handleOnSubmit = () => {
  // alert('ygy');
};

handleTags006 = (el) => {
  const { dispatch, bibliographicRecord } = this.props;
  const {
    isPresent006,
  } = this.state;
  if (!isPresent006) {
    dispatch({ type: ActionTypes.HEADER_TYPES_006, code: '006' });
  } else {
    dispatch({ type: ActionTypes.VALUES_FROM_TAG_006, leader: bibliographicRecord.leader.value, code: el.fixedField.code, typeCode: el.fixedField.headerTypeCode });
  }
};

handleTags007 = (el) => {
  const { dispatch, bibliographicRecord } = this.props;
  const {
    isPresent007,
  } = this.state;
  if (!isPresent007) {
    dispatch({ type: ActionTypes.HEADER_TYPES_007, code: '007' });
  } else {
    dispatch({ type: ActionTypes.VALUES_FROM_TAG_007, leader: bibliographicRecord.leader.value, code: el.fixedField.code, typeCode: el.fixedField.headerTypeCode });
  }
};

handleTags008 = (el) => {
  const { dispatch, bibliographicRecord } = this.props;
  const {
    isPresent008,
  } = this.state;
  if (!isPresent008) {
    dispatch({ type: ActionTypes.HEADER_TYPES_008, code: '008' });
  } else {
    dispatch({ type: ActionTypes.VALUES_FROM_TAG_008, leader: bibliographicRecord.leader.value, code: el.fixedField.code, typeCode: el.fixedField.headerTypeCode });
    dispatch({ type: ActionTypes.HEADER_TYPES_008, code: '008', valueHeaderTypeCode: el.fixedField.headerTypeCode });
  }
};


handleClose = () => {
  const { dispatch, router, toggleFilterPane } = this.props;
  dispatch({ type: ActionTypes.FILTERS, payload: {}, filterName: '', filterChecked: false });
  toggleFilterPane();
  router.push('/marccat/search');
};

handleLeader = () => {
  const { leaderCss } = this.state;
  const { dispatch, bibliographicRecord } = this.props;
  dispatch({ type: ActionTypes.LEADER_VALUES_FROM_TAG, leader: bibliographicRecord.leader.value, code: bibliographicRecord.leader.code, typeCode: '15' });
  this.setState({
    leaderCss: true
  });
};

render() {
  const {
    bibliographicRecord,
    settings,
    translate,
    dispatch,
    router,
    headerTypes006IsLoading,
    headerTypes007IsLoading,
    headerTypes008IsLoading,
    leaderValuesResults
  } = this.props;
  const {
    isPresent006,
    isPresent007,
    isPresent008
  } = this.state;
  const { openDropDownMenu, editable, leaderCss } = this.state;
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
          lastMenu={this.renderButtonMenu()}
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
          lastMenu={this.renderButtonMenu()}
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
                    <div className={style.controlFieldContainer}>
                      <MarcField
                        {...this.props}
                        leaderValuesResults={leaderValuesResults}
                        bibliographicRecord={bibliographicRecord}
                        label="Leader"
                        name="leader"
                        onClick={() => this.handleLeader()}
                        value={bibliographicRecord.leader.value}
                      />
                      {leaderValuesResults &&
                      <div className={(leaderCss) ? style.leaderResultsActive : style.leaderResults}>
                        <MarcLeader
                          {...this.props}
                          leaderValuesResults={leaderValuesResults}
                        />
                      </div>
                      }
                    </div>
                  </Accordion>
                  <Accordion label="Control fields (001, 003, 005)" id="control-field">
                    {bibliographicRecord.fields.map(el => {
                      if (el.variableField === undefined) {
                        if (el.fixedField.code === '001' || el.fixedField.code === '003' || el.fixedField.code === '005') {
                          return (
                            <div className={style.controlFieldContainer}>
                              <MarcField
                                {...this.props}
                                label={el.fixedField.code}
                                name={el.fixedField.code}
                                value={el.fixedField.displayValue}
                              />
                            </div>
                          );
                        } else if (el.fixedField.code === '006' || el.fixedField.code === '007' || el.fixedField.code === '008') {
                          if (el.fixedField.code === '006') {
                            return (
                              <div className={style.controlFieldContainer}>
                                <MarcField
                                  {...this.props}
                                  label={el.fixedField.code}
                                  name={el.fixedField.code}
                                  value={el.fixedField.displayValue}
                                  onClick={() => this.handleTags006(el)}
                                />
                                {
                                  (headerTypes006IsLoading) ?
                                    <div /> :
                                    <Tag006 {...this.props} />
                                }
                              </div>
                            );
                          } else if (el.fixedField.code === '007') {
                            return (
                              <div className={style.controlFieldContainer}>
                                <MarcField
                                  {...this.props}
                                  label={el.fixedField.code}
                                  name={el.fixedField.code}
                                  value={el.fixedField.displayValue}
                                  onClick={() => this.handleTags007(el)}
                                />
                                {
                                  (headerTypes007IsLoading) ?
                                    <div /> :
                                    <Tag007 {...this.props} />
                                }
                              </div>
                            );
                          } else if (el.fixedField.code === '008') {
                            return (
                              <div className={style.controlFieldContainer}>
                                <MarcField
                                  {...this.props}
                                  label={el.fixedField.code}
                                  name={el.fixedField.code}
                                  value={el.fixedField.displayValue}
                                  onClick={() => this.handleTags008(el)}
                                />
                                {
                                  (headerTypes008IsLoading) ?
                                    <div /> :
                                    <Tag008 {...this.props} />
                                }
                              </div>
                            );
                          }
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
  ({ marccat: { template, leaderValues, headerTypes006, headerTypes007, headerTypes008 } }) => ({
    bibliographicRecord: template.recordsById,
    leaderValuesResults: leaderValues.records,
    tagIsLoading: leaderValues.isLoading,
    tagIsReady: leaderValues.isReady,
    headerTypes006Result: headerTypes006.records,
    headerTypes006IsLoading: headerTypes006.isLoading,
    headerTypes007Result: headerTypes007.records,
    headerTypes007IsLoading: headerTypes007.isLoading,
    headerTypes008Result: headerTypes008.records,
    headerTypes008IsLoading: headerTypes008.isLoading
  }),
)(injectCommonProp(MarcRecordManager)));
