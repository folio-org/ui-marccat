import React from 'react';
import Pane from '@folio/stripes-components/lib/Pane';
import Paneset from '@folio/stripes-components/lib/Paneset';
import PaneMenu from '@folio/stripes-components/lib/PaneMenu';
import IconButton from '@folio/stripes-components/lib/IconButton';
import { connect } from '@folio/stripes-connect';
import TemplateForm from '../form/TemplateForm';
import * as C from '../../Utils';


type CreateTemplateProps = {
  stripes: Object;
  history: Object;
  resources: Object;
};
type CreateTemplateState = {
  currentTemplate: {

  };
};

class CreateTemplate extends React.Component<CreateTemplateProps, CreateTemplateState> {
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
      <Paneset static>
        <Pane
          actionMenuItems={actionMenuItems}
          firstMenu={this.preparePaneMenu()}
          defaultWidth="fill"
          paneTitle={formatMsg({
            id: 'ui-marccat.template.create',
          })}
          appIcon={{ app: C.META.ICON_TITLE }}
        >
          <div>
            <TemplateForm {...this.props} />
          </div>
        </Pane>
      </Paneset>
    );
  }
}

export default connect(CreateTemplate);
