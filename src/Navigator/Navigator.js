import React from 'react';
import _ from 'lodash';
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
import { TemplateView, CreateTemplate } from '../Template/';
import { LogicalView } from '../LogicalView/';
import { AdvancedSearch } from '../Search/';
import css from './Navigator.css';
import FabMenu from '../Fab/FabMenu';
import * as C from '../Utils';

class Navigator extends React.Component {
  static propTypes = {
    stripes: PropTypes.shape({
      connect: PropTypes.func,
      intl: PropTypes.object,
    }),
    match: PropTypes.shape({
      path: PropTypes.string,
      id: PropTypes.string,
    }),
    location: PropTypes.shape({
      pathname: PropTypes.string,
    })
  };

  constructor(props) {
    super(props);
    this.state = {
      navigatorFixed: true,
      subSections: {
        searchSection: true,
        reportSection: true,
        templateSection: true,
      },
    };
    this.onToggleSubSection = this.onToggleSubSection.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  onToggleSubSection(newAccordionStatus) {
    this.setState((curState) => {
      const newState = _.cloneDeep(curState);
      newState.subSections = newAccordionStatus;
      return newState;
    });
  }

  handleClose() {
    this.setState((curState) => {
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
          {this.state.navigatorFixed &&
            <Pane
              dismissible
              onClose={this.handleClose}
              defaultWidth="20%"
              paneTitle={formatMsg({ id: 'ui-cataloging.navigator.title' })}
            >
              <LogicalView {...this.props} id="logical_view_link" />
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
                      <NavListItem to={`${rootPath}/report-advancedSearch`}>
                        <Icon
                          icon="search"
                          size="small"
                          iconClassName="myClass"
                        />
                        <FormattedMessage id="ui-cataloging.navigator.advancedSearch" />
                      </NavListItem>
                      <NavListItem to="/cataloging/report-externalSearch">
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
                    id="templateSection"
                    label={formatMsg({ id: 'ui-cataloging.navigator.template' })}
                  >
                    <NavListSection activeLink={`${this.props.location.pathname}`}>
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
            <Route path={`${rootPath}/templateList`}>
              <TemplateView {...this.props} id="templrate_view_link" />
            </Route>
            <Route path={`${rootPath}/simpleSearch`}>
              <NavigatorEmpty {...this.props} id="temprlate_view_link" />
            </Route>
            <Route path={`${rootPath}/template/create`}>
              <CreateTemplate {...this.props} />
            </Route>
            <Route path={`${rootPath}/advancedSearch`}>
              <AdvancedSearch {...this.props} id="advanced_search" />
            </Route>
            <Route path={`${rootPath}/externalSearch`}>
              <NavigatorEmpty {...this.props} id="empty_crontainer" />
            </Route>
            <Route path={`${rootPath}`}>
              <NavigatorEmpty {...this.props} id="empty_corntainer" />
            </Route>
          </Switch>
        </Paneset>
        {/* <FabMenu
          {...this.props}
          effect={C.ANIMATION.SLIDEIN}
          position={C.POSITION.BOTTOM_RIGHT}
          event={C.EVENT.HOVER}
          isChildrenVisible={true} */}
      </div>
    );
  }
}
export default Navigator;
