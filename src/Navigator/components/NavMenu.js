import React from 'react';
import NavListSection from '@folio/stripes-components/lib/NavListSection';
import NavListItem from '@folio/stripes-components/lib/NavListItem';
import NavList from '@folio/stripes-components/lib/NavList';

export default class NavMenu extends React.Component {
  render() {
    const rootPath = this.props.match.path;
    return (
      <NavList>
        <NavListSection label="Search" activeLink={`${rootPath}`}>
          <NavListItem to={`${rootPath}/simpleSearch`}>Simple Search</NavListItem>
          <NavListItem to={`${rootPath}/advancedSearch`}>Advance Search</NavListItem>
          <NavListItem to={`${rootPath}/externalSearch`}>External Search</NavListItem>
          <NavListItem to={`${rootPath}/indexList`}>Indexes</NavListItem>
          <NavListItem to={`${rootPath}/diacritic`} style={{ marginBottom: '20px' }}>Diacritic</NavListItem>
        </NavListSection>
        <NavListSection label="Report">
          <NavListItem to={`${rootPath}/report`} style={{ marginBottom: '20px' }}>Report</NavListItem>
        </NavListSection>
        <NavListSection label="Template">
          <NavListItem to={`${rootPath}/templateList`}>Template from file</NavListItem>
          <NavListItem to={`${rootPath}/templateList`} style={{ marginBottom: '20px' }}>Template List</NavListItem>
        </NavListSection>
      </NavList>
    );
  }
}
