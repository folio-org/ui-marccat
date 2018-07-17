import React from 'react';
import { AccordionSet, Accordion } from '@folio/stripes-components/lib/Accordion';
import NavListSection from '@folio/stripes-components/lib/NavListSection';
import NavListItem from '@folio/stripes-components/lib/NavListItem';
import NavList from '@folio/stripes-components/lib/NavList';

export default class NavMenu extends React.Component {
  render() {
    const rootPath = this.props.match.path;
    return (
      <AccordionSet>
        <NavList styles={{ paddingTop: '50px' }}>
          <Accordion label="Simple Search">
            <NavListSection activeLink={`${rootPath}`}>
              <NavListItem to={`${rootPath}/simpleSearch`}>Simple Search</NavListItem>
            </NavListSection>
          </Accordion>
          <Accordion label="Advanced Search">
            <NavListSection activeLink={`${rootPath}`}>
              <NavListItem to={`${rootPath}/advancedSearch`}>Advanced Search</NavListItem>
            </NavListSection>
          </Accordion>
          <Accordion label="External Search">
            <NavListSection activeLink={`${rootPath}`}>
              <NavListItem to={`${rootPath}/externalSearch`}>External Search</NavListItem>
            </NavListSection>
          </Accordion>
          <Accordion label="Indexes">
            <NavListSection activeLink={`${rootPath}`}>
              <NavListItem to={`${rootPath}/indexList`}>Indexes</NavListItem>
            </NavListSection>
          </Accordion>
          <Accordion label="Diacritic">
            <NavListSection activeLink={`${rootPath}`}>
              <NavListItem to={`${rootPath}/diacritic`} style={{ marginBottom: '20px' }}>Diacritic</NavListItem>
            </NavListSection>
          </Accordion>
          <Accordion label="Report">
            <NavListSection>
              <NavListItem to={`${rootPath}/report`} style={{ marginBottom: '20px' }}>Report</NavListItem>
            </NavListSection>
          </Accordion>
          <Accordion label="Template">
            <NavListSection>
              <NavListItem to={`${rootPath}/templateList`}>Template List</NavListItem>
            </NavListSection>
          </Accordion>
        </NavList>
      </AccordionSet>
    );
  }
}
