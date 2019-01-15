import React, { Component } from 'react';
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
import { ActionMenuTemplate, SingleCheckboxIconButton } from '../../lib';
import { VariableFields, MarcLeader, FixedFields } from '.';
import { findParam } from '../../redux/helpers';
import * as C from '../../utils/Constant';
import style from './Style/style.css';
import { injectCommonProp } from '../../core';

class ViewMarcRecord extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: undefined,
      marcRecord: undefined,
    };
  }

  // eslint-disable-next-line react/no-deprecated
  componentWillMount() {
    const { data: search } = this.props;
    const id = findParam('id');
    const record = search.search.bibliographicResults.filter(item => id === item.data.fields[0]['001']) || {};
    this.setState({
      id,
      marcRecord: record[0]
    });
  }

  render() {
    const { marcRecord, id } = this.state;
    const { translate } = this.props;
    return (!marcRecord) ? <Icon icon="spinner-ellipsis" /> : (
      <React.Fragment>
        <Paneset static>
          <Pane
            defaultWidth="fullWidth"
            dismissible
            onClose={this.handleClose}
            paneTitle="View Record"
            paneSub={'id. ' + id}
            appIcon={{ app: C.META.ICON_TITLE }}
            actionMenu={ActionMenuTemplate}
          >
            <Row center="xs">
              <div className={style.recordContainer}>
                <AccordionSet>
                  <KeyValue
                    value={<h2>View Record</h2>}
                  />
                  <form name="bibliographicRecordFormEdit" onSubmit={this.saveRecord}>
                    <Accordion label="Suppress" id="suppress" separator={false}>
                      <SingleCheckboxIconButton labels={['Suppress from Discovery']} pullLeft widthPadding />
                    </Accordion>
                    <Accordion label="Leader" id="leader">
                      <MarcLeader
                        {...this.props}
                        readOnly
                        leaderData={marcRecord.data.leader}
                        leaderCode={marcRecord.data.leader.code || marcRecord.data.leader}
                        leaderValue={marcRecord.data.leader.value || marcRecord.data.leader}
                      />
                    </Accordion>
                    <Accordion label="Control fields (001, 003, 005)" id="control-field">
                      <FixedFields
                        {...this.props}
                        headerTypes006IsLoading
                        headerTypes007IsLoading
                        headerTypes008IsLoading
                        record={marcRecord.data}
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
                        </Row>
                      </Col>
                    </Row>
                    {marcRecord.data.fields.map(f => (
                      <VariableFields
                        {...this.props}
                        record={(f.variableField) || {}}
                        editable
                      />
                    ))
                    }
                  </Accordion>
                </AccordionSet>
              </div>
            </Row>
          </Pane>
        </Paneset>
      </React.Fragment>
    );
  }
}

export default injectCommonProp(ViewMarcRecord);
