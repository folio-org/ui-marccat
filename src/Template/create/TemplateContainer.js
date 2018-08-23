import _ from 'lodash';
import React from 'react';
import Paneset from '@folio/stripes-components/lib/Paneset';
import Pane from '@folio/stripes-components/lib/Pane';
import Layer from '@folio/stripes-components/lib/Layer';
import stripesForm from '@folio/stripes-form';
import { ExpandAllButton } from '@folio/stripes-components/lib/Accordion';
import { Row, Col } from '@folio/stripes-components/lib/LayoutGrid';
import { TemplateInfo, MandatoryTableInfo, TagInfo } from './section/';
import { validate, asyncValidate } from './validation/Validator';

type CreateTemplateContainerProps = {
    router: Object;
}

class CreateTemplateContainer extends React.Component<CreateTemplateContainerProps, {}> {
  constructor(props) {
    super(props);
    this.state = {
      sections: {
        createTemplateInfo: false,
        mandatoryTableInfo: false,
        tagInfo: false,
      },
      isOpened: true
    };

    this.handleExpandAll = this.handleExpandAll.bind(this);
    this.handleSectionToggle = this.handleSectionToggle.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleClose = () => {
    this.setState({
      isOpened: false
    });
    this.props.router.goBack();
  };

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
    const { sections, isOpened, onSubmit } = this.state;
    return (
      <Layer isOpen={isOpened}>
        <form id="create-template" onSubmit={onSubmit}>
          <Paneset isRoot>
            <Pane
              defaultWidth="fill"
              paneTitle="Create Template"
              paneSub="No Result found"
              appIcon={{ app: 'marccat' }}
              dismissible
              onClose={this.handleClose}
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
  validate,
  asyncValidate,
  asyncBlurFields: ['templateName'],
  navigationCheck: true,
  enableReinitialize: true,
})(CreateTemplateContainer);
