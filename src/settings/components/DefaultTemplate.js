/**
 * @format
 * @flow
 */
import * as React from 'react';
import { connect } from 'react-redux';
import { Icon, Pane, Button } from '@folio/stripes/components';
import { FormattedMessage } from 'react-intl';
import { Props, injectCommonProp } from '../../core';
import { ToolbarButtonMenu } from '../../lib';
import CheckMarkIcon from '../../lib/components/Button/CheckMarkIcon';

type P = Props & {
  label: string;
};


class DefaultTemplate extends React.Component<P, {}> {
  constructor(props) {
    super(props);
    this.handleSelectTemplate = this.handleSelectTemplate.bind(this);
  }

  handleSelectTemplate = () => {
    const { history } = this.props;
    history.push(`/marccat/record/template?templateId=${408}`);
  }

  render() {
    const { translate, label, isLoadingData, defaultTemplateData } = this.props;
    const names = [];
    const getActionMenu = () => (
      <React.Fragment>
        <Button buttonStyle="dropdownItem" onClick={this.handleSelectTemplate}>
          <Icon icon="document">
            <FormattedMessage id="ui-marccat.template.actionmenu.new" />
          </Icon>
        </Button>
      </React.Fragment>
    );
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
          <React.Fragment>
            <div id="data-test-settings-authority-records" style={{ paddingBottom: '15px' }}>
              {translate({ id: 'ui-marccat.settings.default.record.template.auth.text' }) }
            </div>
            <CheckMarkIcon labels={names.slice(0, 4)} />
            <div id="data-test-settings-authority-records" style={{ paddingBottom: '15px', paddingTop: '15px' }}>
              {translate({ id: 'ui-marccat.settings.default.record.template.bib.text' }) }
            </div>
            <div id="data-test-settings-authority-records" style={{ paddingBottom: '15px', paddingTop: '15px' }}>
              No authority template found.
            </div>
          </React.Fragment>
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
