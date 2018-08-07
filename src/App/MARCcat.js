
/**
 * @format
 * @flow
 */
import React from 'react';
import Paneset from '@folio/stripes-components/lib/Paneset';
import Pane from '@folio/stripes-components/lib/Pane';
import { connect } from '@folio/stripes-connect';
import { ToolbarMenu, EmptyMessage } from '../Core';
import * as C from '../Utils';

type Props = {
  stripes: Object;
  actionMenuItems: () => void;
};
type State = {};

class MARCcat extends React.Component<Props, State> {
  render() {
    const leftMenu = <ToolbarMenu icon={['search']} />;
    const rightMenu = <ToolbarMenu icon={['bookmark', 'gear']} />;
    const { formatMessage } = this.props.stripes.intl;
    const { actionMenuItems } = this.props;
    return (
      <Paneset static>
        <Pane
          defaultWidth="fill"
          firstMenu={leftMenu}
          lastMenu={rightMenu}
          actionMenuItems={actionMenuItems}
          paneTitle={formatMessage({
            id: 'ui-marccat.app.title',
          })}
          paneSub={formatMessage({
            id: 'ui-marccat.noResult',
          })}
          appIcon={{ app: 'marccat' }}
        >
          <EmptyMessage
            icon="left-arrow"
            label={formatMessage({
              id: 'ui-marccat.initial.title',
            })}
          />
        </Pane>
      </Paneset>
    );
  }
}

export default connect(
  MARCcat,
  C.META.MODULE_NAME,
);

