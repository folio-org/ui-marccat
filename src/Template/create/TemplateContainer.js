import _ from 'lodash';
import React from 'react';
import Paneset from '@folio/stripes-components/lib/Paneset';
import Pane from '@folio/stripes-components/lib/Pane';
import Layer from '@folio/stripes-components/lib/Layer';
import stripesForm from '@folio/stripes-form';
import { ExpandAllButton } from '@folio/stripes-components/lib/Accordion';
import { Row, Col } from '@folio/stripes-components/lib/LayoutGrid';


import TemplateInfo from './section/TemplateInfo';
import MandatoryTableInfo from './section/MandatoryTableInfo';
import TagInfo from './section/TagInfo';

class TemplateForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sections: {
        createTemplateInfo: true,
        mandatoryTableInfo: true,
        tagInfo: true,
      },
    };

    this.handleExpandAll = this.handleExpandAll.bind(this);
    this.handleSectionToggle = this.handleSectionToggle.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  handleExpandAll(sections) {
    this.setState({ sections });
  }

  handleKeyDown(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  }

  handleSectionToggle({ id }) {
    this.setState((curState) => {
      const newState = _.cloneDeep(curState);
      newState.sections[id] = !newState.sections[id];
      return newState;
    });
  }

  render() {
    const { sections } = this.state;
    return (
      <Layer isOpen>
        <form id="create-template">
          <Paneset isRoot>
            <Pane
              defaultWidth="fill"
              paneTitle="Create Template"
              paneSub="No Result found"
              appIcon={{ app: 'marccat' }}
              dismissible
              onClose={() => {}}
            >
              <Row end="xs">
                <Col xs>
                  <ExpandAllButton accordionStatus={sections} onToggle={this.handleExpandAll} />
                </Col>
              </Row>
              <TemplateInfo accordionId="createTemplateInfo" expanded={sections.createTemplateInfo} onToggle={this.handleSectionToggle} {...this.props} />
              <MandatoryTableInfo accordionId="mandatoryTableInfo" expanded={sections.mandatoryTableInfo} onToggle={this.handleSectionToggle} {...this.props} />
              <TagInfo accordionId="tagInfo" expanded={sections.tagInfo} onToggle={this.handleSectionToggle} {...this.props} />
            </Pane>
          </Paneset>
        </form>
      </Layer>
    );
  }
}

export default stripesForm({
  form: 'templateForm',
  navigationCheck: true,
  enableReinitialize: true,
})(TemplateForm);
