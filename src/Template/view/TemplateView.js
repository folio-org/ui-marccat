import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from '@folio/stripes-connect';
import MultiColumnList from '@folio/stripes-components/lib/MultiColumnList';
import Pane from '@folio/stripes-components/lib/Pane';
import PaneMenu from '@folio/stripes-components/lib/PaneMenu';
import Paneset from '@folio/stripes-components/lib/Paneset';
import IconButton from '@folio/stripes-components/lib/IconButton';
import Callout from '@folio/stripes-components/lib/Callout';
import ConfirmationModal from '@folio/stripes-components/lib/structures/ConfirmationModal';
import { FormattedMessage } from 'react-intl';
import { EditTemplate } from '../';
import * as C from '../../Utils';
import css from '../../Search/style/Search.css';

class TemplateView extends React.Component {
  static propTypes = {
    // eslint-disable-line react/no-unused-prop-types
    stripes: PropTypes.shape({
      // eslint-disable-line react/no-unused-prop-types
      connect: PropTypes.func,
      intl: PropTypes.object,
    }),
    history: PropTypes.shape({
      goBack: PropTypes.func,
      pop: PropTypes.func,
      push: PropTypes.func,
    }),
    mutator: PropTypes.shape({
      currentTemplate: PropTypes.shape({
        update: PropTypes.func,
      }),
      recordsTemplates: PropTypes.shape({
        POST: PropTypes.func,
        PUT: PropTypes.func,
        DELETE: PropTypes.func,
      }),
    }).isRequired,
    
  };

  static manifest = Object.freeze({
    currentTemplate: {},
    currentType: {},
    recordsTemplates: {
      type: C.RESOURCE_TYPE,
      root: C.ENDPOINT.BASE_URL,      
      headers: C.ENDPOINT.HEADERS,
      records: C.API_RESULT_JSON_KEY.TEMPLATES,
      GET: {
        path: 'record-templates?type=%{currentType}&lang=' + C.ENDPOINT.DEFAULT_LANG        
      },
      POST: {
        path: 'record-template/%{currentTemplate.id}',
      },
      PUT: {
        path: 'record-template/%{currentTemplate.id}',
      },
      DELETE: {
        path: 'record-template/%{currentTemplate.id}',
        params: { lang: C.ENDPOINT.DEFAULT_LANG, type: 'B', }
      }
    }
  });

  constructor(props) {
    super(props);
    this.state = {
      confirming: false,
      showTemplateDetail: false,
      selectedTemplate: {},
    };

    this.props.mutator.currentType.replace('B');

    this.connectedEditTemplateView = props.stripes.connect(EditTemplate);
    this.handleAddTemplate = this.handleAddTemplate.bind(this);
    this.handleRowClick = this.handleRowClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.showConfirm = this.showConfirm.bind(this);
    this.hideConfirm = this.hideConfirm.bind(this);
    this.callout = null;
  }

  onDelete() {
    const toDelete = this.state.selectedTemplate;
    this.props.mutator.currentTemplate.update({ id: toDelete.id });
    return this.props.mutator.recordsTemplates.DELETE(toDelete)
      .then(() => this.deleteResolve())
      .then(() => this.showCalloutMessage())
      .catch(() => this.deleteReject())
      .finally(() => this.hideConfirm());
  }

  hideConfirm() {
    this.setState({
      confirming: false
    });
  }

  showConfirm() {    
    this.setState({
      confirming: true,      
    });
    this.deletePromise = new Promise((resolve, reject) => {    
      this.deleteResolve = resolve;
      this.deleteReject = reject;
    });
    return this.deletPromise; 
  }

  showCalloutMessage() {
    const message = (
      <span>
        <FormattedMessage id="ui-cataloging.template.delete-completed" />
      </span>
    );
    this.callout.sendCallout({ message });
  }

  handleClose() {
    this.setState(curState => {
      const newState = _.cloneDeep(curState);
      newState.showTemplateDetail = !this.state.showTemplateDetail;
      return newState;
    });
  }

  handleRowClick() {
    this.setState({});
  }

  handleAddTemplate() {
    this.props.history.push(C.INTERNAL_URL.ADD_TEMPLATE);
  }

