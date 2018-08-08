import _ from 'lodash';
import PropTypes from 'prop-types';
import { Observable } from 'rxjs/Observable';
import React from 'react';
import { connect } from '@folio/stripes-connect';
import MultiColumnList from '@folio/stripes-components/lib/MultiColumnList';
import Pane from '@folio/stripes-components/lib/Pane';
import PaneMenu from '@folio/stripes-components/lib/PaneMenu';
import Paneset from '@folio/stripes-components/lib/Paneset';
import IconButton from '@folio/stripes-components/lib/IconButton';
import Icon from '@folio/stripes-components/lib/Icon';
import Callout from '@folio/stripes-components/lib/Callout';
import ConfirmationModal from '@folio/stripes-components/lib/ConfirmationModal';
import { FormattedMessage } from 'react-intl';
import { EditTemplate } from '../';
import { ToolbarButtonMenu } from '../../Core';
import { removeById } from '../../Utils/Formatter';
import * as C from '../../Utils';
import css from '../styles/Template.css';


class TemplateView extends React.Component {
  static manifest = Object.freeze({
    currentTemplate: {},
    currentType: {},
    query: {},
    templateDetails: {
      type: C.RESOURCE_TYPE,
      root: C.ENDPOINT.BASE_URL,
      path: `record-template/%{query}?type=B&lang=${C.ENDPOINT.DEFAULT_LANG}`,
      headers: C.ENDPOINT.HEADERS,
      fetch: false,
      accumulate: true
    },
    recordsTemplates: {
      type: C.RESOURCE_TYPE,
      root: C.ENDPOINT.BASE_URL,
      headers: C.ENDPOINT.HEADERS,
      records: C.API_RESULT_JSON_KEY.TEMPLATES,
      GET: {
        path: 'record-templates?type=%{currentType}&lang=' + C.ENDPOINT.DEFAULT_LANG
      },
      POST: {
        path: `record-template/%{query}?type=B&lang=${C.ENDPOINT.DEFAULT_LANG}`
      },
      PUT: {
        path: `record-template/%{query}?type=B&lang=${C.ENDPOINT.DEFAULT_LANG}`
      },
      DELETE: {
        path: `record-template/%{query}?type=B&lang=${C.ENDPOINT.DEFAULT_LANG}`
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
  static propTypes = {
    stripes: PropTypes.shape({
      connect: PropTypes.func.isRequired,
      intl: PropTypes.object.isRequired,
    }).isRequired,
    mutator: PropTypes.shape({
      currentTemplate: PropTypes.shape({
        update: PropTypes.func,
      }),
      recordsTemplates: PropTypes.shape({
        POST: PropTypes.func,
        PUT: PropTypes.func,
        DELETE: PropTypes.func,
      }),
      query: PropTypes.string,
      templateDetails: PropTypes.shape({
        reset: PropTypes.func,
        GET: PropTypes.func,
        PUT: PropTypes.func,
      }),
      currentType: PropTypes.string
    }).isRequired,
    router: PropTypes.object,
    resources: PropTypes.object,
    history: PropTypes.object
  };


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
      confirming: false,
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
        <FormattedMessage id="ui-marccat.template.delete-completed" />
      </span>
    );
    this.callout.sendCallout({ message });
  }

  handleClose() {
    this.props.history.goBack();
    this.setState({
      showTemplateDetail: false
    });
  }

  handleRowClick=(c, object) => {
    this.props.mutator.templateDetails.reset();
    this.props.mutator.query.replace(object.id);
    this.props.router.push(`templateList/${object.id}`);
    Observable.from(this.props.mutator.templateDetails.GET());
    this.setState({
      showTemplateDetail: true,
      selectedTemplate: object,
    });
  }

  handleAddTemplate() {
    this.props.router.push(C.INTERNAL_URL.ADD_TEMPLATE);
  }

  render() {
    const formatMsg = this.props.stripes.intl.formatMessage;
    const modalHeading = formatMsg({ id: 'ui-marccat.template.delete' });
    const modalMessage = formatMsg({ id: 'ui-marccat.template.delete.modal' });
    const confirmLabel = formatMsg({ id: 'ui-marccat.template.delete.button' });

    const {
      resources: { recordsTemplates },
    } = this.props;
    if (!recordsTemplates || !recordsTemplates.hasLoaded) {
      return <Icon icon="spinner-ellipsis" />;
    }
    let templates = recordsTemplates.records;


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

    const actionMenuItemsDetail = [
      {
        label: formatMsg({
          id: 'ui-marccat.template.create',
        }),
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

    if (this.props.resources.currentTemplate.id !== undefined) {
      templates = removeById(templates, this.props.resources.currentTemplate.id);
    }

    const lastMenu = <ToolbarButtonMenu
      {...this.props}
      create
      className={css.mr15}
      onClick={() => this.props.history.push(C.INTERNAL_URL.ADD_TEMPLATE)}
    />;

    return (
      <Paneset static>
        <Pane
          defaultWidth="fill"
          firstMenu={searchMenu}
          lastMenu={lastMenu}
          paneTitle={formatMsg({
            id: 'ui-marccat.templates.title',
          })}
          paneSub={templates.length + ' Result found'}
          appIcon={{ app: C.META.ICON_TITLE }}
        >
          <MultiColumnList
            id="list-templates"
            loading={!recordsTemplates.hasLoaded}
            contentData={templates}
            rowMetadata={['id', 'id']}
            formatter={formatter}
            ariaLabel="TemplateView"
            visibleColumns={['id', 'name']}
            sortedColumn="name"
            sortOrder="ascending"
            onRowClick={this.handleRowClick}
            containerRef={ref => {
              this.resultsList = ref;
            }}
          />
        </Pane>
        {this.state.showTemplateDetail && (
          <Pane
            defaultWidth="fill"
            paneTitle={this.state.selectedTemplate.name}
            paneSub={`Id ${this.state.selectedTemplate.id}`}
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
  C.META.MODULE_NAME,
);
