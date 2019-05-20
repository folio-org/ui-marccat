// @flow
import * as React from 'react';
import { Settings } from '@folio/stripes/smart-components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import FieldGroupings from './FieldGroupings';
import DefaultTemplate from './DefaultTemplate';
import RecordsOverlayRules from './RecordOverlayRules';
import LocalAuthorityRecords from './LocalAuthorityRecords';
import type { Props } from '../../../flow/types.js.flow';
import { loadTemplateAction } from '../../Search/Actions';
import { Localize } from '../../../shared';

class MARCcatSettings extends React.Component<Props, {}> {
  constructor(props) {
    super(props);
    this.pages = [
      {
        route: 'general',
        label: Localize({
          key: 'settings.field.groupings',
        }),
        component: FieldGroupings,
      },
      {
        route: 'defaultTemplate',
        label: Localize({
          key: 'settings.default.record.template',
        }),
        component: DefaultTemplate,
      },
      {
        route: 'overlayRules',
        label: Localize({
          key: 'settings.single.record.overlay.rules',
        }),
        component: RecordsOverlayRules,
      },
      {
        route: 'authorityRecords',
        label: Localize({
          key: 'settings.local.authority.records',
        }),
        component: LocalAuthorityRecords,
      },
    ];
  }


  componentDidMount() {
    const { loadTemplates } = this.props;
    loadTemplates();
  }

  render() {
    return (
      <Settings
        {...this.props}
        navPaneWidth="20%"
        pages={this.pages}
        paneTitle={Localize({
          key: 'settings.general',
        })}
      />
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  loadTemplates: () => _ => {
    dispatch(loadTemplateAction());
  }
}, dispatch);
export default connect(null, mapDispatchToProps)(MARCcatSettings);
