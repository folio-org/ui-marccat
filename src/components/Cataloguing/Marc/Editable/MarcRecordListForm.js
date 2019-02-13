/* eslint-disable no-param-reassign */
/* eslint-disable react/destructuring-assignment */
import isEqual from 'lodash/isEqual';
import { cloneDeep, uniqueId, sortBy } from 'lodash';

import React from 'react';
import { FormattedMessage } from 'react-intl';
import { reduxForm, FieldArray } from 'redux-form';
import PropTypes from 'prop-types';
import {
  Button,
  Col,
  Headline,
  IconButton,
  MultiColumnList,
  Row
} from '@folio/stripes-components';
import MarcEditableItem from './MarcEditableItem';
import css from './EditableList.css';

const propTypes = {
  actionProps: PropTypes.object,
  actionSuppression: PropTypes.object,
  additionalFields: PropTypes.object,
  columnMapping: PropTypes.object,
  columnWidths: PropTypes.object,
  createButtonLabel: PropTypes.node,
  fieldComponents: PropTypes.object,
  formatter: PropTypes.object,
  id: PropTypes.string,
  initialize: PropTypes.func,
  initialValues: PropTypes.object,
  invalid: PropTypes.bool,
  isEmptyMessage: PropTypes.node,
  itemTemplate: PropTypes.object,
  label: PropTypes.node,
  onCreate: PropTypes.func,
  onDelete: PropTypes.func,
  onUpdate: PropTypes.func,
  pristine: PropTypes.bool,
  readOnlyFields: PropTypes.arrayOf(PropTypes.string),
  reset: PropTypes.func,
  submitting: PropTypes.bool,
  uniqueField: PropTypes.string,
  visibleFields: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const defaultProps = {
  actionProps: {},
  actionSuppression: { delete: () => false, edit: () => false },
  createButtonLabel: '+ Add new',
  fieldComponents: {},
  itemTemplate: {},
  uniqueField: 'id',
};

class EditableListForm extends React.Component {
  constructor(props) {
    super(props);

    let status = [];
    if (props.initialValues) {
      status = this.buildStatusArray(props.initialValues.items);
    }

    this.state = {
      status,
      lastAction: {},
    };

    this.RenderItems = this.RenderItems.bind(this);
    this.setError = this.setError.bind(this);
    this.buildStatusArray = this.buildStatusArray.bind(this);
    this.getColumnWidths = this.getColumnWidths.bind(this);
    this.getVisibleColumns = this.getVisibleColumns.bind(this);
    this.getReadOnlyColumns = this.getReadOnlyColumns.bind(this);

    if (this.props.id) {
      this.testingId = this.props.id;
    } else if (this.props.label) {
      this.testingId = this.props.label.replace(/\s/, '').toLowerCase();
    } else {
      this.testingId = uniqueId();
    }
  }

  componentWillReceiveProps(nextProps) { // eslint-disable-line react/no-deprecated
    if (!isEqual(this.props.initialValues, nextProps.initialValues)) {
      this.setState({
        status: this.buildStatusArray(nextProps.initialValues.items),
      });
    }
  }

  buildStatusArray(items) {
    return items.map(() => ({ code: items.code, editing: false, error: false }));
  }

  onAdd(fields) {
    const { itemTemplate } = this.props;
    const item = { ...itemTemplate };
    fields.unshift(item);
    this.setState((curState) => {
      const newState = cloneDeep(curState);
      if (newState.status.length === 0 && fields.length > 0) {
        newState.status = this.buildStatusArray();
      }
      newState.status.unshift({ editing: true, error: false });
      return newState;
    });
  }

  onCancel(fields, index) {
    const { uniqueField } = this.props;
    const item = fields.get(index);
    if (item[uniqueField]) {
      this.toggleEdit(index);
    } else {
      fields.remove(index);
      this.setState((curState) => {
        const newState = cloneDeep(curState);
        newState.status.splice(index, 1);
        return newState;
      });
    }

    this.props.reset();
  }

  onSave(fields, index) {
    const item = fields.get(index);
    const callback = (item.code) ? this.props.onUpdate : this.props.onCreate;
    const res = callback(item);
    Promise.resolve(res).then(
      () => {
        this.toggleEdit(index);
      },
      () => this.setError(index, 'Error on saving data'),
    );
  }

  onEdit(index) {
    this.toggleEdit(index);
  }

  onDelete(fields, index) {
    const { uniqueField } = this.props;
    const item = fields.get(index);
    sortBy(this.props.contentData, 'code');
    this.props.contentData.splice(index, 1);
    const res = this.props.onDelete(item[uniqueField]);
    Promise.resolve(res).then(
      () => {
        fields.remove(index);
        // remove item from editable tracking...
        this.setState((curState) => {
          const newState = cloneDeep(curState);
          newState.status.splice(index, 1);
          return newState;
        });
      },
      () => this.setError(index, 'Error on removing data'),
    );
  }

  setError(index, errorMsg) {
    this.setState((curState) => {
      const newState = cloneDeep(curState);
      newState.status[index].error = errorMsg;
      newState.lastAction = new Date().getTime();
      return newState;
    });
  }

  getColumnWidths() {
    if (!this.props.columnWidths) {
      const visibleColumns = this.getVisibleColumns();
      const totalColumns = visibleColumns.length - 1;
      const staticWidth = 80 / totalColumns;
      const widthsObject = {};
      visibleColumns.forEach((f) => {
        if (f !== 'actions') {
          widthsObject[f] = `${staticWidth}%`;
        }
      });
      widthsObject.actions = '20%';
      return widthsObject;
    }
    return this.props.columnWidths;
  }

  getVisibleColumns() {
    return this.props.visibleFields.concat(['actions']);
  }

  getReadOnlyColumns() {
    const actionsArray = ['actions'];
    if (this.props.readOnlyFields) {
      return this.props.readOnlyFields.concat(actionsArray);
    }
    return actionsArray;
  }

  toggleEdit(index) {
    if (this.state.status.length === 0) {
      this.buildStatusArray();
    }
    this.setState((curState) => {
      const newState = cloneDeep(curState);
      if (newState.status.length === 0) {
        newState.status = this.buildStatusArray();
      }
      newState.status[index].editing = !newState.status[index].editing;
      newState.lastAction = new Date().getTime();
      return newState;
    });
  }

  ItemFormatter = ({
    rowIndex,
    rowData,
    cells,
    fields,
    columnWidths,
    rowProps,
  }) => {
    let isEditing;
    let hasError;
    if (this.state.status.length > 0) {
      isEditing = this.state.status[rowIndex].editing;
      hasError = this.state.status[rowIndex].error;
    } else {
      isEditing = false;
      hasError = false;
    }

    return (
      <MarcEditableItem
        editing={isEditing}
        error={hasError}
        key={rowIndex}
        field="items"
        item={rowData}
        rowIndex={rowIndex}
        columnMapping={this.props.columnMapping}
        actionSuppression={this.props.actionSuppression}
        actionProps={this.props.actionProps}
        visibleFields={this.getVisibleColumns()}
        onCancel={() => this.onCancel(fields, rowIndex)}
        onSave={() => this.onSave(fields, rowIndex)}
        onEdit={() => this.onEdit(rowIndex)}
        onDelete={() => this.onDelete(fields, rowIndex)}
        additionalFields={this.props.additionalFields}
        readOnlyFields={this.getReadOnlyColumns()}
        fieldComponents={this.props.fieldComponents}
        widths={columnWidths}
        cells={cells}
        {...rowProps}
      />
    );
  }

  getActions = (fields, item) => {
    const { actionProps, actionSuppression, pristine, submitting, invalid } = this.props;

    if (this.state.status[item.rowIndex].editing) {
      return (
        <div style={{ display: 'flex' }}>
          <Button
            disabled={pristine || submitting || invalid}
            marginBottom0
            id={`clickable-save-${this.testingId}-${item.rowIndex}`}
            onClick={() => this.onSave(fields, item.rowIndex)}
            {...(typeof actionProps.save === 'function' ? actionProps.save(item) : {})}
          >
            Save
          </Button>
          <Button
            marginBottom0
            id={`clickable-cancel-${this.testingId}-${item.rowIndex}`}
            onClick={() => this.onCancel(fields, item.rowIndex)}
            {...(typeof actionProps.cancel === 'function' ? actionProps.cancel(item) : {})}
          >
            Cancel
          </Button>
        </div>
      );
    }
    return (
      <div style={{ display: 'flex' }}>
        {!actionSuppression.edit(item) &&
          <FormattedMessage id="stripes-components.editThisItem">
            {ariaLabel => (
              <IconButton
                icon="edit"
                size="small"
                id={`clickable-edit-${this.testingId}-${item.rowIndex}`}
                aria-label={ariaLabel}
                onClick={() => this.onEdit(item.rowIndex)}
                {...(typeof actionProps.edit === 'function' ? actionProps.edit(item) : {})}
              />
            )}
          </FormattedMessage>
        }
        {!actionSuppression.delete(item) &&
          <FormattedMessage id="stripes-components.deleteThisItem">
            {ariaLabel => (
              <IconButton
                icon="trash"
                size="small"
                id={`clickable-delete-${this.testingId}-${item.rowIndex}`}
                aria-label={ariaLabel}
                onClick={() => this.onDelete(fields, item.rowIndex)}
                {...(typeof actionProps.delete === 'function' ? actionProps.delete(item) : {})}
              />
            )}
          </FormattedMessage>
        }
      </div>
    );
  };

  RenderItems({ fields }) {
    const cellFormatters = Object.assign({}, this.props.formatter, { actions: item => this.getActions(fields, item) });
    return (
      <div>
        <Row between="xs" className={css.editableListFormHeader}>
          <Col xs>
            <Headline size="medium" margin="none">{this.props.label}</Headline>
          </Col>
          <Col xs>
            <Row end="xs">
              <Col xs>
                <Button onClick={() => this.onAdd(fields)} marginBottom0 id={`clickable-add-${this.testingId}`}>
                  {this.props.createButtonLabel}
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <MultiColumnList
              {...this.props}
              visibleColumns={this.getVisibleColumns()}
              contentData={fields.getAll()}
              rowFormatter={this.ItemFormatter}
              rowProps={{ fields }}
              formatter={cellFormatters}
              columnWidths={this.getColumnWidths()}
              isEmptyMessage={this.props.isEmptyMessage}
              headerRowClass={css.editListHeaders}
              id={`editList-${this.testingId}`}
            />

          </Col>
        </Row>
      </div>
    );
  }

  render() {
    return (
      <form>
        <FieldArray name="items" component={this.RenderItems} toUpdate={this.state.lastAction} />
      </form>
    );
  }
}

EditableListForm.propTypes = propTypes;
EditableListForm.defaultProps = defaultProps;

export default reduxForm({
  form: 'marcEditableListForm',
  navigationCheck: true,
  enableReinitialize: true,
  destroyOnUnmount: false,
})(EditableListForm);
