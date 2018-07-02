import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from '@folio/stripes-components/lib/Modal';
import Button from '@folio/stripes-components/lib/Button';
import { connect } from '@folio/stripes-connect';
import { VersionModal } from './';
import * as C from '../Utils';
import { propType } from 'graphql-anywhere';


class Version extends React.Component {

  static propTypes = {
    appTitle: PropTypes.string.isRequired,
    version: PropTypes.string.isRequired,
  }
  render() {
    return (
      <VersionModal appTitle="Cataloging" version="1.0-beta" />
    );
  }
}
export default connect(Version, C.META.MODULE_NAME);
