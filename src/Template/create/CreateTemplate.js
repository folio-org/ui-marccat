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

import css from './CreateTemplate.css';

class CreateTemplate extends React.Component {
  static propTypes = {
    stripes: PropTypes.shape({
      connect: PropTypes.func.isRequired,
      intl: PropTypes.object.isRequired,
    }).isRequired,
    history: PropTypes.shape({
      goBack: PropTypes.func,
      pop: PropTypes.func,
      push: PropTypes.func
    }),
    mutator: PropTypes.shape({
      createUser: PropTypes.shape({
        POST: PropTypes.func.isRequired,
      }),
      query: PropTypes.object.isRequired,
    }),
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
      GET: {
        params: { lang: C.ENDPOINT.DEFAULT_LANG },
      },
    },
    createUser: {
      type: C.RESOURCE_TYPE,
      root: C.ENDPOINT.BASE_URL,
      path: C.ENDPOINT.CREATE_TEMPLATE,
      clear: false,
    },
  });

  constructor(props) {
    super(props);
    this.state = {
      lastUpdate: null
    };

    this.create = this.create.bind(this);
  }


  create(template) {
    const json = {
      json: JSON.stringify({
        'name': template.name,
      }),
      delay: 3
    };

    fetch('http://localhost:8080/cataloging/record-templates/123?type=B&lang=ita', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-okapi-tenant': 'tnx'
      },
      body: json.json
    })
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        alert(result);
      })
      .catch((error) => {
        console.log('Request failed', error);
      });
  }


  preparePaneMenu() {
    return (
      <PaneMenu {...this.props}>
        <IconButton key="icon-close" icon="closeX" onClick={this.props.history.goBack} />
      </PaneMenu>
    );
  }

  render() {
    const formatMsg = this.props.stripes.intl.formatMessage;

    const { stripes, resources: { records } } = this.props; // eslint-disable-line react/prop-types
    if (!records || !records.hasLoaded) return <div />;
    const fields = records.records;
    let obj = remapMultiArray(fields);

    const actionMenuItems = [
      {
        label: formatMsg({ id: 'ui-cataloging.template.tag.create' }),
        onClick: () => {
          this.props.history.pop();
        },
      },
      {
        label: formatMsg({ id: 'ui-cataloging.template.save' }),
        onClick: () => {
          this.props.history.push(C.INTERNAL_URL.VIEW_TEMPLATE);
        },
      },
      {
        label: formatMsg({ id: 'ui-cataloging.button.backto' }),
        onClick: () => {
          this.props.history.push(C.INTERNAL_URL.VIEW_TEMPLATE);
        },
      },
    ];

    return (
      <Paneset static style={css.root}>
        <Pane
          actionMenuItems={actionMenuItems}
          firstMenu={this.preparePaneMenu()}
          defaultWidth="fill"
          paneTitle={formatMsg({ id: 'ui-cataloging.template.create' })}
          appIcon={{ app: 'cataloging' }}
        >
          <div className={css.form}>
            <TemplateForm {...this.props} field={obj} initialValues={{}} onSubmit={(template) => this.create(template)} />
          </div>
        </Pane>
      </Paneset>
    );
  }
}


export default connect(CreateTemplate, C.META.MODULE_NAME);
