/**
 * @format
 * @flow
 */
import * as React from 'react';
import Pane from '@folio/stripes-components/lib/Pane';
import PaneMenu from '@folio/stripes-components/lib/PaneMenu';
import IconButton from '@folio/stripes-components/lib/IconButton';
import { connect } from '@folio/stripes-connect';
import Layer from '@folio/stripes-components/lib/Layer';
import { Row, Col } from '@folio/stripes-components/lib/LayoutGrid';
import Icon from '@folio/stripes-components/lib/Icon';
import { AccordionSet, Accordion } from '@folio/stripes-components/lib/Accordion';
import _ from 'lodash';
import TemplateForm from '../form/TemplateForm';
import CreateTag from './CreateTag';
import MandatoryList from '../form/MandatoryList';
import css from '../styles/Template.css';
import { remapForTemplateMandatory } from '../../Utils/Mapper';
import TemplateView from '../view/TemplateView';
import * as C from '../../Utils';

type CreateTemplateProps = {
  stripes: Object,
  history: Object,
  resources: Object,
  getCurrentTemp: Function,
  translate: Function;
  mutator: {
    mandatory: {
      GET: Function,
      reset: Function
    }
  }
};
type CreateTemplateState = {
  currentTemplate: Object,
  sections: Object,
  currentTemplate: Object,
  showPage: boolean;
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
  }

  constructor(props) {
    super(props);
    this.state = {
      currentTemplate: {},
      sections: {
        templateAccordion: true,
        tagAccordion: false
      },
      showPage: true
    };
    this.getCurrentTemp = this.getCurrentTemp.bind(this);
    this.fetchMandatory = this.fetchMandatory.bind(this);
    this.handleSectionToggle = this.handleSectionToggle.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.fetchMandatory();
  }

  handleSectionToggle = () => {
    // const next = update(`sections.${id}`, value => !value, this.state);
    // this.setState(next);
  }

  fetchMandatory = () => {
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

  handleClose = () => {
    this.setState(curState => {
      const newState = _.cloneDeep(curState);
      newState.showPage = !this.state.showPage;
      return newState;
    });
    this.props.history.push(C.INTERNAL_URL.VIEW_TEMPLATE);
  }

  preparePaneMenu() {
    return (
      <PaneMenu {...this.props}>
        <IconButton
          key="icon-close"
          icon="closeX"
          onClick={this.handleClose}
        />
      </PaneMenu>
    );
  }

  render() {
    if (!this.state.showPage) {
      return (<TemplateView {...this.props} />);
    }
    const { translate, resources: { mandatory } } = this.props;
    if (!mandatory || !mandatory.hasLoaded) return (<Layer isOpen> <Icon icon="spinner-ellipsis" /> </Layer>);
    const fields = mandatory.records;
    const actionMenuItems = [
      {
        label: translate({ id: 'ui-marccat.template.tag.create' }),
        onClick: () => { this.props.history.pop(); },
      },
      {
        label: translate({ id: 'ui-marccat.template.save' }),
        onClick: () => { this.props.history.push(C.INTERNAL_URL.VIEW_TEMPLATE); },
      }
    ];
    return (
      <Pane
        actionMenuItems={actionMenuItems}
        firstMenu={this.preparePaneMenu()}
        defaultWidth="100%"
        paneTitle={translate({
          id: 'ui-marccat.template.create',
        })}
        id="templateCreate"
        appIcon={{ app: C.META.ICON_TITLE }}
      >
        <Layer isOpen>
          <AccordionSet>
            <Accordion
              label={translate({ id: 'ui-marccat.template.detail.information.title' })}
              id="templateAccordion"
              open={this.state.sections.templateAccordion}
              onToggle={this.handleSectionToggle}
            >
              <TemplateForm {...this.props} />
              <Row className={css.mandatoryList}>
                <Col xs={12}>
                  <MandatoryList {...this.props} fields={fields} />
                </Col>
              </Row>
            </Accordion>
            <Accordion
              label={translate({ id: 'ui-marccat.template.tag.create' })}
              id="tagAccordion"
              open={this.state.sections.tagAccordion}
              onToggle={this.handleSectionToggle}
            >
              <CreateTag {...this.props} currentTemplate={this.state.currentTemplate} />
            </Accordion>
          </AccordionSet>
        </Layer>
      </Pane>
    );
  }
}

export default connect(CreateTemplate, C.META.MODULE_NAME);
