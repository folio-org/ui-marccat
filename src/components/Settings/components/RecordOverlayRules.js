// @flow
import React, { Fragment } from 'react';
import { Pane, Button, Icon } from '@folio/stripes/components';
import { injectProps, ToolbarButtonMenu } from '../../../shared';
import type { Props } from '../../../flow/types.js.flow';
import TAGS from '../utils/Constant';

import style from '../../../shared/styles/common.css';

type P = Props & {
  label: string;
};

class RecordsOverlayRules extends React.Component<P, {}> {
  constructor(props) {
    super(props);
    this.state = {
      locked: true
    };
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  handleOnClick = () => {
    const { locked } = this.state;
    this.setState({
      locked: !locked
    });
  };

  render() {
    const { label, translate } = this.props;
    const { locked } = this.state;
    const rightMenu = (
      <ToolbarButtonMenu
        onClick={this.handleOnClick}
        {...this.props}
        label={
          <Icon icon="edit">
            {translate({
              id: 'ui-marccat.search.record.edit' })}
          </Icon>
        }
      />
    );
    return (
      <Pane
        defaultWidth="fill"
        fluidContentWidth
        paneTitle={label}
        lastMenu={rightMenu}
      >
        <div id="data-test-settings-record-overlay-rules" className={style['mb-10']}>
          {translate({ id: 'ui-marccat.settings.record.single.overlay.rules.text' }) }
        </div>
        <Fragment>
          {TAGS.map((t, i) => (
            <Button buttonStyle="dropdownItem" key={i} onClick={this.handleOnClick}>
              <Icon icon={(locked) ? 'eye-closed' : 'eye-open'}>
                {t + ' • Control Number Identifier'}
              </Icon>
            </Button>))
          }
        </Fragment>
      </Pane>
    );
  }
}
export default injectProps(RecordsOverlayRules);
