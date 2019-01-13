/* eslint-disable no-lone-blocks */
/**
 * @format
 * @flow
 */
/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
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
import { isEmpty } from 'lodash';
import { Props, injectCommonProp } from '../../core';
import { ActionMenuTemplate, DropdownButtonMenu, ToolbarButtonMenu } from '../../lib';
import { VariableFields } from '.';
import MarcField from './Marc/MarcField';
import * as C from '../../utils/Constant';
import { SingleCheckboxIconButton } from '../../lib/components/Button/OptionButton';
import { MarcLeader } from './Marc/MarcLeader';
import { ActionTypes } from '../../redux/actions/Actions';
import { Tag00X, Tag006, Tag007, Tag008 } from './Result/Tags';
import style from './Style/style.css';
import { post, put, del } from '../../core/api/StoreService';
import { buildUrl } from '../../redux/helpers';

export class MarcRecordManager extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isPresent006: false,
      isPresent007: false,
      isPresent008: false,
      openDropDownMenu: false,
      editable: false,
      leaderCss006: false,
      leaderCss007: false,
      expand008: false,
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
        onClick: () => { },
      },
      {
        label: translate({ id: 'ui-marccat.button.new.bib' }),
        shortcut: translate({ id: 'ui-marccat.button.new.short.bib' }),
        onClick: () => { },
      }];
  };

  renderButtonMenu = () => {
    const { translate } = this.props;
    return (
      <React.Fragment>
        <ToolbarButtonMenu
          onClick={this.handleOnSubmit}
          create
          {...this.props}
          label={
            <Icon icon="plus-sign">
              {translate({ id: 'ui-marccat.template.record.create' })}
            </Icon>
          }
        />
      </React.Fragment>
    );
  };

  handleTags008 = (el) => {
    const { expand008, isPresent008 } = this.state;
    const { dispatch, bibliographicRecord, headerTypes008Result } = this.props;
    if (isEmpty(headerTypes008Result)) {
      if (!isPresent008) {
        dispatch({ type: ActionTypes.HEADER_TYPES_008, code: '008' });
      } else {
        dispatch({ type: ActionTypes.VALUES_FROM_TAG_008, leader: bibliographicRecord.leader.value, code: el.fixedField.code, typeCode: el.fixedField.headerTypeCode });
        dispatch({ type: ActionTypes.HEADER_TYPES_008, code: '008', valueHeaderTypeCode: el.fixedField.headerTypeCode });
      }
    }
    this.setState({
      expand008: !expand008
    });
  };

  handleOnSubmit = () => {
    const { store, bibliographicRecord } = this.props;
    post(buildUrl(C.ENDPOINT.BIBLIOGRAPHIC_RECORD, 'view=1'), bibliographicRecord, store);
  };

  handleEdit = () => {
    const { store, bibliographicRecord } = this.props;
    put(buildUrl(C.ENDPOINT.BIBLIOGRAPHIC_RECORD, 'view=1'), bibliographicRecord, store);
  };

  handleDelete = () => {
    const { store, bibliographicRecord } = this.props;
    del(buildUrl(C.ENDPOINT.BIBLIOGRAPHIC_RECORD, 'view=1'), bibliographicRecord, store);
  };

  handleTags006 = (tag) => {
    const { leaderCss006, isPresent006 } = this.state;
    const { dispatch, bibliographicRecord, headerTypes006Result } = this.props;
    if (isEmpty(headerTypes006Result)) {
      if (!isPresent006) {
        dispatch({ type: ActionTypes.HEADER_TYPES_006, code: '006' });
      } else {
        dispatch({ type: ActionTypes.VALUES_FROM_TAG_006, leader: bibliographicRecord.leader.value, code: tag.fixedField.code, typeCode: tag.fixedField.headerTypeCode });
      }
    }
    this.setState({
      leaderCss006: !leaderCss006
    });
  };

  handleTags007 = (tag) => {
    const { leaderCss007, isPresent007 } = this.state;
    const { dispatch, bibliographicRecord, headerTypes007Result } = this.props;
    if (isEmpty(headerTypes007Result)) {
      if (!isPresent007) {
        dispatch({ type: ActionTypes.HEADER_TYPES_007, code: '007' });
      } else {
        dispatch({ type: ActionTypes.VALUES_FROM_TAG_007, leader: bibliographicRecord.leader.value, code: tag.fixedField.code, typeCode: tag.fixedField.headerTypeCode });
      }
    }
    this.setState({
      leaderCss007: !leaderCss007
    });
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
      isPresent006,
      isPresent007,
      translate,
      headerTypes006IsLoading,
      headerTypes007IsLoading,
      headerTypes008IsLoading,
      leaderData
    } = this.props;
    const {
      openDropDownMenu,
      editable,
      leaderCss006,
      leaderCss007,
      expand008
    } = this.state;
    const defaultTemplate = (settings) ? settings.defaultTemplate : C.DEFAULT_TEMPLATE;
    const EMPTY_FIXED_FIELD = {
      'code': '006',
      'mandatory': true,
      'fieldStatus': 'unchanged',
      'fixedField': {
        'categoryCode': '',
        'headerTypeCode': '',
        'code': '006',
        'displayValue': '',
        'sequenceNumber': 0
      },
      'added': true
    };
    const EMPTY_FIXED_FIELD_007 = {
      'code': '007',
      'mandatory': true,
      'fieldStatus': 'unchanged',
      'fixedField': {
        'categoryCode': '',
        'headerTypeCode': '',
        'code': '007',
        'displayValue': '',
        'sequenceNumber': 0
      },
      'added': true
    };

    if (bibliographicRecord !== undefined) {
      bibliographicRecord.fields.splice(2, 0, EMPTY_FIXED_FIELD);
      bibliographicRecord.fields.splice(3, 0, EMPTY_FIXED_FIELD_007);
    }
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
                      <MarcLeader
                        {...this.props}
                        readOnly
                        leaderData={leaderData}
                        leaderCode={bibliographicRecord.leader.code}
                        leaderValue={bibliographicRecord.leader.value}
                      />
                    </Accordion>
                    <Accordion label="Control fields (001, 003, 005)" id="control-field">
                      { bibliographicRecord.fields.map(tag => {
                        if (tag.variableField === undefined) {
                          if (tag.fixedField.code === '001' || tag.fixedField.code === '003' || tag.fixedField.code === '005') {
                            return (
                              <Tag00X
                                {...this.props}
                                readOnly
                                tag={tag}
                                label={tag.fixedField.code}
                                name={tag.fixedField.code}
                                value={tag.fixedField.displayValue}
                              />
                            );
                          } else if (tag.fixedField.code === '006') {
                            return (
                              <div className={style.controlFieldContainer}>
                                <MarcField
                                  {...this.props}
                                  label={(!isPresent006) ? '006' : tag.fixedField.code}
                                  value={(!isPresent006) ? '' : tag.fixedField.displayValue}
                                  readOnly
                                  onClick={() => this.handleTags006(tag)}
                                />
                                {
                                  (headerTypes006IsLoading) ?
                                    <div /> :
                                    <div className={(leaderCss006) ? style.leaderResultsActive : style.leaderResults}>
                                      <Tag006 {...this.props} />
                                    </div>}
                              </div>
                            );
                          } else if (tag.fixedField.code === '007') {
                            return (
                              <div className={style.controlFieldContainer}>
                                <MarcField
                                  {...this.props}
                                  label={(!isPresent007) ? '007' : tag.fixedField.code}
                                  value={(!isPresent007) ? '' : tag.fixedField.displayValue}
                                  readOnly
                                  onClick={() => this.handleTags007(tag)}
                                />
                                {
                                  (headerTypes007IsLoading) ?
                                    <div /> :
                                    <div className={(leaderCss007) ? style.leaderResultsActive : style.leaderResults}>
                                      <Tag007 {...this.props} />
                                    </div>
                                }
                              </div>
                            );
                          } else if (tag.fixedField.code === '008') {
                            return (
                              <div className={style.controlFieldContainer}>
                                <MarcField
                                  {...this.props}
                                  readOnly
                                  label={tag.fixedField.code}
                                  name={tag.fixedField.code}
                                  value={tag.fixedField.displayValue}
                                  onClick={() => this.handleTags008(tag)}
                                />
                                {
                                  (headerTypes008IsLoading) ?
                                    <div /> :
                                    <div className={(expand008) ? style.leaderResultsActive : style.leaderResults}>
                                      <Tag008
                                        {...this.props}
                                        leaderCode={bibliographicRecord.leader.code}
                                        leaderValue={bibliographicRecord.leader.value}
                                      />
                                    </div>
                                }
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
  enableReinitialize: false,
  destroyOnUnmount: false
})(connect(
  ({ marccat: { template, leaderData, headerTypes006, headerTypes007, headerTypes008 } }) => ({
    bibliographicRecord: template.recordsById,
    leaderData: leaderData.records,
    tagIsLoading: leaderData.isLoading,
    tagIsReady: leaderData.isReady,
    headerTypes006Result: headerTypes006.records,
    headerTypes006IsLoading: headerTypes006.isLoading,
    headerTypes007Result: headerTypes007.records,
    headerTypes007IsLoading: headerTypes007.isLoading,
    headerTypes008Result: headerTypes008.records,
    headerTypes008IsLoading: headerTypes008.isLoading
  }),
)(injectCommonProp(MarcRecordManager)));
