// @flow
import * as React from 'react';
import { Button, Modal, ModalFooter, TextField } from '@folio/stripes/components';
import { Field, reduxForm } from 'redux-form';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import type { Props } from '../../../flow/types.js.flow';
import { Localize } from '../../../shared/utils/Function';
import { duplicaRecordAction } from '../Actions';

class DuplicaRecord extends React.Component<Props, {
  confirming: Boolean;
}> {
  constructor(props: Props) {
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
    const { store: { getState }, duplicaRecord } = this.props;
    const id = getState().form.duplicaRecordForm.values.recordid;
    this.setState({ sending: true, id });
    duplicaRecord(id);
    setTimeout(() => {
      this.onHide();
      this.setState({ sending: false, confirming: false });
    }, 3000);
  }

  getFooter = () => {
    const { testId } = this.state;
    const { buttonStyle, cancelButtonStyle } = this.props;
    return (
      <ModalFooter>
        <Button
          data-test-duplicate-record-modal-confirm-button
          buttonStyle={buttonStyle}
          id={`clickable-${testId}-confirm`}
          onClick={this.duplicateRecord}
        >
          {Localize({ key: 'cataloging.record.duplicate' })}
        </Button>
        <Button
          data-test-duplicate-record-modal-cancel-button
          buttonStyle={cancelButtonStyle}
          id={`clickable-${testId}-cancel`}
          onClick={this.onHide}
        >
          {Localize({ key: 'button.cancel' })}
        </Button>
      </ModalFooter>);
  }


  render() {
    const { testId, confirming, sending } = this.state;
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
          {Localize({ key: 'cataloging.record.duplicate' })}
        </Button>
        <Modal
          dismissible
          contentClass={styleMedia.test}
          closeOnBackgroundClick
          open={confirming}
          onClose={this.onHide}
          label="Duplicate Record from existing one"
          footer={footer}
        >
          <form name="duplicaRecordForm">
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label htmlFor="recordid">Insert the record id to duplicate:</label>
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
