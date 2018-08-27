/**
 * @format
 */
/* eslint-disable */
import * as React from 'react';
import { Observable } from 'rxjs/Observable';
import { connect } from '@folio/stripes-connect';
import Pane from '@folio/stripes-components/lib/Pane';
import Paneset from '@folio/stripes-components/lib/Paneset';
import Icon from '@folio/stripes-components/lib/Icon';
import Callout from '@folio/stripes-components/lib/Callout';
import { FormattedMessage } from 'react-intl';
import TemplateResults from './TemplateResult';
import TemplateDetailModal from './TemplateDeleteModal';
import * as C from '../../Utils';


class TemplateView extends React.Component<*> {
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
        path: `record-template?type=B&lang=${C.ENDPOINT.DEFAULT_LANG}`
      },
      PUT: {
        path: `record-template/%{query}?type=B&lang=${C.ENDPOINT.DEFAULT_LANG}`
      },
      DELETE: {
        path: `record-template/%{query}?type=B&lang=${C.ENDPOINT.DEFAULT_LANG}`
      }
    },
    mandatory: {
      type: C.RESOURCE_TYPE,
      root: C.ENDPOINT.BASE_URL,
      path: C.ENDPOINT.TEMPLATE_MANDATORY,
      headers: C.ENDPOINT.HEADERS,
      records: C.API_RESULT_JSON_KEY.FIELDS,
      GET: {
        params: { lang: C.ENDPOINT.DEFAULT_LANG },
      },
    },
  });

  constructor(props) {
    super(props);
    this.state = {
      confirming: false,
      showTemplateDetail: false,
      selectedTemplate: {},
    };
    this.props.mutator.currentType.replace('B');
    this.handleRowClick = this.handleRowClick.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.hideConfirm = this.hideConfirm.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.saveTemplate = this.saveTemplate.bind(this);
    this.callout = null;
  }

  onDelete() {
    const { mutator } = this.props;
    const toDelete = this.state.selectedTemplate;
    mutator.currentTemplate.update({ id: toDelete.id });

    const deleteSubscrition = Observable.fromPromise(mutator.recordsTemplates.DELETE(toDelete));

    deleteSubscrition
      .catch(this.showCalloutMessage('ui-marccat.template.delete.error'))
      .finally(this.hideConfirm())
      .subscribe(s => this.showCalloutMessage());
  }

  handleClose = () => {
    this.setState({
      showTemplateDetail: false
    })
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

  showCalloutMessage(msg?: string) {
    const message = (
      <span>
        <FormattedMessage id="ui-marccat.template.delete-completed" />
      </span>
    );
    this.callout.sendCallout({ message });
  }

  handleRowClick = (c, object) => {
    this.props.mutator.templateDetails.reset();
    this.props.mutator.query.replace(object.id);
  }

  saveTemplate = () => {};

  render() {
    const formatMsg = this.props.stripes.intl.formatMessage;
    const { router, resources: { recordsTemplates, mandatory } } = this.props;
    return (
      <Paneset static>
        <TemplateResults
          {...this.props}
          handleRowClick={this.handleRowClick}
          formatMsg={formatMsg}
          onClick={() => router.push(C.INTERNAL_URL.ADD_TEMPLATE)}
        >
          <TemplateDetailModal 
              {...this.props}
              open={this.state.confirming}
              onConfirm={this.onDelete}
              onCancel={this.hideConfirm}
            />
            <Callout ref={(ref) => { this.callout = ref; }} />
        </TemplateResults>
      </Paneset>
    );
  }
}

export default connect(
  TemplateView,
  C.META.MODULE_NAME,
);
