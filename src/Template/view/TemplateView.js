/**
 * @format
 * @flow
 */
/* eslint-disable */
import React from 'react';
import { Observable } from 'rxjs/Observable';
import { connect } from '@folio/stripes-connect';
import Pane from '@folio/stripes-components/lib/Pane';
import Paneset from '@folio/stripes-components/lib/Paneset';
import Icon from '@folio/stripes-components/lib/Icon';
import Callout from '@folio/stripes-components/lib/Callout';
import { FormattedMessage } from 'react-intl';
import { EditTemplate } from '../';
import TemplateResults from './TemplateResult';
import TemplateDetailModal from './TemplateDeleteModal';
import * as C from '../../Utils';


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
    this.handleRowClick = this.handleRowClick.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.showConfirm = this.showConfirm.bind(this);
    this.hideConfirm = this.hideConfirm.bind(this);
    this.handleClose = this.handleClose.bind(this);
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

  showCalloutMessage() {
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
    Observable.from(this.props.mutator.templateDetails.GET());
    this.setState({
      showTemplateDetail: true,
      selectedTemplate: object,
    });
  }

  render() {
    const formatMsg = this.props.stripes.intl.formatMessage;
    const { resources: { recordsTemplates } } = this.props;
    return (!recordsTemplates || !recordsTemplates.hasLoaded) ? <Icon icon="spinner-ellipsis" /> : (
      <Paneset static>
        <TemplateResults
          {...this.props}
          handleRowClick={this.handleRowClick}
          formatMsg={formatMsg}
          onClick={() => {}}
        />
          <TemplateDetailModal 
              {...this.props}
              open={this.state.confirming}
              onConfirm={this.onDelete}
              onCancel={this.hideConfirm}
            />
            <Callout ref={(ref) => { this.callout = ref; }} />
        {this.state.showTemplateDetail &&
         <EditTemplate 
         {...this.props}
         selectedTemplate={this.state.selectedTemplate}
         handleClose={this.handleClose}
         />
        }
      </Paneset>
    );
  }
}

export default connect(
  TemplateView,
  C.META.MODULE_NAME,
);
