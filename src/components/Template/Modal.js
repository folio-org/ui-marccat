// @flow
import * as React from 'react';
import { Button, Modal, ModalFooter, TextField } from '@folio/stripes/components';
import { Field, reduxForm } from 'redux-form';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Localize } from '../../shared';
import { createTemplateAction } from './Action';

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

  constructor(props) {
    super(props);
    this.state = {
      confirming: false,
      sending: false,
    };
    this.onConfirm = this.onConfirm.bind(this);
    this.onHide = this.onHide.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.createTemplate = this.createTemplate.bind(this);
    this.getFooter = this.getFooter.bind(this);
  }

  onConfirm = () => {
    this.setState({
      confirming: true,
    });
  }

  onHide = () => {
    const { id } = this.state;
    const { router, toggleFilterPane, duplicateRecord } = this.props;
    if (duplicateRecord) {
      this.setState({
        confirming: false,
        sending: false,
        id: 0,
      });
      toggleFilterPane();
      router.push(`/marccat/cataloging?id=${id}&mode=duplicate`);
    }
  }

  handleOnChange = e => {
    const id = e.target.value;
    if (id.length > 6 && id.length < 8) {
      this.setState({ id });
    }
  }

  createTemplate = () => {
    const { createTemplate } = this.props;
    this.setState({ sending: true });
    createTemplate();
    setTimeout(() => {
      this.onHide();
      this.setState({ sending: false, confirming: false });
    }, 3000);
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
          <form name="createTemplateForm">
            {fieldLabel.map(l => (
              <Field
                id={l}
                name={l}
                type="text"
                placeholder={l}
                onChange={this.handleOnChange}
                component={TextField}
                loading={sending}
                hasClearIcon="true"
                required="true"
              />
            ))}
          </form>
        </Modal>
      </React.Fragment>
    );
  }
}


const mapDispatchToProps = (dispatch) => bindActionCreators({
  createTemplate: (payload) => (_) => {
    dispatch(createTemplateAction(payload));
  }
}, dispatch);
// eslint-disable-next-line no-class-assign
ReduxModal = (connect((state) => ({
  templates: state.marccat.data.template
}), mapDispatchToProps)(ReduxModal));

export default reduxForm({
  form: 'createTemplateForm',
  navigationCheck: true,
  enableReinitialize: true,
  destroyOnUnmount: false,
})(ReduxModal);
