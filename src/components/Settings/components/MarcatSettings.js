// @flow
import * as React from 'react';
import { Settings } from '@folio/stripes/smart-components';
import { connect } from 'react-redux';
import FieldGroupings from './FieldGroupings';
import DefaultTemplate from './DefaultTemplate';
import RecordsOverlayRules from './RecordOverlayRules';
import LocalAuthorityRecords from './LocalAuthorityRecords';
import type { Props } from '../../../flow/types.js.flow';
import { loadTemplateAction } from '../../Search/Actions';

class MARCcatSettings extends React.Component<Props, {}> {
  constructor(props) {
    super(props);

    const { translate } = this.props;
    this.pages = [
      {
        route: 'general',
        label: translate({
          id: 'ui-marccat.settings.field.groupings',
        }),
        component: FieldGroupings,
      },
      {
        route: 'defaultTemplate',
        label: translate({
          id: 'ui-marccat.settings.default.record.template',
        }),
        component: DefaultTemplate,
      },
      {
        route: 'overlayRules',
        label: translate({
          id: 'ui-marccat.settings.single.record.overlay.rules',
        }),
        component: RecordsOverlayRules,
      },
      {
        route: 'authorityRecords',
        label: translate({
          id: 'ui-marccat.settings.local.authority.records',
        }),
        component: LocalAuthorityRecords,
      },
    ];
  }

  render() {
    const { translate } = this.props;
    return (
      <Settings
        {...this.props}
        navPaneWidth="20%"
        pages={this.pages}
        paneTitle={translate({
          id: 'ui-marccat.settings.general',
        })}
      />
    );
  }
}

export default connect({}, (dispatch) => dispatch(loadTemplateAction()))(MARCcatSettings);
