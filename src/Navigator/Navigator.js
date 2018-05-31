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
import TemplateViewLink from '../Template/TemplateViewLink';
import LogicalViewLink from '../LogicalView/LogicalViewLink';


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
        <Pane defaultWidth="20%" paneTitle={formatMsg({ id: 'ui-cataloging.navigator.title' })}>
          <LogicalViewLink {...this.props} />
          <NavList>
            <NavListSection label={formatMsg({ id: 'ui-cataloging.navigator.template' })} activeLink="/active-link-here">
              <NavListItem to="/cataloging/templateList">
                <FormattedMessage id="ui-cataloging.navigator.templateList" />
              </NavListItem>
            </NavListSection>
            <br />
            <NavListSection label={formatMsg({ id: 'ui-cataloging.navigator.search' })} activeLink="/active-link-here">
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
          </NavList>
        </Pane>
        <Switch>
          <Route path="/cataloging/templateList">
            <TemplateViewLink {...this.props} />
          </Route>
          <Route path="/cataloging/simpleSearch" />
          <Route path="/cataloging/advancedSearch" />
          <Route path="/cataloging/externalSearch" />
        </Switch>
      </Paneset>
    );
  }
}
export default Navigator;
