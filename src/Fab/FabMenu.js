import React from 'react';
import { connect } from '@folio/stripes-connect';
import { MainButton, Menu, ChildButton } from 'react-mfb';
import PropTypes from 'prop-types';

class FabMenu extends React.Component {
    static propTypes = {
      effect: PropTypes.string.isRequired,
      event: PropTypes.string.isRequired,
      position: PropTypes.string.isRequired,
      isChildrenVisible: PropTypes.bool.isRequired,
    };

    render() {
      return this.props.isChildrenVisible ? (
        <Menu effect={this.props.effect} method={this.props.event} position={this.props.position}>
          <MainButton iconResting="ion-android-menu" iconActive="ion-android-arrow-forward" />
          <ChildButton
            icon="ion-social-github"
            label={this.props.isChildrenVisible}
            href="https://github.com/nobitagit/react-material-floating-button/"
          />
        </Menu>
      ) : (
        <Menu effect={this.props.effect} method={this.props.event} position={this.props.position}>
          <MainButton iconResting="ion-android-menu" iconActive="ion-android-arrow-forward" />
        </Menu>
      );
    }
}


export default connect(FabMenu, 'ui-cataloging');
