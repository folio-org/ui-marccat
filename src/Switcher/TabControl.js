import * as React from 'react';
import SegmentedControl from '@folio/stripes-components/lib/SegmentedControl';
import Button from '@folio/stripes-components/lib/Button';
import { TAB_CONTROL_ID } from '../Utils/Constant';
import { AdvancedSearch } from '../Search';
import { SortFilters, LogicalViewFilter, TemplateFilters } from '../Filter/';
import SearchFrom from './component/SearchFrom';

import css from './Style/Switcher.css';

type TabControlProps = {
    children: React.ReactNode;
    translate: Object;
    rootPath: string;
    router: Object;
};

export default class TabControl extends React.Component<TabControlProps, { activeTab: string }> {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 'database'
    };
    this.handleActivate = this.handleActivate.bind(this);
    this.renderTabContent = this.renderTabContent.bind(this);
  }

  handleActivate({ id }) {
    this.setState({
      activeTab: id,
    });
  }

  renderTabContent = (id) : React.ComponentType<any> => {
    let renderComponent: React.ComponentType<any>;
    switch (id) {
    case TAB_CONTROL_ID.DATABASE:
      renderComponent = (<LogicalViewFilter {...this.props} />); break;
    case TAB_CONTROL_ID.SEARCH:
      renderComponent = (<AdvancedSearch {...this.props} />); break;
    case TAB_CONTROL_ID.TEMPLATE:
      renderComponent = (<TemplateFilters {...this.props} />); break;
    default:
      break;
    }
    return renderComponent;
  };

handleClick = (path) => {
  const { router, rootPath } = this.props;
  return router.push(`${rootPath}`.concat(path));
};

render() {
  const { translate } = this.props;
  return (
    <div className={css.tabControlContainer}>
      <SegmentedControl
        className={css.customTab}
        activeId={this.state.activeTab}
        onActivate={this.handleActivate}
      >
        <Button onClick={() => this.handleClick('/')} id={TAB_CONTROL_ID.DATABASE}>{translate({ id: 'ui-marccat.navigator.database' })}</Button>
        <Button onClick={() => this.handleClick('/advancedSearch')} id={TAB_CONTROL_ID.SEARCH}>{translate({ id: 'ui-marccat.navigator.search' })}</Button>
        <Button onClick={() => this.handleClick('/templateList')} id={TAB_CONTROL_ID.TEMPLATE}>{translate({ id: 'ui-marccat.navigator.template' })}</Button>
      </SegmentedControl>
      {this.state.activeTab === TAB_CONTROL_ID.TEMPLATE &&
      <SearchFrom {...this.props} searchType="template" />
      }
      <hr />
      {this.renderTabContent(this.state.activeTab)}
    </div>
  );
}
}
