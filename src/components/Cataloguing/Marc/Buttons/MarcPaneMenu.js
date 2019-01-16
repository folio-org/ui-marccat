import React from 'react';
import { PaneMenu, Button, Icon } from '@folio/stripes/components';
import { Props } from '../../../../core';

export default class MarcPaneMenu extends React.Component<Props, {}> {
  render() {
    const rightButton = {
      marginRight: '10px',
      float: 'right',
    };
    const { translate, saveRecord } = this.props;
    return (
      <React.Fragment>
        <PaneMenu>
          <Button
            style={rightButton}
            buttonStyle="primary"
            onClick={saveRecord()}
            type="button"
            marginBottom0
          >
            <Icon icon="plus-sign">
              {translate({ id: 'ui-marccat.template.record.create' })}
            </Icon>
          </Button>
          <Button
            style={rightButton}
            buttonStyle="primary"
            onClick={this.deleteRecord()}
            type="button"
            disabled={false}
            marginBottom0
          >
            <Icon icon="trash">
              {translate({ id: 'ui-marccat.template.record.delete' })}
            </Icon>
          </Button>
        </PaneMenu>
      </React.Fragment>
    );
  }
}
