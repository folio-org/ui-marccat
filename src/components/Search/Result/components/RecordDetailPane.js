/**
 * @format
 * @flow
 */
import React from 'react';
import { Pane, Icon } from '@folio/stripes/components';
import RecordDetails from '../RecordDetails';
import { Props, injectCommonProp } from '../../../../core';
import { ActionMenuDetail } from '../../../../lib';
import { META } from '../../../../shared/Constants';

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
