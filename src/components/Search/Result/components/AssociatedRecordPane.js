/**
 * @format
 * @flow
 */
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Pane, Icon } from '@folio/stripes/components';
import { AppIcon } from '@folio/stripes-core';
import AssociatedBibDetails from '../AssociatedBibDetails';
import { Props, injectCommonProp } from '../../../../core';
import { ActionMenu } from '../../../../lib';
import * as C from '../../../../shared/Constants';

class AssociatedRecordPane extends React.Component<Props, {}> {
  render() {
    const {
      onClose,
      isLoadingAssociatedRecord,
      isReadyAssociatedRecord,
      renderRightMenuEdit
    } = this.props;
    return (
      <React.Fragment>
        <Pane
          id="pane-associated-record-details"
          defaultWidth="25%"
          paneTitle={<FormattedMessage id="ui-marccat.search.record.preview" />}
          paneSub={C.EMPTY_STRING}
          appIcon={<AppIcon app={C.META.ICON_TITLE} />}
          actionMenu={ActionMenu}
          dismissible
          onClose={onClose}
          lastMenu={renderRightMenuEdit}
        >
          {(isLoadingAssociatedRecord) ?
            <Icon icon="spinner-ellipsis" /> :
            (isReadyAssociatedRecord) ?
              <AssociatedBibDetails {...this.props} /> : null
          }
        </Pane>
      </React.Fragment>
    );
  }
}
export default (injectCommonProp(AssociatedRecordPane));
