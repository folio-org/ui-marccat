/**
 * @format
 * @flow
 */
import React from 'react';
import Paneset from '@folio/stripes-components/lib/Paneset';
import Pane from '@folio/stripes-components/lib/Pane';
import { connect } from '@folio/stripes-connect';
import { ToolbarMenu } from '../../Core';
import * as C from '../../Utils';

class AdvancedSearch extends React.Component<*> {
  render() {
    const leftMenu = <ToolbarMenu icon={['search']} />;
    const rightMenu = <ToolbarMenu icon={['validation-check', 'gear']} />;
    const { formatMessage } = this.props.stripes.intl;
    return (
      <Paneset static>
        <Pane
          defaultWidth="fill"
          firstMenu={leftMenu}
          lastMenu={rightMenu}
          paneTitle={formatMessage({
            id: 'ui-marccat.Advanced search',
          })}
          paneSub={formatMessage({
            id: 'ui-marccat.noResult',
          })}
          appIcon={{ app: 'marccat' }}
        />
      </Paneset>
    );
  }
}

export default connect(
  AdvancedSearch,
  C.META.MODULE_NAME,
);
