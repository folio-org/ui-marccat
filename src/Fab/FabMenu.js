import React from 'react';
import { connect } from '@folio/stripes-connect';
import { MainButton, Menu, ChildButton } from 'react-mfb';
import PropTypes from 'prop-types';

class FabMenu extends React.Component {
  static propTypes = {
    effect: PropTypes.string.isRequired,
    event: PropTypes.string.isRequired,
    position: PropTypes.string.isRequired
  };

  render() {
    const { effect, event, position } = this.props;
    return (
      <Menu effect={effect} method={event} position={position}>
        <MainButton iconResting="share" iconActive="ion-android-arrow-forward" />
        <ChildButton
          icon="ion-social-github"
          label="ion-social-github"
          href="https://github.com/nobitagit/react-material-floating-button/"
        />
        <ChildButton
          icon="ion-social-facebook"
          label="ion-social-facebook"
          href="https://github.com/nobitagit/react-material-floating-button/"
        />
        <ChildButton
          icon="ion-social-twitter"
          label="ion-social-twitter"
          href="https://github.com/nobitagit/react-material-floating-button/"
        />
      </Menu>);
  }
}


export default connect(FabMenu, 'ui-cataloging');
