// @flow
import * as React from 'react';
import { Button, Modal, ModalFooter, TextField } from '@folio/stripes/components';
import { Field, reduxForm } from 'redux-form';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Localize } from '../..';

type Props = {
  label: String,
  formName: String,
  keyOpenModal: String,
  fieldLabel: String,
  buttonStyle: Object,
  keyConfirm: String,
  keyCancel: String,
  cancelButtonStyle: Object,
  fieldLabel: String,
  onClick: Function,
  onHide: Function
}
type State = {
  confirming: boolean,
  sending: boolean,
}
class ReduxModal extends React.Component<Props, State> {

  static formName: undefined;

  constructor(props) {
    super(props);
    this.state = {
      confirming: false,
      sending: false,
    };
    this.onConfirm = this.onConfirm.bind(this);
    this.getFooter = this.getFooter.bind(this);
    ReduxModal.formName = props.formName;
  }

  onConfirm = () => {
    this.setState({
      confirming: true,
    });
  }

  getFooter = () => {
    const { buttonStyle, keyConfirm, keyCancel, cancelButtonStyle, fieldLabel, onClick, onHide } = this.props;
    return (
      <ModalFooter>
        <Button
          data-test-duplicate-record-modal-confirm-button
          buttonStyle={buttonStyle}
          id={`clickable-${fieldLabel}-confirm`}
          onClick={onClick}
        >
          {Localize({ key: keyConfirm })}
        </Button>
        <Button
          data-test-duplicate-record-modal-cancel-button
          buttonStyle={cancelButtonStyle}
          id={`clickable-${fieldLabel}-cancel`}
          onClick={onHide}
        >
          {Localize({ key: keyCancel })}
        </Button>
      </ModalFooter>);
  }


  render() {
    const { confirming, sending } = this.state;
    const { label, keyOpenModal, fieldLabel } = this.props;
    const footer = (this.getFooter());
    return (
      <React.Fragment>
        <Button
          {...this.props}
          buttonStyle="primary"
          type="button"
          marginBottom0
          disabled={sending}
          onClick={() => this.setState({ confirming: true })}
        >
          {Localize({ key: keyOpenModal })}
        </Button>
        <Modal
          dismissible
          contentClass={styleMedia.test}
          closeOnBackgroundClick
          open={confirming}
          onClose={this.onHide}
          label={label}
          footer={footer}
        >
          <form name="duplicaRecordForm">
            <label htmlFor="recordid">{Localize({ key: fieldLabel })}</label>
            <Field
              id={fieldLabel}
              name={fieldLabel}
              type="text"
              placeholder={fieldLabel}
              onChange={this.handleOnChange}
              component={TextField}
              loading={sending}
              hasClearIcon="true"
              required="true"
            />
          </form>
        </Modal>
      </React.Fragment>
    );
  }
}


const mapDispatchToProps = (dispatch) => bindActionCreators({
  duplicaRecord: () => (_) => {
    // dispatch(duplicaRecordAction(id));
  }
}, dispatch);
// eslint-disable-next-line no-class-assign
ReduxModal = (connect((state) => ({
  duplicateRecord: state.marccat.data.recordDuplicate
}), mapDispatchToProps)(ReduxModal));

export default reduxForm({
  form: ReduxModal.formName,
  navigationCheck: true,
  enableReinitialize: true,
  destroyOnUnmount: false,
})(ReduxModal);
