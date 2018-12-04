/**
 * @format
 * @flow
 */
import * as React from 'react';
import { connect } from 'react-redux';
import Pane from '@folio/stripes-components/lib/Pane';
import { AccordionSet, Accordion } from '@folio/stripes-components/lib/Accordion';
import { MultiColumnList } from '@folio/stripes-components';
import { Props, injectCommonProp } from '../../core';
import { ActionTypes } from '../../redux/actions/Actions';

type P = Props & {
  label: string;
};
class DefaultTemplate extends React.Component<P, {}> {
  render() {
    const { translate, label, isReadyData, defaultTemplateData } = this.props;
    if (isReadyData === true) {
      return (
        <Pane
          defaultWidth="fill"
          fluidContentWidth
          paneTitle={label}
        >
          <AccordionSet>
            <Accordion separator={false} label={translate({ id: 'ui-marccat.template.bib.accordion' })} id="bibTemplates">
              <MultiColumnList
                contentData={defaultTemplateData}
                rowMetadata={['id', 'name', 'fields']}
                onRowClick={(meta) => {
                  const { store, history } = this.props;
                  const id = meta.id;
                  store.dispatch({ type: ActionTypes.TEMPLATE_GET_BY_ID, query: id });
                  history.push('/marccat/template');
                }}
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
        </Pane>
      );
    } else return null;
  }
}

export default (connect(
  ({ marccat: { template } }) => ({
    defaultTemplateData: template.records,
    isReadyData: template.isReady
  }),
)(injectCommonProp(DefaultTemplate)));
