import React from 'react';
import MultiColumnList from '@folio/stripes-components/lib/MultiColumnList';
import Pane from '@folio/stripes-components/lib/Pane';
import { fakeFormatter } from '../../Utils/Formatter';
import { ToolbarMenu, ToolbarButtonMenu } from '../../Core';
import * as C from '../../Utils';
import css from '../styles/Template.css';


type TemplateReusltProps = {
  templates: Object;
  handleRowClick: () => void;
  onClick: () => void;
  recordsTemplates: Object;
  stripes: Object;
  resources: Object;
};

export default function TemplateResults({ handleRowClick, onClick, ...props }: TemplateReusltProps) {
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
      paneTitle={props.stripes.intl.formatMessage({
        id: 'ui-marccat.templates.title',
      })}
      paneSub={props.resources.recordsTemplates.records.length + ' Result found'}
      appIcon={{ app: C.META.ICON_TITLE }}
    >
      <MultiColumnList
        id="list-templates"
        loading={!props.resources.recordsTemplates.hasLoaded}
        contentData={props.resources.recordsTemplates.records}
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
