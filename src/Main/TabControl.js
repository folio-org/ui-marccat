import * as React from 'react';
import SegmentedControl from '@folio/stripes-components/lib/SegmentedControl';
import Button from '@folio/stripes-components/lib/Button';
import Link from 'react-router-dom/Link';
import { TAB_CONTROL_ID } from '../Utils/Constant';
import LogicalView from './LogicalView';

import css from './Style/TabControl.css';

type TabControlProps = {
    children: React.ReactNode;
    translate: Object;
    rootPath: string;
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
      renderComponent = (<LogicalView {...this.props} />); break;
    case TAB_CONTROL_ID.SEARCH:
      renderComponent = (<div {...this.props}>i m search component</div>); break;
    case TAB_CONTROL_ID.TEMPLATE:
      renderComponent = (<LogicalView {...this.props} />); break;
    default:
      break;
    }
    return renderComponent;
  };

handleClick = (path) => {
  return this.props.router.push(`${this.props.rootPath}/`.concat(path));
};

render() {
  const { translate, rootPath } = this.props;
  return (
    <div className={css.tabControlContainer}>
      <SegmentedControl
        className={css.customTab}
        activeId={this.state.activeTab}
        onActivate={this.handleActivate}
      >
        <Button id={TAB_CONTROL_ID.DATABASE}>{translate({ id: 'ui-marccat.navigator.database' })}</Button>
        <Button id={TAB_CONTROL_ID.SEARCH}>{translate({ id: 'ui-marccat.navigator.search' })}</Button>
        <Button onClick={() => this.handleClick('templateList')} id={TAB_CONTROL_ID.TEMPLATE}>{translate({ id: 'ui-marccat.navigator.template' })}</Button>
      </SegmentedControl>
      <hr />
      {this.renderTabContent(this.state.activeTab)}
    </div>
  );
}
}
