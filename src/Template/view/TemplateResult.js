import * as React from 'react';
import MultiColumnList from '@folio/stripes-components/lib/MultiColumnList';
import Pane from '@folio/stripes-components/lib/Pane';
import Icon from '@folio/stripes-components/lib/Icon';
import { fakeFormatter } from '../../Utils/Formatter';
import { ToolbarMenu, ToolbarButtonMenu } from '../../Core';
import * as C from '../../Utils';
import css from '../styles/Template.css';


type TemplateReusltProps = {
  templates: Object;
  handleRowClick: () => void;
  onClick: () => void;
  stripes: Object;
  resources: Object;
};
/**
 *
 * @param {*} functional components
 */
export default function TemplateResults({ handleRowClick, onClick, ...props }: TemplateReusltProps) {
  const leftMenu = <ToolbarMenu icon={['search']} />;
  const newButtonMenu = <ToolbarButtonMenu
    {...props}
    create
    className={css.mr15}
    onClick={onClick}
  />;
  const { resources: { recordsTemplates } } = props;
  const isLoadedTemplates = (recordsTemplates === null || !recordsTemplates || !recordsTemplates.hasLoaded);
  return (
    <Pane
      defaultWidth="fill"
      firstMenu={leftMenu}
      lastMenu={newButtonMenu}
      paneTitle={props.stripes.intl.formatMessage({
        id: 'ui-marccat.templates.title',
      })}
      paneSub={(!isLoadedTemplates) ? recordsTemplates.records.length + ' Result found' : 'No Result found'}
      appIcon={{ app: C.META.ICON_TITLE }}
    >
      {(!recordsTemplates || !recordsTemplates.hasLoaded) ? <Icon icon="spinner-ellipsis" /> :
        (<MultiColumnList
          id="list-templates"
          loading={!recordsTemplates.hasLoaded}
          contentData={recordsTemplates.records}
          rowMetadata={['id', 'id']}
          formatter={fakeFormatter}
          ariaLabel="TemplateView"
          visibleColumns={['id', 'name']}
          sortedColumn="name"
          sortOrder="ascending"
          onRowClick={handleRowClick}
        />)
      }
    </Pane>
  );
}
