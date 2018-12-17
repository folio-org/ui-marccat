/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import { connect } from 'react-redux';
import Pane from '@folio/stripes-components/lib/Pane';
import Paneset from '@folio/stripes-components/lib/Paneset';
import Checkbox from '@folio/stripes-components/lib/Checkbox';
import { AccordionSet, Accordion } from '@folio/stripes-components/lib/Accordion';
import { KeyValue, Icon, TextField } from '@folio/stripes-components';
import { Row, Col } from 'react-flexbox-grid';
import Collapsible from 'react-collapsible';
import Draggable from 'react-draggable';
import { ActionTypes } from '../../../redux/actions';
import * as C from '../../../utils/Constant';
import type { Props } from '../../../core';
import { injectCommonProp } from '../../../core';
import MyActionMenuTemplate from '../../MyActionMenus/MyActionMenuTemplate';
import { CustomTagComponent } from './CustomTagComponent';
import style from './style.css';

type P = Props & {
}

export class TemplateManager extends React.Component<P, {}> {
  constructor(props: P) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { templateById } = this.props;
    if (templateById === undefined) {
      return (
        <Paneset static>
          <Pane
            defaultWidth="fullWidth"
            paneTitle="Template Manager"
            paneSub="ID"
            appIcon={{ app: C.META.ICON_TITLE }}
            actionMenu={MyActionMenuTemplate}
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
            actionMenu={MyActionMenuTemplate}
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
                  <CustomTagComponent {...this.props} />
                </Collapsible>
              </Accordion>
              <Accordion label="Control fields" id="control-field">
                {templateById.fields.map(el => {
                  if (el.variableField === undefined) {
                    return (
                      <Collapsible
                        trigger={
                          <Col xs={4}>
                            <br />
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
                          </Col>
                        }
                      >
                        <CustomTagComponent {...this.props} />
                      </Collapsible>
                    );
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
    tagValuesResults: tagValues.records.results
  }),
)(injectCommonProp(TemplateManager)));
