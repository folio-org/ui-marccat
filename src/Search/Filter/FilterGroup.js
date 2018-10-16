import React from 'react';
import PropTypes from 'prop-types';

import {
  Accordion,
  FilterAccordionHeader,
  Checkbox
} from '@folio/stripes-components';
import styles from './Style/Filter.css';

export default function FilterGroup({
  searchType,
  activeFilters = {},
  availableFilters
}) {
  return (
    <div className={styles['search-filters']}>
      {availableFilters.map(({ name, label, defaultValue, options }) => (
        <Accordion
          key={name}
          name={name}
          label={label}
          separator={false}
          closedByDefault={false}
          header={FilterAccordionHeader}
          displayClearButton={!!activeFilters[name] && activeFilters[name] !== defaultValue}
          onClearFilter={() => {}}
          id={`filter-${searchType}-${name}`}
        >
          {options.map(({ label, value }, i) => ( // eslint-disable-line no-shadow
            <Checkbox
              key={i}
              name={name}
              id={`marccat-search-filters-${searchType}-${name}-${value}`}
              label={label}
              value={value}
              checked={value === (activeFilters[name] || defaultValue)}
              onChange={() => {
                const replaced = {
                  ...activeFilters,
                  [name]: value === defaultValue ? undefined : value
                };
                // TODO FIXME
                return replaced;
              }}
            />
          ))}
        </Accordion>
      ))}
    </div>
  );
}

FilterGroup.propTypes = {
  searchType: PropTypes.string.isRequired,
  activeFilters: PropTypes.object,
  availableFilters: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    defaultValue: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired
    })).isRequired
  })).isRequired,
};
