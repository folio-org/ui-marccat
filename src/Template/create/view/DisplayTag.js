/**
 * @format
 * @flow
 */
import React from 'react';
import MultiColumnList from '@folio/stripes-components/lib/MultiColumnList';
import css from '../../styles/Template.css';


export default function DisplayTag() {
  return (
    <div className={css.currentTag}>
      <MultiColumnList
        contentData={{}}
      />
    </div>
  );
}
