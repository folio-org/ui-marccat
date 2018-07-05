import React from 'react';
import Modal from '@folio/stripes-components/lib/Modal';
import './Modal.css';

type VersionModalProps = {|
    appTitle: string;
    appVersion: string;
    appIcon: string,
    open: bool,
    onClose: Function,
    message: string,
    credits: string,
    translate: Function
|}
type VersionModalState = {|
|}


export default class VersionModalApp extends React.Component<VersionModalProps, VersionModalState> {


  render() {
    const { open, appTitle, appVersion, appIcon, credits, onClose } = this.props;
    return (
      <Modal closeOnBackgroundClick onClose={onClose} open={open} size="small">
        <p>{appTitle}</p>
        <p>{appVersion}</p>
        <p>{appIcon}</p>
        <p>{credits}</p>
      </Modal>
    );
  }
}
