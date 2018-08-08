/**
 * @format
 * @flow
 */
/* eslint-disable */
import * as React from 'react';
import _ from 'lodash';
import { connect } from '@folio/stripes-connect';
import Layer from '@folio/stripes-components/lib/Layer';
import Pane from '@folio/stripes-components/lib/Pane';
import { Row, Col } from '@folio/stripes-components/lib/LayoutGrid';
import { ExpandAllButton } from '@folio/stripes-components/lib/Accordion';
import EditTemplateInfo from './section/EditTemplateInfo';
import EditTemplateTag from './section/EditTemplateTag';
import { ToolbarMenu } from '../../Core';
import * as C from '../../Utils';

class EditTemplate extends React.Component {
  static manifest = Object.freeze({
    query: { initialValue: {} },
    resultCount: { initialValue: C.INITIAL_RESULT_COUNT },
    records: {
      type: C.RESOURCE_TYPE,
      root: C.ENDPOINT.BASE_URL,
      path: C.ENDPOINT.TEMPLATE_MANDATORY,
      headers: C.ENDPOINT.HEADERS,
      records: 'fields',
      GET: {
        params: { lang: C.ENDPOINT.DEFAULT_LANG },
      },
    },
  });

  constructor(props) {
    super(props);
    this.state = {
      section: {
        editTemplateInfo: false,
        editTemplateTag: false,
      },
    };
    this.handleExpandAll = this.handleExpandAll.bind(this);
    this.handleSectionToggle = this.handleSectionToggle.bind(this);
  }

  handleExpandAll(section) {
    this.setState({ section });
  }

  handleSectionToggle({ id }) {
    this.setState(curState => {
      const newState = _.cloneDeep(curState);
      newState.section[id] = !newState.section[id];
      return newState;
    });
  }

  handleButtonClick = () => {};

  handleEditTemplate = () => {
    const settings = {
      id: 288,
      name: '',
    };
    this.props.mutator.recordsTemplates.POST(settings);
  };

  render() {
    const { section } = this.state;
    const { selectedTemplate, handleClose } = this.props;
    const rightMenu = <ToolbarMenu icon={['trashBin', 'comment', 'edit']} />;
    return (
      <Layer open>
      <Pane
        defaultWidth="fill"
        lastMenu={rightMenu}
        paneTitle={selectedTemplate.name}
        paneSub={`Id ${selectedTemplate.id}`}
        appIcon={{ app: C.META.ICON_TITLE }}
        dismissible
        onClose={handleClose}
      >
        <Row end="xs">
          <Col xs>
            <ExpandAllButton accordionStatus={section} onToggle={this.handleExpandAll} />
          </Col>
        </Row>
        <EditTemplateInfo
          {...this.props}
          accordionId="editTemplateInfo"
          expanded={section.editTemplateInfo}
          selectedTemplate={selectedTemplate}
          onToggle={this.handleSectionToggle}
        />
        <EditTemplateTag
          {...this.props}
          accordionId="editTemplateTag"
          expanded={section.editTemplateTag}
          onToggle={this.handleSectionToggle}
        />
      </Pane>
      </Layer>
    );
  }
}

export default connect(EditTemplate, C.META.MODULE_NAME);
