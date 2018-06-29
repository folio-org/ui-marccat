// @flow
import React from 'react';
import _ from 'lodash';
import NavList from '@folio/stripes-components/lib/NavList';
import NavListSection from '@folio/stripes-components/lib/NavListSection';
import NavListItem from '@folio/stripes-components/lib/NavListItem';
import Paneset from '@folio/stripes-components/lib/Paneset';
import Pane from '@folio/stripes-components/lib/Pane';
import Switch from 'react-router-dom/Switch';
import Route from 'react-router-dom/Route';
import { FormattedMessage } from 'react-intl';
import { AccordionSet, Accordion } from '@folio/stripes-components/lib/Accordion';
import Icon from '@folio/stripes-components/lib/Icon';
import NavigatorEmpty from './NavigatorEmpty';
import SearchResults from '../Search/SearchResults';
import { TemplateView, CreateTemplate } from '../Template/';
import { AdvancedSearch, SimpleSearch } from '../Search/';
import { NavigationProps, NavigationState } from './type';
import css from './Navigator.css';


class Navigator extends React.Component<NavigationProps, NavigationState> {

  constructor(props: NavigationProps) {
    super(props);
    this.state = {
      navigatorFixed: true,
      subSections: {
        searchSection: true,
        reportSection: true,
        templateSection: true,
      },
    };
    (this: any).onToggleSubSection = this.onToggleSubSection.bind(this);
    (this: any).handleClose = this.handleClose.bind(this);
  }

  onToggleSubSection(newAccordionStatus: NavigationState) {
    this.setState((curState: NavigationState) => {
      const newState = _.cloneDeep(curState);
      newState.subSections = newAccordionStatus;
      return newState;
    });
  }

  handleClose() {
    this.setState((curState: NavigationState) => {
      const newState = _.cloneDeep(curState);
      newState.navigatorFixed = !this.state.navigatorFixed;
      return newState;
    });
  }

  render() {
    const formatMsg = this.props.stripes.intl.formatMessage;
    const rootPath = this.props.match.path;
    return (
      <div className={css.container}>
        <Paneset static>
          {(this: NavigationState).state.navigatorFixed &&
            <Pane
              dismissible
              onClose={this.handleClose}
              defaultWidth="20%"
              paneTitle={formatMsg({ id: 'ui-cataloging.navigator.title' })}
            >
              <NavList>
                <AccordionSet accordionStatus={this.state.subSections} onToggle={this.onToggleSubSection}>
                  <Accordion
                    id="searchSection"
                    label={formatMsg({ id: 'ui-cataloging.navigator.search' })}
                  >
                    <NavListSection activeLink={`${this.props.location.pathname}`}>
                      <NavListItem to={`${rootPath}/simpleSearch`}>
                        <Icon
                          icon="search"
                          size="small"
                          iconClassName="myClass"
                        />
                        <FormattedMessage id="ui-cataloging.navigator.simpleSearch" />
                      </NavListItem>
                      <NavListItem to={`${rootPath}/advancedSearch`}>
                        <Icon
                          icon="search"
                          size="small"
                          iconClassName="myClass"
                        />
                        <FormattedMessage id="ui-cataloging.navigator.advancedSearch" />
                      </NavListItem>
                      <NavListItem to={`${rootPath}/externalSearch`}>
                        <Icon
                          icon="search"
                          size="small"
                          iconClassName="myClass"
                        />
                        <FormattedMessage id="ui-cataloging.navigator.externalSearch" />
                      </NavListItem>
                    </NavListSection>
                  </Accordion>
                  <Accordion
                    id="reportSection"
                    label={formatMsg({ id: 'ui-cataloging.navigator.reportistics' })}
                  >
                    <NavListSection activeLink={`${this.props.location.pathname}`}>
                      <NavListItem to={`${rootPath}/reportistics`}>
                        <Icon
                          icon="search"
                          size="small"
                          iconClassName="myClass"
                        />
                        <FormattedMessage id="ui-cataloging.navigator.report" />
                      </NavListItem>
                    </NavListSection>
                  </Accordion>
                  <Accordion
                    id="templateSection"
                    label={formatMsg({ id: 'ui-cataloging.navigator.template' })}
                  >
                    <NavListSection activeLink={`${this.props.location.pathname}`}>
                      <NavListItem to={`${rootPath}/templatelist`}>
                        <Icon
                          icon="archive"
                          size="small"
                          iconClassName="myClass"
                        />
                        {'Loaded from file'}
                      </NavListItem>
                      <NavListItem to={`${rootPath}/templateLoaded`}>
                        <Icon
                          icon="archive"
                          size="small"
                          iconClassName="myClass"
                        />
                        {'Show Template Loaded'}
                      </NavListItem>
                      <NavListItem to={`${rootPath}/templateList`}>
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
            <Route path={`${rootPath}/simpleSearch`}>
              <SimpleSearch {...this.props} id="simple_search" />
            </Route>
            <Route path={`${rootPath}/template/create`}>
              <CreateTemplate {...this.props} />
            </Route>
            <Route path={`${rootPath}/advancedSearch`}>
              <AdvancedSearch {...this.props} id="advanced_search" />
            </Route>
            <Route path={`${rootPath}/searchResults`}>
              <SearchResults {...this.props} id="search_result" />
            </Route>
            <Route path={`${rootPath}/externalSearch`}>
              <TemplateView {...this.props} id="template_view" />
            </Route>
            <Route path={`${rootPath}/templatelist`}>
              <TemplateView {...this.props} id="empty_crontainer" />
            </Route>
            <Route path={`${rootPath}`}>
              <NavigatorEmpty {...this.props} id="empty_corntainer" />
            </Route>
          </Switch>
        </Paneset>
      </div>
    );
  }
}
export default Navigator;
