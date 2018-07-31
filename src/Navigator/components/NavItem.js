import React from 'react';
import { Accordion } from '@folio/stripes-components/lib/Accordion';
import NavListSection from '@folio/stripes-components/lib/NavListSection';

type NavItemProps = {
  label: string;
  activeLink: string;
  withChildren: bool;
  children: React.Node;
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
  }


  handleToggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  render() {
    const { label, activeLink, withChildren, open } = this.props;
    return (withChildren) ? (
      <Accordion open={this.state.isOpen || open} onToggle={this.handleToggle} label={label}>
        <NavListSection activeLink={activeLink} />
        {this.props.children}
      </Accordion>
    ) : (
      <Accordion open={this.state.isOpen || open} onToggle={this.handleToggle} label={label}>
        <NavListSection activeLink={activeLink} />
      </Accordion>
    );
  }
}
