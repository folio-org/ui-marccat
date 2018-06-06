import React from 'react';
import PropTypes from 'prop-types';
import Modal from '@folio/stripes-components/lib/Modal';
import Button from '@folio/stripes-components/lib/Button';

class ErrorModal extends React.Component {
  static contextTypes = {
    translate: PropTypes.func,
  };

  static propTypes = {
    open: PropTypes.bool,
    onClose: PropTypes.func,
    message: PropTypes.string,
    type: PropTypes.bool,
  };

  render() {
    const { open, message, onClose, type } = this.props;
    const { translate } = this.context;

    return (
      <Modal onClose={onClose} open={open} size="small" label={translate('itemNotCheckedOut')} dismissible>
        <p>{message}</p>
        <Button onClick={onClose}>{translate('okay')}</Button>
      </Modal>
    );
  }
}

export default ErrorModal;
