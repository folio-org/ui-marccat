/**
 * @format
 * @flow
 */
import React from 'react';
import Modal from '@folio/stripes-components/lib/Modal';
import { Row } from '../../node_modules/react-flexbox-grid';

import css from './style/Modal.css';

type VersionModalProps = {
  appTitle: string,
  appVersion: string,
  credits: string,
  appIcon: string,
};
type VersionModalState = {
  open: boolean,
};

export default class VersionModal extends React.Component<
  VersionModalProps,
  VersionModalState
> {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
    this.handleClose = this.handleClose.bind(this);
  }

  handleClose = () => {
    this.setState({
      isOpen: false
    });
  };

  render() {
    const { appTitle, appVersion, credits, appIcon } = this.props;
    return (
      <Modal dismissible closeOnBackgroundClick onClose={this.handleClose} open={this.state.isOpen} label="MARCcat">
        <Row>
          <Row>
            <div className={css.row}>
              <img src={appIcon} alt="app" />
            </div>
            <p className={css.modalTitle}>{appTitle}</p>
            <p className={css.modalVersion}>{appVersion}</p>
          </Row>
          <Row>
            <p className={css.modalCredits}>{credits}</p>
            <p className={css.modalContent}>Lorem ipsum dolor sit amet, consectetur
              adipisicing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua.
              Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip
              ex ea commodo consequat. Duis aute irure dolor
              in reprehenderit in voluptate velit esse
              cillum dolore eu fugiat nulla pariatur.
              Excepteur sint occaecat cupidatat non
              proident, sunt in culpa qui officia deserunt
              mollit anim id est laborum
            </p>
          </Row>
        </Row>
      </Modal>
    );
  }
}
