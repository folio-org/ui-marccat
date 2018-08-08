import React from 'react';
import MultiColumnList from '@folio/stripes-components/lib/MultiColumnList';
import Pane from '@folio/stripes-components/lib/Pane';
import { fakeFormatter } from '../../Utils/Formatter';
import { ToolbarMenu, ToolbarButtonMenu } from '../../Core';
import * as C from '../../Utils';
import css from '../styles/Template.css';

export default function TemplateResults({ templates, formatMsg, handleRowClick, onClick, recordsTemplates, ...props }) {
  const searchMenu = <ToolbarMenu icon={['search']} />;
  const newButtonMenu = <ToolbarButtonMenu
    {...props}
    create
    className={css.mr15}
    onClick={onClick}
  />;
  return (
    <Pane
      defaultWidth="fill"
      firstMenu={searchMenu}
      newButtonMenu={newButtonMenu}
      paneTitle={formatMsg({
        id: 'ui-marccat.templates.title',
      })}
      paneSub={templates.length + ' Result found'}
      appIcon={{ app: C.META.ICON_TITLE }}
    >
      <MultiColumnList
        id="list-templates"
        loading={!recordsTemplates.hasLoaded}
        contentData={templates}
        rowMetadata={['id', 'id']}
        formatter={fakeFormatter}
        ariaLabel="TemplateView"
        visibleColumns={['id', 'name']}
        sortedColumn="name"
        sortOrder="ascending"
        onRowClick={handleRowClick}
      />
    </Pane>
  );
}