  render() {
    const formatMsg = this.props.stripes.intl.formatMessage;
    const modalHeading = formatMsg({ id: 'ui-cataloging.template.delete' });
    const modalMessage = formatMsg({ id: 'ui-cataloging.template.delete.modal' });
    const confirmLabel = formatMsg({ id: 'ui-cataloging.template.delete.button' });

    const {
      resources: { recordsTemplates },
    } = this.props; // eslint-disable-line react/prop-types
    if (!recordsTemplates || !recordsTemplates.hasLoaded) {
      return <div />;
    }
    const templates = recordsTemplates.records;

    const formatter = {
      'Id: id': x => _.get(x, ['id']),
      'name: name': x => _.get(x, ['name']),
    };

    const searchMenu = (
      <PaneMenu>
        <IconButton
          key="icon-search"
          icon="search"
          onClick={() => this.props.history.push(C.INTERNAL_URL.ADVANCE_SEARCH)}
        />
      </PaneMenu>
    );

    const deleteMenu = (
      <PaneMenu>
        <IconButton 
          key="icon-trash" 
          icon="trashBin" 
          onClick={this.showConfirm}
        />

        <IconButton key="icon-save" icon="save" />
        <IconButton key="icon-edit" icon="edit" />
      </PaneMenu>
    );

    const lastMenu = (
      <PaneMenu {...this.props}>
        <IconButton
          onClick={this.handleAddTemplate}
          key="icon-plus-sign"
          icon="plus-sign"
          className={css.icon_plus}
        />
        <IconButton key="icon-gear" icon="gear" />
      </PaneMenu>
    );

    const actionMenuItems = [
      {
        label: formatMsg({
          id: 'ui-marccat.template.create',
        }),
        onClick: () => {
          this.props.history.push(C.INTERNAL_URL.ADD_TEMPLATE);
        },
      },
    ];

    const actionMenuItemsDetail = [
      {
        label: formatMsg({
          id: 'ui-marccat.template.create',
        }),
        onClick: () => {
          this.props.history.push(C.INTERNAL_URL.ADD_TEMPLATE);
        },
      },
      {
        label: formatMsg({
          id: 'ui-marccat.template.tag.create',
        }),
        onClick: () => {
          this.props.history.push(C.INTERNAL_URL.ADD_TEMPLATE);
        },
      },
    ];

    return (
      <Paneset static>
        <Pane
          defaultWidth="fill"
          actionMenuItems={actionMenuItems}
          firstMenu={searchMenu}
          lastMenu={lastMenu}
          paneTitle={formatMsg({
            id: 'ui-marccat.templates.title',
          })}
          paneSub={templates.length + ' Result found'}          
          appIcon={{ app: 'cataloging' }}
        >
          <MultiColumnList
            id="list-templates"
            contentData={templates}            
            rowMetadata={['id', 'id']}
            formatter={formatter}
            ariaLabel="TemplateView"
            visibleColumns={['id', 'name']}
            sortedColumn="name"
            sortOrder="ascending"
            onRowClick={(c, object) => {
              this.setState({
                showTemplateDetail: true,
                selectedTemplate: object,
              });
            }}
            containerRef={ref => {
              this.resultsList = ref;
            }}
          />
        </Pane>
        {this.state.showTemplateDetail && (
          <Pane
            defaultWidth="fill"
            paneTitle={this.state.selectedTemplate.name}
            paneSub={'Id ' + this.state.selectedTemplate.id}
            appIcon={{ app: C.META.ICON_TITLE }}
            dismissible
            onClose={this.handleClose}
            actionMenuItems={actionMenuItemsDetail}
            lastMenu={deleteMenu}
          >
            <this.connectedEditTemplateView
              {...this.props}
              selectedTemplate={this.state.selectedTemplate}
            />
            <ConfirmationModal
              open={this.state.confirming}
              heading={modalHeading}
              message={modalMessage}
              onConfirm={this.onDelete}
              onCancel={this.hideConfirm}
              confirmLabel={confirmLabel}
            />
            <Callout ref={(ref) => { this.callout = ref; }} />
          </Pane>
        )}
      </Paneset>
    );
  }
}

export default connect(
  TemplateView,
  C.META.MODULE_NAME
);
