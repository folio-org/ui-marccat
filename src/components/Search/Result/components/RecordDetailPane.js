// @flow
import * as React from 'react';
import { Pane, Icon } from '@folio/stripes/components';
import RecordDetails from '../RecordDetails';
import { injectCommonProp, ActionMenuDetail } from '../../../../shared';
import type { Props } from '../../../../flow/index.js.flow';
import { META } from '../../../../config/constants';

class RecordDetailPane extends React.Component<Props, {}> {
  render() {
    const { detailPaneMeta, detail, onClose, rightMenuEdit } = this.props;
    return (
      <React.Fragment>
        <Pane
          id="pane-details"
          defaultWidth="35%"
          paneTitle={detailPaneMeta.title}
          paneSub={detailPaneMeta.subTitle}
          appIcon={{ app: META.ICON_TITLE }}
          actionMenu={ActionMenuDetail}
          dismissible
          onClose={onClose}
          lastMenu={rightMenuEdit}
        >
          {(!detail) ?
            <Icon icon="spinner-ellipsis" /> :
            <RecordDetails {...this.props} detail={detail} />
          }
        </Pane>
      </React.Fragment>
    );
  }
}
export default (injectCommonProp(RecordDetailPane));
