import React from 'react';
import { AccordionSet, Accordion } from '@folio/stripes-components/lib/Accordion';
import NavListSection from '@folio/stripes-components/lib/NavListSection';
import NavListItem from '@folio/stripes-components/lib/NavListItem';
import NavList from '@folio/stripes-components/lib/NavList';
import _ from 'lodash';
import { AdvanceSearchForm } from '../../Search/';

type NavMenuProps = {
  match: Object;
  history: Object;
};
type NavMenuSatate = {};


export default class NavMenu extends React.Component<NavMenuProps, NavMenuSatate> {
  constructor(props) {
    super(props);
    this.state = {
      sections: {// eslint-disable-line  react/no-unused-state
        simpleSearch: false,
        advanceSearch: false,
        externalSearch: false,
        indexes: false,
        diacritic: false,
        report: false,
        template: false,
      },
      open: false,
    };
    this.handleAccordionClick = this.handleAccordionClick.bind(this);
  }

  handleSectionToggle({ id }) {
    this.setState((curState) => {
      const newState = _.cloneDeep(curState);
      newState.sections[id] = !newState.sections[id];
      return newState;
    });
  }

  handleAccordionClick = (url) => {
    this.setState((curState) => {
      const newState = _.cloneDeep(curState);
      newState.open = !this.state.open;
      return newState;
    });
    this.props.history.push(url);
  };


  render() {
    const rootPath = this.props.match.path;
    return (
      <AccordionSet>
        <NavList styles={{ paddingTop: '50px' }}>
          <Accordion open={this.state.open} label="Simple Search" id="simple_search">
            <NavListSection activeLink={`${rootPath}`}>
              <NavListItem to={`${rootPath}/simpleSearch`}>Simple Search</NavListItem>
            </NavListSection>
          </Accordion>
          <Accordion open={this.state.open} label="Advanced Search" onToggle={() => this.handleAccordionClick(`${rootPath}/searchResults`)}>
            <AdvanceSearchForm {...this.props} />
          </Accordion>
          <Accordion open={this.state.open} label="External Search">
            <NavListSection activeLink={`${rootPath}`}>
              <NavListItem to={`${rootPath}/externalSearch`}>External Search</NavListItem>
            </NavListSection>
          </Accordion>
          <Accordion open={this.state.open} label="Indexes">
            <NavListSection activeLink={`${rootPath}`}>
              <NavListItem to={`${rootPath}/indexList`}>Indexes</NavListItem>
            </NavListSection>
          </Accordion>
          <Accordion open={this.state.open} label="Diacritic">
            <NavListSection activeLink={`${rootPath}`}>
              <NavListItem to={`${rootPath}/diacritic`} style={{ marginBottom: '20px' }}>Diacritic</NavListItem>
            </NavListSection>
          </Accordion>
          <Accordion open={this.state.open} label="Report">
            <NavListSection>
              <NavListItem to={`${rootPath}/report`} style={{ marginBottom: '20px' }}>Report</NavListItem>
            </NavListSection>
          </Accordion>
          <Accordion open={this.state.open} label="Template">
            <NavListSection>
              <NavListItem to={`${rootPath}/templateList`}>Template List</NavListItem>
            </NavListSection>
          </Accordion>
        </NavList>
      </AccordionSet>
    );
  }
}

