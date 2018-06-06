import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from '@folio/stripes-connect';
import MultiColumnList from '@folio/stripes-components/lib/MultiColumnList';
import Pane from '@folio/stripes-components/lib/Pane';
import PaneMenu from '@folio/stripes-components/lib/PaneMenu';
import IconButton from '@folio/stripes-components/lib/IconButton';
import { TemplateAddButton } from './';
import Toaster from '../Toaster';
import * as C from '../Utils';

class TemplateView extends React.Component {
  static propTypes = {// eslint-disable-line react/no-unused-prop-types
    stripes: PropTypes.shape({ // eslint-disable-line react/no-unused-prop-types
      connect: PropTypes.func.isRequired,
      intl: PropTypes.object.isRequired,
    }).isRequired,
    router: PropTypes.shape({// eslint-disable-line react/no-unused-prop-types
      history: PropTypes.shape({
        replace: PropTypes.func.isRequired
      }).isRequired
    }).isRequired
  };

  static manifest = Object.freeze({
    query: { initialValue: {} },
    resultCount: { initialValue: C.INITIAL_RESULT_COUNT },
    recordsTemplates: {
      type: C.RESOURCE_TYPE,
      root: C.ENDPOINT.BASE_URL,
      path: C.ENDPOINT.TEMPLATE_URL,
      headers: C.ENDPOINT.HEADER,
      records: C.API_RESULT_JSON_KEY.TEMPLATES,
      GET: {
        params: { lang: 'ita', type: 'B' },
      },
    }
  });


  render() {
    const formatMsg = this.props.stripes.intl.formatMessage;

    const { resources: { recordsTemplates } } = this.props; // eslint-disable-line react/prop-types
    if (!recordsTemplates || !recordsTemplates.hasLoaded) return <div />;
    const templates = recordsTemplates.records;
    const formatter = {
      'Id: id': x => _.get(x, ['id']),
      'name: name': x => _.get(x, ['name']),
    };

    const searchMenu = (
      <PaneMenu>
        <IconButton key="icon-search" icon="search" />
      </PaneMenu>
    );

    const lastMenu = (
      <TemplateAddButton />
    );


    const actionMenuItems = [
      {
        label: 'New',
        onClick: () => {
          // console.log('click!');
        },
      },
      {
        label: 'edit',
        href: '/cataloging/template/new',
      },
      {
        label: 'delete',
        href: '#export',
      },
    ];

    return (
      <Pane
        actionMenuItems={actionMenuItems}
        firstMenu={searchMenu}
        lastMenu={lastMenu}
        defaultWidth="fill"
        paneTitle={formatMsg({ id: 'ui-cataloging.templates.title' })}
        paneSub={recordsTemplates.records.length + ' result found'}
        appIcon={{ app: 'cataloging' }}
      >
        <MultiColumnList
          id="list-templates"
          contentData={templates}
          rowMetadata={['id', 'id']}
          formatter={formatter}
          visibleColumns={['id', 'name']}
          ariaLabel="TemplateView"
          containerRef={ref => {
            this.resultsList = ref;
          }}
          rowFormatter={this.anchoredRowFormatter}
        />
        <div>
          <Toaster toasts={[{ message: 'an error!', id: 'my-toast-id', type: 'error' }]} />
        </div>
      </Pane>
    );
  }
}

export default connect(TemplateView, C.META.MODULE_NAME);
