import React from 'react';
import PropTypes from 'prop-types';
import Pane from '@folio/stripes-components/lib/Pane';
import Paneset from '@folio/stripes-components/lib/Paneset';
import PaneMenu from '@folio/stripes-components/lib/PaneMenu';
import IconButton from '@folio/stripes-components/lib/IconButton';
import { connect } from '@folio/stripes-connect';
import { remapMultiArray } from '../../Utils/Mapper';
import TemplateForm from '../form/TemplateForm';
import * as C from '../../Utils';

class CreateTemplate extends React.Component {
  static propTypes = {
    stripes: PropTypes.shape({
      connect: PropTypes.func.isRequired,
      intl: PropTypes.object.isRequired,
    }).isRequired,
  };

  static manifest = Object.freeze({
    query: { initialValue: {} },
    resultCount: { initialValue: C.INITIAL_RESULT_COUNT },
    records: {
      type: C.RESOURCE_TYPE,
      root: C.ENDPOINT.BASE_URL,
      path: C.ENDPOINT.TEMPLATE_MANDATORY,
      headers: C.ENDPOINT.HEADERS,
      records: 'fields',
      GET: { params: { lang: C.ENDPOINT.DEFAULT_LANG } },
      POST: {
        path:
          C.ENDPOINT.BASE_URL +
          C.ENDPOINT.TEMPLATE_MANDATORY,
      },
      PUT: {
        path:
          C.ENDPOINT.BASE_URL +
          C.ENDPOINT.TEMPLATE_MANDATORY,
      },
      DELETE: {
        path:
          C.ENDPOINT.BASE_URL +
          C.ENDPOINT.TEMPLATE_MANDATORY,
      },
    },
  });

  constructor(props) {
    super(props);
    this.state = {};
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
    const {
      resources: { records },
    } = this.props; // eslint-disable-line react/prop-types
    if (!records || !records.hasLoaded) return <div />;
    const obj = remapMultiArray(records.records);

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
            <TemplateForm
              {...this.props}
              mandatoryField={obj}
            />
          </div>
        </Pane>
      </Paneset>
    );
  }
}

export default connect(
  CreateTemplate,
  C.META.MODULE_NAME,
);
