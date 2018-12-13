/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import { connect } from 'react-redux';
import Pane from '@folio/stripes-components/lib/Pane';
import Paneset from '@folio/stripes-components/lib/Paneset';
import Checkbox from '@folio/stripes-components/lib/Checkbox';
import { AccordionSet, Accordion } from '@folio/stripes-components/lib/Accordion';
import { KeyValue, Icon, TextField, Button } from '@folio/stripes-components';
import { Row, Col } from 'react-flexbox-grid';
import Collapsible from 'react-collapsible';
import * as C from '../../../utils/Constant';
import type { Props } from '../../../core';
import { injectCommonProp } from '../../../core';
import myActionMenuTemplate from '../MyActionMenuTemplate';
import { CustomTagComponent } from './CustomTagComponent';
import style from './style.css';

type P = Props & {
}

export class TemplateManager extends React.Component<P, {}> {
  constructor(props: P) {
    super(props);
    this.state = {
      isOpen: true
    };
  }

  handleOnToggle = () => {
    this.setState(prevState => ({ isOpen: !prevState.isOpen }));
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
            actionMenu={myActionMenuTemplate}
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
            actionMenu={myActionMenuTemplate}
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
                  trigger={
                    <Col xs={4}>
                      <div className={style.titleCollapsiblePanel} id="titleCollapsiblePanel">
                        <TextField
                          type="text"
                          label={templateById.leader.code}
                          value={templateById.leader.value}
                          readOnly
                        />
                      </div>
                    </Col>
                  }
                >
                  <hr />
                  <CustomTagComponent {...this.props} />
                </Collapsible>
              </Accordion>
              <Accordion label="Control fields" id="control-field">
                {templateById.fields.map(el => {
                  if (el.variableField === undefined) {
                    return (
                      <Row>
                        <Col xs={4}>
                          <div className={style.titleCollapsiblePanel} id="titleCollapsiblePanel">
                            <TextField
                              type="text"
                              label={el.fixedField.code}
                              value={el.fixedField.displayValue}
                              readOnly
                            />
                            <Collapsible
                              trigger={<Button>ExpandTag</Button>}
                            >
                              <hr />
                              <CustomTagComponent {...this.props} />
                            </Collapsible>
                          </div>
                        </Col>
                        <div><br /></div>
                      </Row>

                    );
                  }
                })
                }
              </Accordion>
              <Accordion label="Variable fields" id="variable-field">
                {templateById.fields.map(el => {
                  if (el.fixedField === undefined) {
                    return (
                      <Row>
                        <Col xs={1}>
                          <h4>{el.variableField.code}</h4>
                        </Col>
                        <Col xs={4} style={{ marginTop: '15px' }}>
                          <TextField
                            type="text"
                            value={el.variableField.displayValue}
                          />
                        </Col>
                      </Row>
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
  ({ marccat: { template } }) => ({
    templateById: template.recordsById,
  }),
)(injectCommonProp(TemplateManager)));
