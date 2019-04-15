/* eslint-disable jsx-a11y/label-has-associated-control */
/**
 * @format
 * @flow
 */
import React from 'react';
import { Button, ModalFooter, Modal, TextField } from '@folio/stripes/components';
import { Field, reduxForm } from 'redux-form';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import type { Props } from '../../../core';
import { Localize } from '../../../shared/Function';
import { duplicaRecordAction } from '../Actions';

class DuplicaRecord extends React.Component<Props, {
  confirming: Boolean;
}> {
  constructor(props:Props) {
    super(props);
    this.state = {
      confirming: false,
      testId: 'duplicate-record',
      sending: false,
      id: 0,
    };

    this.onConfirm = this.onConfirm.bind(this);
    this.onHide = this.onHide.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.duplicateRecord = this.duplicateRecord.bind(this);
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

  duplicateRecord = () => {
    const { id } = this.state;
    const { duplicaRecord } = this.props;
    duplicaRecord(id);
    this.setState({ sending: true });
    setTimeout(() => {
      this.onHide();
      this.setState({ sending: false, confirming: false });
    }, 3000);
  };

  getFooter({ ...props }) {
    const { testId } = this.state;
    return (
      <ModalFooter>
        <Button
          data-test-duplicate-record-modal-confirm-button
          buttonStyle={props.buttonStyle}
          id={`clickable-${testId}-confirm`}
          onClick={this.duplicateRecord}
        >
          {Localize({ key: 'cataloging.record.duplicate' })}
        </Button>
        <Button
          data-test-duplicate-record-modal-cancel-button
          buttonStyle={props.cancelButtonStyle}
          id={`clickable-${testId}-cancel`}
          onClick={this.onHide}
        >
          {Localize({ key: 'button.cancel' })}
        </Button>
      </ModalFooter>);
  }


  render() {
    const { testId, confirming, sending } = this.state;
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
          {Localize({ key: 'cataloging.record.duplicate' })}
        </Button>
        <Modal
          dismissible
          contentClass={styleMedia.test}
          closeOnBackgroundClick
          open={confirming}
          onClose={this.onHide}
          label="Duplicate Record from existing one"
          footer={this.getFooter()}
        >
          <form name="duplicaRecordForm">
            <label htmlFor="recordid">Insert the redcor id to duplicate:</label>
            <Field
              id={testId}
              name="recordid"
              type="text"
              placeholder="Insert id...."
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
  duplicaRecord: (id) => (_) => {
    dispatch(duplicaRecordAction(id));
  }
}, dispatch);
// eslint-disable-next-line no-class-assign
DuplicaRecord = (connect((state) => ({
  duplicateRecord: state.marccat.data.recordDuplicate
}), mapDispatchToProps)(DuplicaRecord));

export default reduxForm({
  form: 'duplicaRecordForm',
  navigationCheck: true,
  enableReinitialize: true,
  destroyOnUnmount: false,
})(DuplicaRecord);
