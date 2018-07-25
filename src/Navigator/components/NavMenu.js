import React from 'react';
import { AccordionSet } from '@folio/stripes-components/lib/Accordion';
import NavList from '@folio/stripes-components/lib/NavList';
import { connect } from '@folio/stripes-connect';
import { AdvanceSearchForm } from '../../Search/';
import NavItem from './NavItem';
import * as C from '../../Utils';

type NavMenuProps = {
  stripes: Object;
  resources: Object;
  match: Object;
  history: Object;
  open: bool;
};
type NavMenuSatate = {
  sections: Object;
  open: bool;
};


class NavMenu extends React.Component<NavMenuProps, NavMenuSatate> {
  constructor(props) {
    super(props);
    this.handleAccordionClick = this.handleAccordionClick.bind(this);
  }

  handleAccordionClick = (url) => {
    this.props.history.push(url);
  };


  render() {
    const rootPath = this.props.match.path;
    return (
      <AccordionSet>
        <NavList styles={{ paddingTop: '50px' }} {...this.props}>
          <NavItem
            {...this.props}
            accordionId="simple_search_section"
            label="Simple Search"
            activeLink={`${rootPath}`}
            onToggle={!this.props.open}
            expanded={!this.props.open}
            itemLabel="Simple Search"
            path={`${rootPath}/externalSearch`}
          />
          <NavItem
            withChildren
            label="Advanced Search"
            path={`${rootPath}/advancedSearch`}
          ><AdvanceSearchForm {...this.props} />
          </NavItem>
          <NavItem
            label="External Search"
            itemLabel="External Search"
            activeLink={`${rootPath}/`}
            path={`${rootPath}/externalSearch`}
          />
          <NavItem
            label="Indexes"
            itemLabel="Indexes"
            activeLink={`${rootPath}/`}
            path={`${rootPath}/indexList`}
          />
          <NavItem
            label="Diacritic"
            itemLabel="Diacritic"
            activeLink={`${rootPath}/`}
            path={`${rootPath}/diacritic`}
          />
          <NavItem
            label="Report"
            itemLabel="Report"
            activeLink={`${rootPath}/`}
            path={`${rootPath}/report`}
          />
          <NavItem
            label="Template"
            activeLink={`${rootPath}/`}
            itemLabel="Template List"
            path={`${rootPath}/templateList`}
          />
        </NavList>
      </AccordionSet>
    );
  }
}

export default connect(
  NavMenu,
  C.META.MODULE_NAME,
);
