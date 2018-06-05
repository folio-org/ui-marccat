import React from 'react';
import NavList from '@folio/stripes-components/lib/NavList';
import NavListSection from '@folio/stripes-components/lib/NavListSection';
import NavListItem from '@folio/stripes-components/lib/NavListItem';
import Paneset from '@folio/stripes-components/lib/Paneset';
import Pane from '@folio/stripes-components/lib/Pane';
import Switch from 'react-router-dom/Switch';
import Route from 'react-router-dom/Route';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { AccordionSet, Accordion } from '@folio/stripes-components/lib/Accordion';
import NavigatorEmpty from './NavigatorEmpty';
import { TemplateView, TemplateNewMandatory, TemplateNewContainer } from '../Template/';
import { LogicalView } from '../LogicalView/';

class Navigator extends React.Component {
  static propTypes = {
    stripes: PropTypes.shape({
      intl: PropTypes.object.isRequired,
    }).isRequired,
  };

  render() {
    const formatMsg = this.props.stripes.intl.formatMessage;

    return (
      <Paneset>
        <Pane dismissible onClose={(() => {})} defaultWidth="20%" paneTitle={formatMsg({ id: 'ui-cataloging.navigator.title' })}>
          <LogicalView {...this.props} id="logical_view_link" />
          <NavList>
            <AccordionSet>
              <Accordion label={formatMsg({ id: 'ui-cataloging.navigator.template' })} id="ex-1">
                <NavListSection activeLink="/active-link-here">
                  <NavListItem to="/cataloging/templateList">
                    <FormattedMessage id="ui-cataloging.navigator.templateList" />
                  </NavListItem>
                </NavListSection>
                <br />
              </Accordion>
              <Accordion label={formatMsg({ id: 'ui-cataloging.navigator.search' })} id="ex-2">
                <NavListSection activeLink="/active-link-here">
                  <NavListItem to="/cataloging/simpleSearch">
                    <FormattedMessage id="ui-cataloging.navigator.simpleSearch" />
                  </NavListItem>
                  <NavListItem to="/cataloging/advancedSearch">
                    <FormattedMessage id="ui-cataloging.navigator.advancedSearch" />
                  </NavListItem>
                  <NavListItem to="/cataloging/externalSearch">
                    <FormattedMessage id="ui-cataloging.navigator.externalSearch" />
                  </NavListItem>
                </NavListSection>
              </Accordion>
            </AccordionSet>
          </NavList>
        </Pane>
        <Switch>
          <Route path="/cataloging/templateList">
            <TemplateView {...this.props} id="template_view_link" />
          </Route>
          <Route path="/cataloging/simpleSearch" >
            <TemplateNewMandatory {...this.props} id="template_view_link" />
          </Route>
          <Route path="/cataloging/template/new">
            <TemplateNewContainer {...this.props} />
          </Route>
          <Route path="/cataloging/advancedSearch" >
            <NavigatorEmpty {...this.props} id="empty_container" />
          </Route>
          <Route path="/cataloging/externalSearch" >
            <NavigatorEmpty {...this.props} id="empty_container" />
          </Route>
          <Route path="/cataloging">
            <NavigatorEmpty {...this.props} id="empty_container" />
          </Route>
        </Switch>
      </Paneset>
    );
  }
}
export default Navigator;
