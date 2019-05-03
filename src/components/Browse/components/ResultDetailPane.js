// @flow
import * as React from 'react';
import { Pane, Icon } from '@folio/stripes/components';
import { FormattedMessage } from 'react-intl';
import { ToolbarButtonMenu, injectCommonProp } from '../../../shared';
import { BrowseItemDetail } from '../BrowseItemDetail';
import { EMPTY_STRING } from '../../../config/constants';

class ResultDetailPane extends React.Component<{}, {}> {
  renderButtonMenu = () => {
    return (
      <ToolbarButtonMenu
        {...this.props}
        label={
          <Icon icon="plus-sign">
            <FormattedMessage id="ui-marccat.browse.record.create" />
          </Icon>
        }
      />
    );
  };

  render() {
    const {
      translate,
      isReadyBrowseDetails,
      isFetchingBrowseDetails,
      handleClosePanelDetails,
    } = this.props;
    return (
      <Pane
        dismissible
        defaultWidth="35%"
        paneTitle={translate({ id: 'ui-marccat.browse.results.title' })}
        paneSub={EMPTY_STRING}
        lastMenu={this.renderButtonMenu()}
        onClose={handleClosePanelDetails()}
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
