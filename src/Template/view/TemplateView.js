import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from '@folio/stripes-connect';
import MultiColumnList from '@folio/stripes-components/lib/MultiColumnList';
import Pane from '@folio/stripes-components/lib/Pane';
import PaneMenu from '@folio/stripes-components/lib/PaneMenu';
import Paneset from '@folio/stripes-components/lib/Paneset';
import IconButton from '@folio/stripes-components/lib/IconButton';
import { EditTemplate } from '../';
import * as C from '../../Utils';
import css from '../styles/TemplateView.css';

class TemplateView extends React.Component {
  static propTypes = {// eslint-disable-line react/no-unused-prop-types
    stripes: PropTypes.shape({ // eslint-disable-line react/no-unused-prop-types
      connect: PropTypes.func,
      intl: PropTypes.object,
    }),
    history: PropTypes.shape({
      goBack: PropTypes.func,
      pop: PropTypes.func,
      push: PropTypes.func,
    })
  };

  static manifest = Object.freeze({
    query: { initialValue: {} },
    resultCount: { initialValue: C.INITIAL_RESULT_COUNT },
    recordsTemplates: {
      type: C.RESOURCE_TYPE,
      root: C.ENDPOINT.BASE_URL,
      path: C.ENDPOINT.TEMPLATE_URL,
      headers: { 'x-okapi-tenant': 'tnx' },
      records: C.API_RESULT_JSON_KEY.TEMPLATES,
      GET: {
        params: { lang: 'ita', type: 'B' },
      },
    }
  });

  constructor(props) {
    super(props);
    this.state = {
      showTemplateDetail: false,
      selectedTemplate: {}
    };
    this.connectedEditTemplateView = props.stripes.connect(EditTemplate);
    this.handleAddTemplate = this.handleAddTemplate.bind(this);
    this.handleRowClick = this.handleRowClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleClose() {
    this.setState((curState) => {
      const newState = _.cloneDeep(curState);
      newState.showTemplateDetail = !this.state.showTemplateDetail;
      return newState;
    });
  }

  handleRowClick() {
    this.setState({
    });
  }

  handleAddTemplate() {
    this.props.history.push(C.INTERNAL_URL.ADD_TEMPLATE);
  }

  showToaster() {
    this.setState({
    });
  }

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

    const deleteMenu = (
      <PaneMenu>
        <IconButton key="icon-trash" icon="trashBin" />
        <IconButton key="icon-edit" icon="edit" />
      </PaneMenu>
    );

    const lastMenu = (
      <PaneMenu className={css.icon_plus} {...this.props}>
        <IconButton key="icon-gear" icon="gear" />
        <IconButton key="icon-plus-sign" icon="plus-sign" onClick={this.handleAddTemplate} className={css.icon_plus} />
      </PaneMenu>
    );

    const actionMenuItems = [
      {
        label: formatMsg({ id: 'ui-cataloging.template.create' }),
        onClick: () => {
          this.props.history.push(C.INTERNAL_URL.ADD_TEMPLATE);
        },
      }
    ];

    const actionMenuItemsDetail = [
      {
        label: formatMsg({ id: 'ui-cataloging.template.create' }),
        onClick: () => {
          this.props.history.push(C.INTERNAL_URL.ADD_TEMPLATE);
        },
      },
      {
        label: formatMsg({ id: 'ui-cataloging.template.tag.create' }),
        onClick: () => {
          this.props.history.push(C.INTERNAL_URL.ADD_TEMPLATE);
        },
      }
    ];

    return (
      <Paneset>
        <Pane
          actionMenuItems={actionMenuItems}
          firstMenu={searchMenu}
          lastMenu={lastMenu}
          defaultWidth="fill"
          paneTitle={formatMsg({ id: 'ui-cataloging.templates.title' })}
          paneSub={templates.length + ' Result found'}
          appIcon={{ app: 'cataloging' }}
        >
          <MultiColumnList
            id="list-templates"
            contentData={templates}
            rowMetadata={['id', 'id']}
            formatter={formatter}
            ariaLabel="TemplateView"
            visibleColumns={
              ['id', 'name']}
            sortedColumn="name"
            sortOrder="ascending"
            onRowClick={(c, object) => {
              this.setState({
                showTemplateDetail: true,
                selectedTemplate: object
              });
            }}
            containerRef={ref => {
              this.resultsList = ref;
            }}
          />
        </Pane>
        {this.state.showTemplateDetail &&
        <Pane
          defaultWidth="fill"
          paneTitle={this.state.selectedTemplate.name}
          paneSub={'Id ' + this.state.selectedTemplate.id}
          appIcon={{ app: 'cataloging' }}
          dismissible
          onClose={this.handleClose}
          actionMenuItems={actionMenuItemsDetail}
          lastMenu={deleteMenu}
        >
          <this.connectedEditTemplateView
            {...this.props}
            selectedTemplate={this.state.selectedTemplate}
          />
        </Pane>
          }
      </Paneset>
    );
  }
}

export default connect(TemplateView, C.META.MODULE_NAME);
