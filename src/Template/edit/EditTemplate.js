import React from 'react';
import stripesForm from '@folio/stripes-form';
import { Row, Col } from '@folio/stripes-components/lib/LayoutGrid';
import { ExpandAllButton } from '@folio/stripes-components/lib/Accordion';
import EditTemplateInfo from './section/EditTemplateInfo';
import EditTemplateTag from './section/EditTemplateTag';

class EditTemplate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      section: {
        editTemplateInfo: false,
        editTemplateTag: false
      }
    };
    this.handleExpandAll = this.handleExpandAll.bind(this);
    this.handleSectionToggle = this.handleSectionToggle.bind(this);
  }

  handleExpandAll(section) {
    this.setState({ section });
  }

  handleSectionToggle({ id }) {
    this.setState((curState) => {
      const newState = _.cloneDeep(curState);
      newState.section[id] = !newState.section[id];
      return newState;
    });
  }

  render() {
    const { section } = this.state;

    return (
      <form>
        <Row end="xs">
          <Col xs>
            <ExpandAllButton accordionStatus={section} onToggle={this.handleExpandAll} />
          </Col>
        </Row>
        <EditTemplateInfo {...this.props} accordionId="editTemplateInfo" expanded={section.editTemplateInfo} selectedTemplate={this.props.selectedTemplate} onToggle={this.handleSectionToggle} />
        <EditTemplateTag {...this.props} accordionId="editTemplateTag" expanded={section.editTemplateTag} mandatoryFields={{}} onToggle={this.handleSectionToggle} />
      </form>
    );
  }
}

EditTemplate.propTypes = {};

export default stripesForm({
  form: 'EditTemplateForm',
})(EditTemplate);

