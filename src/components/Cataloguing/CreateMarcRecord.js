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
  Callout,
  Row,
  Col,
  PaneMenu,
  Button,
  Accordion,
  KeyValue,
  Icon
} from '@folio/stripes/components';
import stripesForm from '@folio/stripes/form';
import { Props, injectCommonProp } from '../../core';
import { ActionMenuTemplate, SingleCheckboxIconButton, DropdownButtonMenu } from '../../lib';
import { VariableFields, MarcLeader, FixedFields } from '.';
import { ActionTypes } from '../../redux/actions/Actions';
import { put, remove, post } from '../../core/api/HttpService';
import { buildUrl } from '../../redux/helpers';
import * as C from '../../utils/Constant';

import style from './Style/style.css';
import { uuid } from './Utils/MarcUtils';

export class CreateMarcRecord extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props);
    this.state = {
      openDropDownMenu: false,
      isEditingMode: false,
    };
    this.renderDropdownLabels = this.renderDropdownLabels.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.saveRecord = this.saveRecord.bind(this);
    this.editRecord = this.editRecord.bind(this);
    this.deleteRecord = this.deleteRecord.bind(this);

    this.callout = React.createRef();
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

  // eslint-disable-next-line react/no-deprecated
  componentWillMount() {
    this.lockRecord(true);
  }

  renderButtonMenu = () => {
    const { translate } = this.props;
    const rightButton = {
      marginRight: '10px',
      float: 'right',
    };
    return (
      <React.Fragment>
        <PaneMenu>
          <Button
            style={rightButton}
            buttonStyle="primary"
            onClick={this.saveRecord}
            type="button"
            marginBottom0
          >
            <Icon icon="plus-sign">
              {translate({ id: 'ui-marccat.template.record.create' })}
            </Icon>
          </Button>
          <Button
            style={rightButton}
            buttonStyle="primary"
            onClick={this.deleteRecord}
            type="button"
            disabled={false}
            marginBottom0
          >
            <Icon icon="trash">
              Delete Record
            </Icon>
          </Button>
        </PaneMenu>
      </React.Fragment>
    );
  };


  lockRecord = (lock) => {
    const { store, bibliographicRecord } = this.props;
    const okapi = store.getState().okapi;
    const userName = okapi.currentUser.username;
    const id = bibliographicRecord.id;
    const uid = uuid();
    if (lock) remove(buildUrl(C.ENDPOINT.LOCK_MARC_RECORD + id, `uuid=${uid}&userName=${userName}&lang=ita&view=1&type=R`), bibliographicRecord, null);
    else remove(buildUrl(C.ENDPOINT.UNLOCK_MARC_RECORD + id, `uuid=${uid}&userName=${userName}&lang=ita&view=1&type=R`), bibliographicRecord, null);
  };

  saveRecord = () => {
    const { isEditingMode } = this.state;
    const body = { bibliographicRecord: this.composeBodyJson() };
    post(buildUrl(C.ENDPOINT.BIBLIOGRAPHIC_RECORD, 'lang=ita&view=1'), body);
    if (isEditingMode) this.lockRecord(false);
  };

  editRecord = () => {
    const { store, bibliographicRecord } = this.props;
    put(buildUrl(C.ENDPOINT.BIBLIOGRAPHIC_RECORD, 'lang=ita&view=1'), bibliographicRecord, store);
  };

  deleteRecord = () => {
    const { store, bibliographicRecord } = this.props;
    const okapi = store.getState().okapi;
    const userName = okapi.currentUser.username;
    const id = bibliographicRecord.id;
    const uid = uuid();
    remove(buildUrl(C.ENDPOINT.BIBLIOGRAPHIC_RECORD + '/' + id, `uuid=${uid}&userName=${userName}&lang=ita&view=1`), bibliographicRecord, this.showMessage('Record delete successfully'));
    setTimeout(() => {
      this.handleClose();
    });
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
          });
        }
      });

    return bibliographicRecord;
  }

  handleClose = () => {
    const { dispatch, router, toggleFilterPane } = this.props;
    dispatch({ type: ActionTypes.FILTERS, payload: {}, filterName: '', filterChecked: false });
    toggleFilterPane();
    router.push('/marccat/search');
  };

  showMessage(message) {
    this.callout.current.sendCallout({
      type: 'success',
      message: (
        <span>
          {message}
        </span>
      )
    });
  }

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
        <React.Fragment>
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
                    </form>
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
                      {bibliographicRecord.fields.map((f, idx) => (
                        <VariableFields
                          idx={idx}
                          {...this.props}
                          record={(f.variableField) || {}}
                          editable={editable}
                        />
                      ))
                      }
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
}

export default stripesForm({
  form: 'bibliographicRecordForm',
  navigationCheck: true,
  enableReinitialize: true,
  destroyOnUnmount: false,
})(connect(
  ({ marccat: { template, recordDetail, leaderData, headerTypes006, headerTypes007, headerTypes008 } }) => ({
    bibliographicRecord: template.recordsById || recordDetail.record.bibliographicRecord,
    defaultTemplate: template.records,
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
)(injectCommonProp(CreateMarcRecord)));
