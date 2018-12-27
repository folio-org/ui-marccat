/**
 * @format
 * @flow
 */
import * as React from 'react';
import { connect } from 'react-redux';
import { MultiColumnList, Icon, Pane, AccordionSet, Accordion } from '@folio/stripes/components';
import { Props, injectCommonProp } from '../../core';
import { getActionMenu, ToolbarButtonMenu } from '../../lib';

type P = Props & {
  label: string;
};


class DefaultTemplate extends React.Component<P, {}> {
  render() {
    const { translate, label, isLoadingData, defaultTemplateData } = this.props;
    const names = [];
    if (defaultTemplateData && defaultTemplateData.length > 0) { defaultTemplateData.forEach(t => names.push(t.name)); }
    const rightMenu = (
      <ToolbarButtonMenu
        create
        {...this.props}
        label={
          <Icon icon="edit">
            {translate({
              id:'ui-marccat.search.record.edit' })}
          </Icon>
        }
      />
    );
    return (
      <Pane
        defaultWidth="fill"
        fluidContentWidth
        paneTitle={label}
        actionMenu={getActionMenu}
        lastMenu={rightMenu}
      >
        {(defaultTemplateData && defaultTemplateData.length > 0) && (isLoadingData) ?
          <Icon icon="spinner-ellipsis" /> :
          <div>
            <AccordionSet>
              <Accordion separator={false} label={translate({ id: 'ui-marccat.template.bib.accordion' })} id="bibTemplates">
                <MultiColumnList
                  contentData={defaultTemplateData}
                  rowMetadata={['id', 'name', 'fields']}
                  columnWidths={
                    {
                      'name': '50%',
                    }
                  }
                  visibleColumns={[
                    'name',
                  ]}
                />
              </Accordion>
            </AccordionSet>
          </div>
        }
      </Pane>
    );
  }
}

export default (connect(
  ({ marccat: { template } }) => ({
    defaultTemplateData: template.records,
    isReadyData: template.isReady,
    isLoadingData: template.isLoading
  }),
)(injectCommonProp(DefaultTemplate)));
