/**
 * @format
 * @flow
 */
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
import Icon from '@folio/stripes-components/lib/Icon';
import TemplateForm from '../form/TemplateForm';
import CreateTag from './CreateTag';
import MandatoryList from '../form/MandatoryList';
import css from '../styles/Template.css';
import { remapForTemplateMandatory } from '../../Utils/Mapper';
import * as C from '../../Utils';

type CreateTemplateProps = {
  stripes: Object,
  history: Object,
  resources: Object,
  getCurrentTemp: Function,
  mutator: {
    mandatory: {
      GET: Function,
      reset: Function
    }
  }
};
type CreateTemplateState = {
  currentTemplate: Object,
  showTagForm: Boolean,
  currentTemplate: Object
};

class CreateTemplate extends React.Component<CreateTemplateProps, CreateTemplateState> {
  static manifest = Object.freeze({
    mandatory: {
      type: C.RESOURCE_TYPE,
      root: C.ENDPOINT.BASE_URL,
      path: 'bibliographic/fields/mandatory?&lang=' + C.ENDPOINT.DEFAULT_LANG,
      headers: C.ENDPOINT.HEADERS,
      records: 'fields',
      fetch: false,
      accumulate: true
    }
  });

  componentDidMount() {
    this.fetchMandatory();
  }

  constructor(props) {
    super(props);
    this.state = {
      showTagForm: false,
      currentTemplate: {}
    };
    this.showTagForm = this.showTagForm.bind(this);
    this.getCurrentTemp = this.getCurrentTemp.bind(this);
    this.fetchMandatory = this.fetchMandatory.bind(this);
  }

  fetchMandatory() {
    this.props.mutator.mandatory.reset();
    this.props.mutator.mandatory.GET().then((fetchResult) => {
      if (fetchResult.length > 0) {
        this.setState({ currentTemplate: remapForTemplateMandatory(fetchResult) });
      }
    });
  }

  getCurrentTemp = (currentTemp) => {
    this.setState({ currentTemplate: currentTemp });
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
    const { resources: { mandatory } } = this.props;
    if (!mandatory || !mandatory.hasLoaded) return (<Layer isOpen> <Icon icon="spinner-ellipsis" /> </Layer>);
    const fields = mandatory.records;
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
      }
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
                <Row className={css.mandatoryList}>
                  <Col xs={12}>
                    <MandatoryList {...this.props} fields={fields} />
                  </Col>
                </Row>
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
                  <CreateTag {...this.props} currentTemplate={this.state.currentTemplate} />
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
