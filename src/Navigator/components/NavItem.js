/**
 * @format
 * @flow
 */
import React from 'react';
import { Observable } from 'rxjs';
import { Accordion } from '@folio/stripes-components/lib/Accordion';
import NavListSection from '@folio/stripes-components/lib/NavListSection';
import NavListItem from '@folio/stripes-components/lib/NavListItem';

type NavItemProps = {
  label: string;
  history: Object;
  activeLink: string;
  itemLabel: string;
  withChildren: bool;
  children: Object;
  path: string;
  open: bool;
};
type NavItemState = {
  isOpen: bool;
};

export default class NavItem extends React.Component<NavItemProps, NavItemState> {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
    this.handleToggle = this.handleToggle.bind(this);
  }

  handleToggle = () => {
    if (this.props.itemLabel) {
      this.setState({ isOpen: !this.state.isOpen });
    } else {
      this.setState({ isOpen: !this.state.isOpen });
      const subscription = Observable.of(this.props.path);
      subscription
        .filter(p => p !== '')
        .subscribe(p => this.props.history.push(p));
    }
  };

  render() {
    const { label, path, itemLabel, activeLink, withChildren, open } = this.props;
    return (withChildren) ? (
      <Accordion open={this.state.isOpen || open} onToggle={this.handleToggle} label={label}>
        <NavListSection activeLink={activeLink} />
        {this.props.children}
      </Accordion>
    ) : (
      <Accordion open={this.state.isOpen || open} onToggle={this.handleToggle} label={label}>
        <NavListSection activeLink={activeLink}>
          <NavListItem to={path}>{itemLabel}</NavListItem>
        </NavListSection>
      </Accordion>
    );
  }
}
