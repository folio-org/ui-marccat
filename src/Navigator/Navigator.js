import React from 'react';
import NavList from '@folio/stripes-components/lib/NavList';
import NavListSection from '@folio/stripes-components/lib/NavListSection';
import NavListItem from '@folio/stripes-components/lib/NavListItem';
import Paneset from '@folio/stripes-components/lib/Paneset';
import Pane from '@folio/stripes-components/lib/Pane';
import Switch from 'react-router-dom/Switch';
import PropTypes from 'prop-types';
import Route from 'react-router-dom/Route';
import { FormattedMessage } from 'react-intl';
import { AccordionSet, Accordion } from '@folio/stripes-components/lib/Accordion';
import Icon from '@folio/stripes-components/lib/Icon';
import NavigatorEmpty from './NavigatorEmpty';
import { TemplateView, TemplateNewMandatory, TemplateNewContainer } from '../Template/';
import { LogicalView } from '../LogicalView/';
import { CatalogingFooter } from '../Common/Footer';
import css from './Navigator.css';
import Toaster from '../Toaster/Toaster';

class Navigator extends React.Component {
  static propTypes = {// eslint-disable-line react/no-unused-prop-types
    stripes: PropTypes.shape({ // eslint-disable-line react/no-unused-prop-types
      connect: PropTypes.func,
      intl: PropTypes.object,
    })
  };

  constructor(props) {
    super(props);
    this.state = {
      navigatorFixed: true,
      showToaster: false
    };
  }

  handleClose() {
    this.setState({ navigatorFixed: false });
  }

  render() {
    const formatMsg = this.props.stripes.intl.formatMessage;

    return (
      <div className={css.container}>
        <Paneset static>
          {this.state.navigatorFixed &&
            <Pane dismissible onClose={this.handleClose} defaultWidth="20%" paneTitle={formatMsg({ id: 'ui-cataloging.navigator.title' })}>
              <LogicalView {...this.props} id="logical_view_link" />
              <NavList>
                <AccordionSet>
                   <Accordion label={formatMsg({ id: 'ui-cataloging.navigator.search' })} id="ex-2">
                    <NavListSection activeLink="/active-link-here">
                      <NavListItem to="/cataloging/simpleSearch">

                        <FormattedMessage id="ui-cataloging.navigator.simpleSearch" />
                      </NavListItem>
                      <NavListItem to="/cataloging/advancedSearch">
                        <Icon
                          icon="search"
                          size="small"
                          iconClassName="myClass"
                        />
                        <FormattedMessage id="ui-cataloging.navigator.advancedSearch" />
                      </NavListItem>
                      <NavListItem to="/cataloging/externalSearch">
                        <Icon
                          icon="search"
                          size="small"
                          iconClassName="myClass"
                        />
                        <FormattedMessage id="ui-cataloging.navigator.externalSearch" />
                      </NavListItem>
                    </NavListSection>
                  </Accordion>
                  <Accordion label={formatMsg({ id: 'ui-cataloging.navigator.template' })} id="ex-1">
                    <NavListSection activeLink="/active-link-here">
                      <NavListItem to="/cataloging/templateList">
                        <Icon
                          icon="archive"
                          size="small"
                          iconClassName="myClass"
                        />
                        <FormattedMessage id="ui-cataloging.navigator.templateList" />
                      </NavListItem>
                    </NavListSection>
                  </Accordion>
                </AccordionSet>
              </NavList>
            </Pane>}
          <Switch>
            <Route path="/cataloging/templateList">
              <TemplateView {...this.props} id="template_view_link" />
            </Route>
            <Route path="/cataloging/simpleSearch" >
              <TemplateNewMandatory {...this.props} id="template_view_link" />
            </Route>
            <Route path="/cataloging/template/create">
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
        {this.state.showToaster &&
        <Toaster toasts={[{ message: 'rest call with success {is a test}!', id: 'my-toast-id', type: 'success' }]} />}
        <CatalogingFooter id="clickable-done-footer" />
      </div>
    );
  }
}
export default Navigator;
