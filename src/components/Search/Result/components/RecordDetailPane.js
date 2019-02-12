/**
 * @format
 * @flow
 */
import React from 'react';
import { Pane, PaneMenu, Button, Icon } from '@folio/stripes/components';
import { FormattedMessage } from 'react-intl';
import RecordDetails from '../RecordDetails';
import { Props, injectCommonProp } from '../../../../core';
import { ActionMenuDetail } from '../../../../lib';
import { META } from '../../../../utils/Constant';

class RecordDetailPane extends React.Component<Props, {}> {
  renderRightMenuEdit = () => {
    const { handleClickEdit } = this.props;
    return (
      <PaneMenu>
        <Button
          {...this.props}
          buttonStyle="primary"
          onClick={handleClickEdit()}
          label={<FormattedMessage id="ui-marccat.search.record.edit" />}
        />
        <Icon icon="bookmark" />
        <Icon icon="tag" />
      </PaneMenu>
    );
  };

  render() {
    const { detailPaneMeta, detail, isFetchingDetail, isReadyDetail, onClose } = this.props;
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
          lastMenu={this.renderRightMenuEdit()}
        >
          {(isFetchingDetail) ?
            <Icon icon="spinner-ellipsis" /> :
            (isReadyDetail) ?
              <RecordDetails {...this.props} detail={detail} /> : null
          }
        </Pane>
      </React.Fragment>
    );
  }
}
export default (injectCommonProp(RecordDetailPane));
