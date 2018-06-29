import React from 'react';
import Modal from '@folio/stripes-components/lib/Modal';
import Button from '@folio/stripes-components/lib/Button';
import { connect } from '@folio/stripes-connect';
import * as C from '../Utils';

type VersionProps = {|
    id: string;
    appTitle: string;
    version: number;
    isOpen: bool;
    onClose: Function;
|}
type VersionState = {||};

class Version extends React.Component<VersionProps, VersionState> {

  render() {
    const { id, appTitle, version, onClose, isOpen = false } = this.props;
    return (
      <Modal id={id} onClose={onClose} open={isOpen} size="small" label={appTitle} dismissible>
        <p>{appTitle}</p>
        <p>{version}</p>
        <Button onClick={onClose}>Close</Button>
      </Modal>
    );
  }
}
export default connect(Version, C.META.MODULE_NAME);
