import React from 'react';
import Pane from '@folio/stripes-components/lib/Pane';
import Paneset from '@folio/stripes-components/lib/Paneset';
import PaneMenu from '@folio/stripes-components/lib/PaneMenu';
import IconButton from '@folio/stripes-components/lib/IconButton';
import { connect } from '@folio/stripes-connect';
import Layer from '@folio/stripes-components/lib/Layer';
import { FormattedMessage } from 'react-intl';
import { Row, Col } from '@folio/stripes-components/lib/LayoutGrid';
import Button from '@folio/stripes-components/lib/Button';
import TemplateForm from '../form/TemplateForm';
import CreateTag from './CreateTag';
import * as C from '../../Utils';


type CreateTemplateProps = {
  stripes: Object,
  history: Object,
  resources: Object,
};
type CreateTemplateState = {
  currentTemplate: Object,
  showTagForm: Boolean,
};

class CreateTemplate extends React.Component<CreateTemplateProps, CreateTemplateState> {
  constructor(props) {
    super(props);
    this.state = {
      showTagForm: false
    };
    this.showTagForm = this.showTagForm.bind(this);
  }

  showTagForm() {
    const currentShowTagForm = this.state.showTagForm;
    this.setState({ showTagForm: !currentShowTagForm });
  }

  preparePaneMenu() {
    return (
      <PaneMenu {...this.props}>
        <IconButton
          key="icon-close"
          icon="closeX"
          onClick={this.props.history.goBack}
        />
      </PaneMenu>
    );
  }

  render() {
    const formatMsg = this.props.stripes.intl.formatMessage;


    const actionMenuItems = [
      {
        label: formatMsg({
          id: 'ui-marccat.template.tag.create',
        }),
        onClick: () => {
          this.props.history.pop();
        },
      },
      {
        label: formatMsg({
          id: 'ui-marccat.template.save',
        }),
        onClick: () => {
          this.props.history.push(C.INTERNAL_URL.VIEW_TEMPLATE);
        },
      },
      {
        label: formatMsg({
          id: 'ui-catalmarccatoging.button.backto',
        }),
        onClick: () => {
          this.props.history.push(C.INTERNAL_URL.VIEW_TEMPLATE);
        },
      },
    ];
    return (
      <Layer isOpen>
        <Paneset static>
          <Pane
            actionMenuItems={actionMenuItems}
            firstMenu={this.preparePaneMenu()}
            defaultWidth="100%"
            paneTitle={formatMsg({
              id: 'ui-marccat.template.create',
            })}
            id="templateCreate"
            appIcon={{ app: C.META.ICON_TITLE }}
          >
            <Paneset static>
              <Pane
                id="templateCreate"
                defaultWidth="fill"
                fluidContentWidth
              >
                <TemplateForm {...this.props} />
                <Row>
                  <Col>
                    <Button
                      {...this.props}
                      onClick={this.showTagForm}
                      type="button"
                      buttonStyle="primary"
                    >
                      <FormattedMessage id="ui-marccat.template.tag.create" />
                    </Button>
                  </Col>
                </Row>
              </Pane>
              { this.state.showTagForm &&
                <Pane
                  defaultWidth="50%"
                  dismissible
                  onClose={this.showTagForm}
                  paneTitle={formatMsg({
                    id: 'ui-marccat.template.tag.create',
                  })}
                >
                  <CreateTag {...this.props} />
                </Pane>
              }
            </Paneset>
          </Pane>
        </Paneset>
      </Layer>

    );
  }
}

export default connect(CreateTemplate, C.META.MODULE_NAME);
