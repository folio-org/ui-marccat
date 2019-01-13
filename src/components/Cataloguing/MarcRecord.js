/**
 * @format
 * @flow
 */
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
import { SingleCheckboxIconButton } from '../../lib/components/Button/OptionButton';
import { MarcLeader } from './Marc/MarcLeader';
import { ActionTypes } from '../../redux/actions/Actions';
import { post, put, del } from '../../core/api/StoreService';
import { buildUrl } from '../../redux/helpers';
import FixedFields from './Marc/FixedFields';
import * as C from '../../utils/Constant';

import style from './Style/style.css';


export class MarcRecordManager extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props);
    this.state = {
      openDropDownMenu: false,
    };
    this.renderDropdownLabels = this.renderDropdownLabels.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.saveRecord = this.saveRecord.bind(this);
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
          onClick={this.saveRecord}
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

  saveRecord = () => {
    this.composeBodyJson();
    const { store, store: { getState } } = this.props;
    const data = getState().marccat.template.recordsById;
    post(buildUrl(C.ENDPOINT.BIBLIOGRAPHIC_RECORD, 'view=1&lang=ita'), data, store);
  };

  editRecord = () => {
    const { store, bibliographicRecord } = this.props;
    put(buildUrl(C.ENDPOINT.BIBLIOGRAPHIC_RECORD, 'view=1'), bibliographicRecord, store);
  };

  deleteRecord = () => {
    const { store, bibliographicRecord } = this.props;
    del(buildUrl(C.ENDPOINT.BIBLIOGRAPHIC_RECORD, 'view=1'), bibliographicRecord, store);
  };


  composeBodyJson = () => {
    const { bibliographicRecord, store: { getState } } = this.props;
    const formData = getState().form.bibliographicRecordForm.values;

    const tag006Values = [];
    const tag007Values = [];
    const tag008Values = [];

    Object.keys(formData)
      .forEach((z) => {
        if (z.split('-')[0] === 'Tag006' || z === 'Tag006') {
          tag006Values.push({
            name: z.split('-')[1] || 'headerTypeCode',
            value: formData[z]
          });
        }
        if (z.split('-')[0] === 'Tag007' || z === 'Tag007') {
          tag007Values.push({
            name: z.split('-')[1] || 'headerTypeCode',
            value: formData[z]
          });
        }
        if (z.split('-')[0] === 'Tag008' || z === 'Tag008') {
          tag008Values.push({
            name: z.split('-')[1] || 'headerTypeCode',
            value: formData[z]
          });
        }
      });

    bibliographicRecord.fields
      .filter(f => f.code !== '001' || f.code !== '003' || f.code !== '005')
      .forEach(f => {
        if (f.code === '006') {
          tag006Values.forEach(v => {
            f.fixedField[v.name] = v.value;
          });
        }
        if (f.code === '007') {
          tag007Values.forEach(v => {
            f.fixedField[v.name] = v.value;
          });
        }
        if (f.code === '008') {
          tag008Values.forEach(v => {
            f.fixedField[v.name] = v.value;
            // f.fixedField.attributes[v.name] = v.value;
          });
        }
      });

    return {
      bibliographicRecord: {
        id: bibliographicRecord.id,
        canadianContentIndicator: '0',
        verificationLevel: 'r',
        recordView: '0',
        leader: {
          code: bibliographicRecord.leader.code,
          value: bibliographicRecord.leader.value
        },
      }
    };
  }

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
      headerTypes006IsLoading,
      headerTypes007IsLoading,
      headerTypes008IsLoading,
      leaderData
    } = this.props;
    const {
      openDropDownMenu,
      editable,
    } = this.state;
    const defaultTemplate = (settings) ? settings.defaultTemplate : C.DEFAULT_TEMPLATE;
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
                        <VariableFields
                          {...this.props}
                          record={(f.variableField) || {}}
                          editable={editable}
                        />
                      ))
                      }
                    </Accordion>
                  </form>
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
