/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
import React from 'react';
import { connect } from 'react-redux';
import {
  Row,
  Col,
  Pane,
  Paneset,
  Checkbox,
  AccordionSet,
  Accordion,
  KeyValue,
  Icon,
  TextField
} from '@folio/stripes-components';
import Collapsible from 'react-collapsible';
import Draggable from 'react-draggable';
import { ActionTypes } from '../../../redux/actions';
import { Props, injectCommonProp } from '../../../core';
import { ActionMenuTemplate } from '../../../lib';
import CustomLeader from './CustomTagCombo/CustomLeader';
import Custom006 from './CustomTagCombo/Custom006';
import Custom007 from './CustomTagCombo/Custom007';
import Custom008 from './CustomTagCombo/Custom008';
import * as C from '../../../utils/Constant';

import style from './style.css';

type P = Props & {
}

export class TemplateManager extends React.Component<P, {}> {
  constructor(props: P) {
    super(props);
    this.state = {
      resultNotReady: false,
      headerTypes006NotReady: false,
      isPresent006: false,
      isPresent007: false,
      isPresent008: false,
    };
  }

  render() {
    const { templateById, leaderValuesResults, tagIsLoading, headerTypes006Result, headerTypes006IsLoading, headerTypes007Result, headerTypes007IsLoading, headerTypes008Result, headerTypes008IsLoading } = this.props;
    let { resultNotReady, headerTypes006NotReady, headerTypes007NotReady, headerTypes008NotReady, isPresent006, isPresent007, isPresent008 } = this.state;

    if (leaderValuesResults === undefined) {
      resultNotReady = true;
    } else {
      resultNotReady = false;
    }
    if (headerTypes006Result === undefined) {
      headerTypes006NotReady = true;
    } else {
      headerTypes006NotReady = false;
    }
    if (headerTypes007Result === undefined) {
      headerTypes007NotReady = true;
    } else {
      headerTypes007NotReady = false;
    }
    if (headerTypes008Result === undefined) {
      headerTypes008NotReady = true;
    } else {
      headerTypes008NotReady = false;
    }
    if (templateById === undefined) {
      return (
        <Paneset static>
          <Pane
            defaultWidth="fullWidth"
            paneTitle="Template Manager"
            paneSub="ID"
            appIcon={{ app: C.META.ICON_TITLE }}
            actionMenu={ActionMenuTemplate}
          >
            <Icon icon="spinner-ellipsis" />
          </Pane>
        </Paneset>);
    } else {
      return (
        <Paneset static>
          <Pane
            defaultWidth="fullWidth"
            paneTitle={templateById.name}
            appIcon={{ app: C.META.ICON_TITLE }}
            actionMenu={ActionMenuTemplate}
          >
            <AccordionSet>
              <KeyValue
                value={<h2>{templateById.name}</h2>}
              />
              <Accordion label="Suppress" id="suppress">
                <Checkbox label="Suppress from Discovery" />
              </Accordion>
              <Accordion label="Leader" id="leader">
                <Collapsible
                  onOpen={() => {
                    const { dispatch } = this.props;
                    dispatch({ type: ActionTypes.LEADER_VALUES_FROM_TAG, leader: templateById.leader.value, code: templateById.leader.code, typeCode: '15' });
                  }}
                  trigger={
                    <Col xs={4}>
                      <div className={style.titleCollapsiblePanel} id="titleCollapsiblePanel">
                        <TextField
                          type="text"
                          label={<h3>{templateById.leader.code}</h3>}
                          value={templateById.leader.value}
                          readOnly
                        />
                        <Icon
                          icon="down-caret"
                          size="small"
                          iconClassName="myClass"
                        />
                      </div>
                    </Col>
                  }
                >
                  {
                    tagIsLoading || resultNotReady ?
                      <Icon icon="spinner-ellipsis" /> :
                      <CustomLeader {...this.props} />
                  }
                </Collapsible>
              </Accordion>
              <Accordion label="Control fields" id="control-field">
                {templateById.fields.map(el => {
                  if (el.variableField === undefined) {
                    if (el.fixedField.code === '001' || el.fixedField.code === '003' || el.fixedField.code === '005') {
                      return (
                        <Col xs={4}>
                          <div id="titleCollapsiblePanel">
                            <TextField
                              type="text"
                              label={<h3>{el.fixedField.code}</h3>}
                              value={el.fixedField.displayValue}
                              readOnly
                            />
                          </div>
                          <br />
                        </Col>
                      );
                    } else if (el.fixedField.code === '006' || el.fixedField.code === '007' || el.fixedField.code === '008') {
                      if (el.fixedField.code === '006') {
                        isPresent006 = true;
                      } else if (el.fixedField.code === '007') {
                        isPresent007 = true;
                      } else if (el.fixedField.code === '008') {
                        isPresent008 = true;
                      }
                      return (
                        <div>
                          <Collapsible
                            onOpen={() => {
                              const { dispatch } = this.props;
                              if (!isPresent006) {
                                dispatch({ type: ActionTypes.HEADER_TYPES_006, code: '006' });
                              } else {
                                dispatch({ type: ActionTypes.VALUES_FROM_TAG_006, leader: templateById.leader.value, code: el.fixedField.code, typeCode: el.fixedField.headerTypeCode });
                              }
                            }}
                            trigger={
                              <Col xs={4}>
                                <div className={style.titleCollapsiblePanel} id="titleCollapsiblePanel">
                                  <TextField
                                    type="text"
                                    label={(!isPresent006) ? <h3>006</h3> : <h3>{el.fixedField.code}</h3>}
                                    value={(!isPresent006) ? '' : el.fixedField.displayValue}
                                    readOnly
                                  />
                                  <Icon
                                    icon="down-caret"
                                    size="small"
                                    iconClassName="myClass"
                                  />
                                </div>
                              </Col>
                            }
                          >
                            {
                              headerTypes006IsLoading || headerTypes006NotReady ?
                                <Icon icon="spinner-ellipsis" /> :
                                <Custom006 {...this.props} />
                            }
                          </Collapsible>
                          <br />
                          <Collapsible
                            onOpen={() => {
                              const { dispatch } = this.props;
                              if (!isPresent007) {
                                dispatch({ type: ActionTypes.HEADER_TYPES_007, code: '007' });
                              } else {
                                dispatch({ type: ActionTypes.VALUES_FROM_TAG_007, leader: templateById.leader.value, code: el.fixedField.code, typeCode: el.fixedField.headerTypeCode });
                              }
                            }}
                            trigger={
                              <Col xs={4}>
                                <div className={style.titleCollapsiblePanel} id="titleCollapsiblePanel">
                                  <TextField
                                    type="text"
                                    label={(!isPresent007) ? <h3>007</h3> : <h3>{el.fixedField.code}</h3>}
                                    value={(!isPresent007) ? '' : el.fixedField.displayValue}
                                    readOnly
                                  />
                                  <Icon
                                    icon="down-caret"
                                    size="small"
                                    iconClassName="myClass"
                                  />
                                </div>
                              </Col>
                            }
                          >
                            {
                              headerTypes007IsLoading || headerTypes007NotReady ?
                                <Icon icon="spinner-ellipsis" /> :
                                <Custom007 {...this.props} />
                            }
                          </Collapsible>
                          <br />
                          <Collapsible
                            onOpen={() => {
                              const { dispatch } = this.props;
                              if (!isPresent008) {
                                dispatch({ type: ActionTypes.HEADER_TYPES_008, code: '008' });
                              } else {
                                dispatch({ type: ActionTypes.VALUES_FROM_TAG_008, leader: templateById.leader.value, code: el.fixedField.code, typeCode: el.fixedField.headerTypeCode });
                              }
                            }}
                            trigger={
                              <Col xs={4}>
                                <div className={style.titleCollapsiblePanel} id="titleCollapsiblePanel">
                                  <TextField
                                    type="text"
                                    label={(!isPresent008) ? <h3>008</h3> : <h3>{el.fixedField.code}</h3>}
                                    value={(!isPresent008) ? '' : el.fixedField.displayValue}
                                    readOnly
                                  />
                                  <Icon
                                    icon="down-caret"
                                    size="small"
                                    iconClassName="myClass"
                                  />
                                </div>
                              </Col>
                            }
                          >
                            {
                              headerTypes008IsLoading || headerTypes008NotReady ?
                                <Icon icon="spinner-ellipsis" /> :
                                <Custom008 {...this.props} />
                            }
                          </Collapsible>
                        </div>
                      );
                    }
                  }
                })
                }
              </Accordion>
              <Accordion label="Variable fields" id="variable-field">
                {templateById.fields.map(el => {
                  if (el.fixedField === undefined) {
                    return (
                      <Draggable>
                        <Row>
                          <Col xs={1}>
                            <TextField
                              type="text"
                              value={el.variableField.code}
                            />
                          </Col>
                          <Col xs={1}>
                            <TextField
                              type="text"
                              value=""
                            />
                          </Col>
                          <Col xs={1}>
                            <TextField
                              type="text"
                              value=""
                            />
                          </Col>
                          <Col xs={4}>
                            <TextField
                              type="text"
                              value={el.variableField.displayValue}
                            />
                          </Col>
                        </Row>
                      </Draggable>
                    );
                  }
                })
                }
              </Accordion>
            </AccordionSet>
          </Pane>
        </Paneset>
      );
    }
  }
}


export default (connect(
  ({ marccat: { template, leaderValues, headerTypes006, headerTypes007, headerTypes008 } }) => ({
    templateById: template.recordsById,
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
)(injectCommonProp(TemplateManager)));
