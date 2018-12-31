/**
 * @format
 * @flow
 */
import React from 'react';
import { Pane, Icon } from '@folio/stripes/components';
import * as C from '../../../../utils/Constant';
import { injectCommonProp } from '../../../../core';
import { BrowseItemDetail } from '../BrowseItemDetail';

class ResultDetailPane extends React.Component {
  render() {
    const {
      translate,
      isReadyBrowseDetails,
      isFetchingBrowseDetails,
      handleClosePanelDetails,
      renderButtonMenu
    } = this.props;
    return (
      <Pane
        dismissible
        defaultWidth="35%"
        paneTitle={translate({ id: 'ui-marccat.browse.results.title' })}
        paneSub={C.EMPTY_MESSAGE}
        lastMenu={renderButtonMenu()}
        onClose={handleClosePanelDetails}
      >
        {
          (isFetchingBrowseDetails) ?
            <Icon icon="spinner-ellipsis" /> :
            (isReadyBrowseDetails) ?
              <BrowseItemDetail {...this.props} /> : null
        }
      </Pane>
    );
  }
}
export default injectCommonProp(ResultDetailPane);
