// @flow
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Icon, Pane, Button } from '@folio/stripes/components';
import { FormattedMessage } from 'react-intl';
import { ToolbarButtonMenu, CheckMarkIcon
} from '../../../shared';
import type { Props } from '../../../flow/types.js.flow';

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
    history.push(`/marccat/record/template?templateId=${1}`);
  }

  render() {
    const { translate, label, isLoadingData, defaultTemplateData } = this.props;
    const names = [];
    const getActionMenu = () => (
      <Fragment>
        <Button buttonStyle="dropdownItem" onClick={this.handleSelectTemplate}>
          <Icon icon="document">
            <FormattedMessage id="ui-marccat.template.actionmenu.new" />
          </Icon>
        </Button>
      </Fragment>
    );
    if (defaultTemplateData && defaultTemplateData.length > 0) { defaultTemplateData.forEach(t => names.push(t.name)); }
    const rightMenu = (
      <ToolbarButtonMenu
        {...this.props}
        label={
          <Icon icon="edit">
            {translate({
              id: 'ui-marccat.search.record.edit' })}
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
          <Fragment>
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
          </Fragment>
        }
      </Pane>
    );
  }
}

export default (connect(
  ({ marccat: { templates } }) => ({
    defaultTemplateData: templates.records,
  }),
)((DefaultTemplate)));
