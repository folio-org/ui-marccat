/**
 * @format
 * @flow
 */
import * as React from 'react';
import { connect } from 'react-redux';
import { MultiColumnList, Icon, Pane } from '@folio/stripes/components';
import { Props, injectCommonProp } from '../../core';
import { getActionMenu, ToolbarButtonMenu, CheckboxIconButton } from '../../lib';

type P = Props & {
  label: string;
};


class DefaultTemplate extends React.Component<P, {}> {
  constructor(props) {
    super(props);
    this.handleSelectTemplate = this.handleSelectTemplate.bind(this);
  }

  handleSelectTemplate = (e, record) => {
    const { history } = this.props;
    history.push(`/marccat/record/template?templateId=${record.id}`);
  }

  render() {
    const resultsFormatter = {
      id: () => (
        <Icon
          icon="document"
          size="small"
        />
      ),
    };
    const { translate, label, isLoadingData, defaultTemplateData } = this.props;
    const names = [];
    if (defaultTemplateData && defaultTemplateData.length > 0) { defaultTemplateData.forEach(t => names.push(t.name)); }
    const rightMenu = (
      <ToolbarButtonMenu
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
          <CheckboxIconButton labels={names} />
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
