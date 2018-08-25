/**
 * @format
 * @flow
 */
import React from 'react';
import MultiColumnList from '@folio/stripes-components/lib/MultiColumnList';
import css from './style/CreateTag.css';

type DisplayTagProps = {
};

export default function DisplayTag({ ...props }:DisplayTagProps) {
  return (
    <div className={css.currentTag}>
      <MultiColumnList
        contentData={{}}
      />
    </div>
  );
}
