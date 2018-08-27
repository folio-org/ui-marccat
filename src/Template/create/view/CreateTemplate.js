/**
 * @format
 * @flow
 */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import _ from 'lodash';
import React from 'react';
import Paneset from '@folio/stripes-components/lib/Paneset';
import Pane from '@folio/stripes-components/lib/Pane';
import Layer from '@folio/stripes-components/lib/Layer';
import stripesForm from '@folio/stripes-form';
import { ExpandAllButton } from '@folio/stripes-components/lib/Accordion';
import { Row, Col } from '@folio/stripes-components/lib/LayoutGrid';
import { ToolbarButtonMenu } from '../../../Core';
import {
  TemplateInfo,
  MandatoryTableInfo,
  TagInfo, validate,
  asyncValidate
} from '../';
import css from '../../styles/Template.css';

type CreateTemplateProps = {
    router: Object;
    resources: Object;
    submitting: boolean;
    handleExpandAll: () => void;
    handleKeyDown: () => void;
    handleSectionToggle: () => void;
    handleClose: () => void;
}

type CreateTemplateState = {
  sections: Object;
  isOpened: boolean;
};

class CreateTemplate extends React.Component<CreateTemplateProps, CreateTemplateState> {
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
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleClose = () => {
    this.setState({
      isOpened: false
    });
    this.props.router.goBack();
  };

  handleExpandAll = (sections) => {
    this.setState({ sections });
  }

  handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  }

  handleSectionToggle = ({ id }) => {
    this.setState((curState) => {
      const newState = _.cloneDeep(curState);
      newState.sections[id] = !newState.sections[id];
      return newState;
    });
  }

  handleFormSubmit = () => {
    const { state: { form } } = this.props;
    const formToSubmit = form.templateForm.values;
    if(this.props.dirty){alert(this.props.dirty && formToSubmit)}
    
  };

  render() {
    const { sections, isOpened } = this.state;
    const { submitting, resources: { mandatory } } = this.props;
    const newButtonMenu = <ToolbarButtonMenu
      {...this.props}
      create
      className={css.mr15}
      label="ui-marccat.template.create"
      disabled={submitting}
      onClick={this.handleFormSubmit}
    />;
    return (
      <Layer isOpen={isOpened}>
        <form id="create-template" name="templateForm" onKeyDown={this.handleKeyDown}>
          <Paneset isRoot>
            <Pane
              defaultWidth="fill"
              paneTitle="Create Template"
              lastMenu={newButtonMenu}
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
              <TagInfo accordionId="tagInfo" expanded={sections.tagInfo} onToggle={this.handleSectionToggle} mandatory={mandatory} {...this.props} />
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
  asyncBlurFields: ['templateName', 'marcCategory', 'headingType'],
  navigationCheck: true,
  enableReinitialize: true
})(CreateTemplate);
