import React from 'react';
import { AccordionSet, ExpandAllButton } from '@folio/stripes-components/lib/Accordion';
import NavList from '@folio/stripes-components/lib/NavList';
import { Row } from '@folio/stripes-components/lib/LayoutGrid';
import { connect } from '@folio/stripes-connect';
import { AdvanceSearchForm } from '../../Search/';
import NavItem from './NavItem';
import * as C from '../../Utils';
import css from '../style/NavStyles.css';
import { Diacritic } from '../../Indexes';

type NavMenuProps = {
  stripes: Object;
  resources: Object;
  match: Object;
  history: Object;
  open: bool;
};
type NavMenuSatate = {
  section: Object;
  open: bool;
};


class NavMenu extends React.Component<NavMenuProps, NavMenuSatate> {
  constructor(props) {
    super(props);
    this.state = {
      section: {
        expandeCollapseAction: false
      }
    };
    this.handleExpandAll = this.handleExpandAll.bind(this);
  }

  handleExpandAll(section) {
    this.setState({ section });
  }


  render() {
    const rootPath = this.props.match.path;
    return (
      <div>
        <Row className={css.expandAll}>
          <ExpandAllButton accordionStatus={this.state.section} onToggle={this.handleExpandAll} />
        </Row>
        <AccordionSet>
          <NavList className={css.navList} {...this.props}>
            <NavItem
              {...this.props}
              accordionId="expandeCollapseAction"
              label="Simple Search"
              activeLink={`${rootPath}`}
              open={this.state.section.expandeCollapseAction}
              itemLabel="Simple Search"
              path={`${rootPath}/externalSearch`}
            />
            <NavItem
              {...this.props}
              accordionId="advancedSearchSection"
              withChildren
              open={this.state.section.expandeCollapseAction}
              label="Advanced Search"
              path={`${rootPath}/advancedSearch`}
            ><AdvanceSearchForm {...this.props} />
            </NavItem>
            <NavItem
              accordionId="externalSearchSection"
              label="External Search"
              open={this.state.section.expandeCollapseAction}
              itemLabel="External Search"
              activeLink={`${rootPath}/`}
              path={`${rootPath}/externalSearch`}
              withChildren
            />
            <NavItem
              {...this.props}
              accordionId="indexesSection"
              label="Indexes"
              open={this.state.section.expandeCollapseAction}
              activeLink={`${rootPath}/`}
              path={`${rootPath}/indexList`}
            />
            <NavItem
              {...this.props}
              accordionId="diacriticSection"
              label="Diacritic"
              open={this.state.section.expandeCollapseAction}
              activeLink={`${rootPath}/`}
              path={`${rootPath}/diacritic`}
              withChildren
            ><Diacritic {...this.props} />
            </NavItem>
            <NavItem
              {...this.props}
              accordionId="reportSection"
              label="Report"
              itemLabel="Report"
              open={this.state.section.expandeCollapseAction}
              activeLink={`${rootPath}/`}
              path={`${rootPath}/report`}
            />
            <NavItem
              {...this.props}
              accordionId="templateSection"
              label="Template"
              open={this.state.section.expandeCollapseAction}
              activeLink={`${rootPath}/`}
              itemLabel="Template List"
              path={`${rootPath}/templateList`}
            />
          </NavList>
        </AccordionSet>
      </div>
    );
  }
}

export default connect(
  NavMenu,
  C.META.MODULE_NAME,
);
