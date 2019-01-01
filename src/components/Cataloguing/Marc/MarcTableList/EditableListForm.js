/* eslint-disable react/destructuring-assignment */
import isEqual from 'lodash/isEqual';
import cloneDeep from 'lodash/cloneDeep';
import uniqueId from 'lodash/uniqueId';
import React from 'react';
import { FieldArray } from 'redux-form';
import PropTypes from 'prop-types';

import { Button, Col, MultiColumnList, Row } from '@folio/stripes-components';
import EditableItem from './EditableItem';
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

class MarcEditableForm extends React.Component {
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
    return items.map(() => ({ editing: false, error: false }));
  }

  onAdd(fields) {
    const { itemTemplate } = this.props;
    const item = { ...itemTemplate };
    fields.unshift(item);
    // add field to edit-tracking in edit mode.
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

    // if the item has a unique identifier, toggle its edit mode... if not, remove it.
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

    // Reset the field values.
    this.props.reset();
  }

  onSave(fields, index) {
    const item = fields.get(index);
    // if item has no id, it's new...
    const callback = (item.id) ?
      this.props.onUpdate :
      this.props.onCreate;
    const res = callback(item);
    Promise.resolve(res).then(
      () => {
        // Set props.initialValues to the currently-saved field values.
        this.props.initialize(fields.getAll());

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
        widthsObject[f] = `${staticWidth}%`;
      });
      return widthsObject;
    }
    return this.props.columnWidths;
  }

  getVisibleColumns() {
    return this.props.visibleFields;
  }

  getReadOnlyColumns() {
    const actionsArray = [];
    if (this.props.readOnlyFields) {
      return this.props.readOnlyFields;
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
      <EditableItem
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

  RenderItems({ fields }) {
    const cellFormatters = Object.assign({}, this.props.formatter);
    return (
      <div>
        <Row between="xs" className={css.editableListFormHeader}>
          <Col xs>
            <Row end="xs">
              <Col xs>
                <Button
                  buttonStyle="primary"
                  onClick={() => {}}
                  marginBottom0
                  id={`clickable-add-${this.testingId}`}
                >
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
      <FieldArray name="items" component={this.RenderItems} toUpdate={this.state.lastAction} />
    );
  }
}

MarcEditableForm.propTypes = propTypes;
MarcEditableForm.defaultProps = defaultProps;

export default MarcEditableForm;
