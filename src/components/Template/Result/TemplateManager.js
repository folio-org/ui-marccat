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
import { CustomTagComponent } from './CustomTagComponent';
import * as C from '../../../utils/Constant';

import style from './style.css';

type P = Props & {
}

export class TemplateManager extends React.Component<P, {}> {
  constructor(props: P) {
    super(props);
    this.state = {
      resultNotReady: false,
      isPresent006: false,
      isPresent007: false,
      isPresent008: false,
    };
  }

  render() {
    const { templateById, tagValuesResults, tagIsLoading } = this.props;
    let { resultNotReady, isPresent006, isPresent007, isPresent008 } = this.state;

    if (tagValuesResults === undefined) {
      resultNotReady = true;
    } else {
      resultNotReady = false;
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
                    dispatch({ type: ActionTypes.TEMPLATE_VALUES_FROM_TAG, leader: templateById.leader.value, code: templateById.leader.code, typeCode: '15' });
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
                      <CustomTagComponent {...this.props} />
                  }
                </Collapsible>
              </Accordion>
              <Accordion label="Control fields" id="control-field">
                {templateById.fields.map(el => {
                  if (el.variableField === undefined) {
                    if (el.fixedField.code === '001' || el.fixedField.code === '003' || el.fixedField.code === '005') {
                      return (
                        <Col xs={4}>
                          <br />
                          <div id="titleCollapsiblePanel">
                            <TextField
                              type="text"
                              label={<h3>{el.fixedField.code}</h3>}
                              value={el.fixedField.displayValue}
                              readOnly
                            />
                          </div>
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
                        <Collapsible
                          trigger={
                            <Col xs={4}>
                              {
                                (!isPresent006) ?
                                  <div className={style.titleCollapsiblePanel} id="titleCollapsiblePanel">
                                    <TextField
                                      type="text"
                                      label={<h3>006</h3>}
                                      value=""
                                      readOnly
                                    />
                                    <Icon
                                      icon="down-caret"
                                      size="small"
                                      iconClassName="myClass"
                                    />
                                  </div> :
                                  <div className={style.titleCollapsiblePanel} id="titleCollapsiblePanel">
                                    <TextField
                                      type="text"
                                      label={<h3>{el.fixedField.code}</h3>}
                                      value={el.fixedField.displayValue}
                                      readOnly
                                    />
                                    <Icon
                                      icon="down-caret"
                                      size="small"
                                      iconClassName="myClass"
                                    />
                                  </div>}
                              {
                                (!isPresent007) ?
                                  <div className={style.titleCollapsiblePanel} id="titleCollapsiblePanel">
                                    <TextField
                                      type="text"
                                      label={<h3>007</h3>}
                                      value=""
                                      readOnly
                                    />
                                    <Icon
                                      icon="down-caret"
                                      size="small"
                                      iconClassName="myClass"
                                    />
                                  </div> :
                                  <div className={style.titleCollapsiblePanel} id="titleCollapsiblePanel">
                                    <TextField
                                      type="text"
                                      label={<h3>{el.fixedField.code}</h3>}
                                      value={el.fixedField.displayValue}
                                      readOnly
                                    />
                                    <Icon
                                      icon="down-caret"
                                      size="small"
                                      iconClassName="myClass"
                                    />
                                  </div>
                              }
                              {
                                (!isPresent008) ?
                                  <div className={style.titleCollapsiblePanel} id="titleCollapsiblePanel">
                                    <TextField
                                      type="text"
                                      label={<h3>008</h3>}
                                      value=""
                                      readOnly
                                    />
                                    <Icon
                                      icon="down-caret"
                                      size="small"
                                      iconClassName="myClass"
                                    />
                                  </div> :
                                  <div className={style.titleCollapsiblePanel} id="titleCollapsiblePanel">
                                    <TextField
                                      type="text"
                                      label={<h3>{el.fixedField.code}</h3>}
                                      value={el.fixedField.displayValue}
                                      readOnly
                                    />
                                    <Icon
                                      icon="down-caret"
                                      size="small"
                                      iconClassName="myClass"
                                    />
                                  </div>
                              }
                            </Col>
                          }
                        >
                          <CustomTagComponent {...this.props} />
                        </Collapsible>
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
  ({ marccat: { template, tagValues } }) => ({
    templateById: template.recordsById,
    tagValuesResults: tagValues.records,
    tagIsLoading: tagValues.isLoading,
    tagIsReady: tagValues.isReady
  }),
)(injectCommonProp(TemplateManager)));
