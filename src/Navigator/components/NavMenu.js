import React from 'react';
import { AccordionSet, Accordion } from '@folio/stripes-components/lib/Accordion';
import NavListSection from '@folio/stripes-components/lib/NavListSection';
import NavListItem from '@folio/stripes-components/lib/NavListItem';

export default class NavMenu extends React.Component {
  render() {
    const { item } = this.props;
    return (
      <AccordionSet>
        {Object.keys(item).map(i => (
          <Accordion label={i.sectionLabel} id={i.id}>
            <NavListSection label={i.label} activeLink={i.activeLink}>
              <NavListItem to={i.to}>{i.label}</NavListItem>
            </NavListSection>
          </Accordion>
        ))
        }
      </AccordionSet>
    );
  }
}
