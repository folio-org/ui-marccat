/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
import * as React from 'react';
import { cloneDeep, isEqual, sortBy, uniqueId } from 'lodash';
import { FormattedMessage } from 'react-intl';
import { reduxForm, FieldArray } from 'redux-form';
import PropTypes from 'prop-types';
import {
  Button,
  Col,
  Headline,
  IconButton,
  HotKeys,
  MultiColumnList,
  Row,
} from '@folio/stripes/components';
import EditableItem from './EditableItem';
import ActionsMenuButton from '../../Menu/ActionsMenu';
import style from '../../../Style/variableform.css';
import { REDUX } from '../../../../../config/constants';

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
  createButtonLabel: 'Actions',
  fieldComponents: {},
  uniqueField: 'id',
};

class FieldForm extends React.Component {
  constructor(props) {
    super(props);

    let status = [];
    if (props.initialValues) {
      status = this.buildStatusArray(props.initialValues.items);
    }

    this.state = {
      status,
      lastAction: {},
      currentIndex: 0,
    };

    this.RenderItems = this.RenderItems.bind(this);
    this.setError = this.setError.bind(this);
    this.buildStatusArray = this.buildStatusArray.bind(this);
    this.getColumnWidths = this.getColumnWidths.bind(this);
    this.getVisibleColumns = this.getVisibleColumns.bind(this);
    this.getReadOnlyColumns = this.getReadOnlyColumns.bind(this);
    // this.onAdd = this.onAdd.bind(this);
    this.onAddAbove = this.onAddAbove.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onResetAll = this.onResetAll.bind(this);
    this.onCopy = this.onCopy.bind(this);
    this.onMoveUp = this.onMoveUp.bind(this);
    this.onMoveDown = this.onMoveDown.bind(this);
    this.onSortBy = this.onSortBy.bind(this);
    this.onPaste = this.onPaste.bind(this);
    this.onCut = this.onCut.bind(this);
    this.onUndo = this.onUndo.bind(this);
    this.onRedo = this.onRedo.bind(this);
    this.onViewMarkDocs = this.onViewMarkDocs.bind(this);
    this.onLookup = this.onLookup.bind(this);

    if (props.id) {
      this.marcTagRowTestingId = props.id;
    } else if (props.label) {
      this.marcTagRowTestingId = props.label
        .replace(/\s/, '\u001f')
        .toLowerCase();
    } else {
      this.marcTagRowTestingId = uniqueId();
    }
  }

  // eslint-disable-next-line react/no-deprecated
  componentWillReceiveProps(nextProps) {
    const { initialValues } = this.props;
    if (!isEqual(initialValues, nextProps.initialValues)) {
      this.setState({
        status: this.buildStatusArray(nextProps.initialValues.items),
      });
    }
  }

  /**
   *
   * @param {*} items
   */
  buildStatusArray(items) {
    return items.map(() => ({ editing: false, error: false }));
  }

  /**
   *
   * @param {*} items
   * @param {*} editing
   */
  buildStatusArrayWithParam(items, editing) {
    return items.map(() => ({ editing, error: false }));
  }

  /**
   *
   * @param {*} fields
   */
  // onAdd(fields) {
  //   const { itemTemplate } = this.props;
  //   const { status } = this.state;
  //   const newStatus = [...status];
  //   newStatus.push({ editing: true, error: false });
  //   this.setState({
  //     status: newStatus,
  //   });
  //   const item = { ...itemTemplate };
  //   fields.push(item);
  // }

  /**
   *
   * @param {*} fields
   */
  onAddAbove(fields) {
    const { itemTemplate } = this.props;
    const { status } = this.state;
    const newStatus = [...status];
    newStatus.unshift({ editing: true, error: false });
    this.setState({
      status: newStatus,
    });
    const item = { ...itemTemplate };
    fields.unshift(item);
  }

  /**
   *
   * @param {*} fields
   * @param {*} index
   */
  onCancel(fields, index) {
    const { contentData } = this.props;
    this.toggleEdit(index);
    contentData.splice(index, 1);
  }

  /**
   *
   * @param {*} fields
   * @param {*} index
   */
  onCopy(fields, index) {}

  /**
   *
   * @param {*} fields
   * @param {*} index
   */
  onMoveUp(fields, index) {}

  /**
   *
   * @param {*} fields
   * @param {*} index
   */
  onMoveDown(fields, index) {}

  /**
   *
   * @param {*} fields
   * @param {*} index
   */
  onCut(fields, index) {}

  /**
   *
   * @param {*} fields
   * @param {*} index
   */
  onPaste(fields, index) {}

  /**
   *
   * @param {*} fields
   * @param {*} index
   */
  onUndo(fields, index) {}

  /**
   *
   * @param {*} fields
   * @param {*} index
   */
  onRedo(fields, index) {}

  /**
   *
   * @param {*} fields
   * @param {*} index
   */
  onLookup(fields, index) {}
  /**
   *
   * @param {*} fields
   * @param {*} index
   */
  onViewMarkDocs(fields, index) {}
  /**
   *
   * @param {*} fields
   * @param {*} index
   */
  onDuplicate(fields, index) {
    const item = fields.get(index);
    fields.unshift(item);
    this.setState(curState => {
      const newState = cloneDeep(curState);
      if (newState.status.length === 0 && fields.length > 0) {
        newState.status = this.buildStatusArray();
      }
      newState.status.unshift({ editing: true, error: false });
      return newState;
    });
  }

  /**
   *
   * @param {*} fields
   * @param {*} index
   */
  onSave(fields, index) {
    const { onCreate } = this.props;
    const item = fields.get(index);
    item.code = item.variableField.code;
    const callback = onCreate;
    const res = callback(item);
    Promise.resolve(res).then(
      () => {
        this.toggleEdit(index);
      },
      () => this.setError(index, 'Error on save data')
    );
  }

  /**
   *
   * @param {*} index
   */
  onEdit(index) {
    this.toggleEdit(index);
  }

  /**
   *
   * @param {*} fields
   * @param {*} index
   */
  onDelete(fields, index) {
    const { contentData, onDelete } = this.props;
    const item = fields.get(index);
    contentData.splice(index, 1);
    const res = onDelete(item);
    Promise.resolve(res).then(
      () => {
        fields.remove(index);
        this.setState(curState => {
          const newState = cloneDeep(curState);
          newState.status.splice(index, 1);
          return newState;
        });
      },
      () => this.setError(index, 'Error on removing data')
    );
  }

  onSortBy(fields) {
    return sortBy(fields.getAll());
  }

  onResetAll() {
    const { reset } = this.props;
    reset();
  }

  /**
   *
   * @param {*} index
   * @param {*} errorMsg
   */
  setError(index, errorMsg) {
    this.setState(curState => {
      const newState = cloneDeep(curState);
      newState.status[index].error = errorMsg;
      newState.lastAction = new Date().getTime();
      return newState;
    });
  }

  getColumnWidths() {
    const visibleColumns = this.getVisibleColumns();
    const totalColumns = visibleColumns.length - 1;
    const staticWidth = 80 / totalColumns;
    const widthsObject = {};
    visibleColumns.forEach(f => {
      if (f !== 'actions') {
        if (f === 'variableField.code') {
          widthsObject[f] = '10%';
        } else if (f === 'variableField.ind1') {
          widthsObject[f] = '15%';
        } else if (f === 'variableField.ind2') {
          widthsObject[f] = '15%';
        } else if (f === 'variableField.displayValue') {
          widthsObject[f] = '40%';
        }
      }
    });
    widthsObject.actions = '20%';
    return widthsObject;
  }

  getVisibleColumns() {
    const { visibleFields } = this.props;
    return visibleFields.concat(['actions']);
  }

  getReadOnlyColumns() {
    const { readOnlyFields } = this.props;
    const actionsArray = ['actions'];
    if (readOnlyFields) {
      return readOnlyFields.concat(actionsArray);
    }
    return actionsArray;
  }

  toggleEdit(index) {
    const { status } = this.state;
    if (status.length === 0) {
      this.buildStatusArray();
    }
    this.setState(curState => {
      const newState = cloneDeep(curState);
      if (newState.status.length === 0) {
        newState.status = this.buildStatusArray();
      }
      newState.status[index].editing = !newState.status[index].editing;
      newState.status[index].isEditMode = !newState.status[index].isEditMode;
      newState.currentIndex = index;
      newState.lastAction = new Date().getTime();
      return newState;
    });
  }

  VariableFieldRowFormatter = ({
    rowIndex,
    rowData,
    cells,
    fields,
    columnWidths,
    rowProps,
  }) => {
    const { status } = this.state;
    const {
      columnMapping,
      actionSuppression,
      actionProps,
      additionalFields,
      fieldComponents,
    } = this.props;
    let isEditing;
    let hasError;
    if (status.length > 0) {
      isEditing = status[rowIndex].editing;
      hasError = status[rowIndex].error;
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
        columnMapping={columnMapping}
        actionSuppression={actionSuppression}
        actionProps={actionProps}
        visibleFields={this.getVisibleColumns()}
        onCancel={() => this.onCancel(fields, rowIndex)}
        onSave={() => this.onSave(fields, rowIndex)}
        onEdit={() => this.onEdit(rowIndex)}
        onDelete={() => this.onDelete(fields, rowIndex)}
        onDuplicate={() => this.onDuplicate(fields, rowIndex)}
        onSortBy={() => this.onSortBy()}
        additionalFields={additionalFields}
        readOnlyFields={this.getReadOnlyColumns()}
        fieldComponents={fieldComponents}
        widths={columnWidths}
        cells={cells}
        {...rowProps}
      />
    );
  };

  getActions = (fields, item) => {
    const {
      actionProps,
      actionSuppression,
      pristine,
      submitting,
      invalid,
    } = this.props;
    const { status } = this.state;

    if (status[item.rowIndex].editing) {
      return (
        <div style={{ display: 'flex' }}>
          <Button
            disabled={pristine || submitting || invalid}
            marginBottom0
            id={`clickable-save-${this.marcTagRowTestingId}-${item.rowIndex}`}
            onClick={() => this.onSave(fields, item.rowIndex)}
            {...(typeof actionProps.save === 'function'
              ? actionProps.save(item)
              : {})}
          >
            Save
          </Button>
          <Button
            marginBottom0
            id={`clickable-cancel-${this.marcTagRowTestingId}-${item.rowIndex}`}
            onClick={() => this.onCancel(fields, item.rowIndex)}
            {...(typeof actionProps.cancel === 'function'
              ? actionProps.cancel(item)
              : {})}
          >
            Cancel
          </Button>
        </div>
      );
    }
    return (
      <div style={{ display: 'flex' }}>
        {!actionSuppression.edit(item) && (
          <FormattedMessage id="stripes-components.editThisItem">
            {ariaLabel => (
              <IconButton
                icon="edit"
                size="small"
                id={`clickable-edit-${this.marcTagRowTestingId}-${item.rowIndex}`}
                aria-label={ariaLabel}
                onClick={() => this.onEdit(item.rowIndex)}
                {...(typeof actionProps.edit === 'function'
                  ? actionProps.edit(item)
                  : {})}
              />
            )}
          </FormattedMessage>
        )}
        {!actionSuppression.delete(item) && (
          <FormattedMessage id="stripes-components.deleteThisItem">
            {ariaLabel => (
              <IconButton
                icon="trash"
                size="small"
                id={`clickable-delete-${this.marcTagRowTestingId}-${item.rowIndex}`}
                aria-label={ariaLabel}
                onClick={() => this.onDelete(fields, item.rowIndex)}
                {...(typeof actionProps.delete === 'function'
                  ? actionProps.delete(item)
                  : {})}
              />
            )}
          </FormattedMessage>
        )}
      </div>
    );
  };

  RenderItems({ fields }) {
    const { currentIndex } = this.state;
    const { formatter, label, isEmptyMessage, onToggle } = this.props;

    const cellFormatters = Object.assign({}, formatter, {
      actions: item => this.getActions(fields, item),
    });

    const keys = {
      addAbove: ['ctrl+enter'],
      // add: ['alt+enter'],
      cleanField: ['shift+backspace'],
      cleanAll: ['shift+delete'],
      duplicate: ['ctrl+d'],
      copy: ['ctrl+c'],
      cut: ['ctrl+x'],
      paste: ['ctrl+v'],
      undo: ['ctrl+z'],
      redo: ['ctrl+shift+z'],
      lookup: ['ctrl+shift+l'],
      onViewMarkDocs: ['ctrl+shift+w'],
    };

    const handlers = {
      addAbove: () => this.onAddAbove(fields),
      // add: () => this.onAdd(fields),
      cleanField: () => this.onCancel(fields, currentIndex),
      cleanAll: () => this.onResetAll(),
      duplicate: () => this.onDuplicate(fields, currentIndex),
      copy: () => this.onCopy(fields, currentIndex),
      cut: () => this.onCut(fields, currentIndex),
      paste: () => this.onPaste(fields, currentIndex),
      undo: () => this.onUndo(fields, currentIndex),
      redo: () => this.onRedo(fields, currentIndex),
      lookup: () => this.onLookup(fields, currentIndex),
      onViewMarkDocs: () => this.onViewMarkDocs(fields, currentIndex)
    };

    return (
      <HotKeys
        keyMap={keys}
        handlers={handlers}
      >
        <Row between="xs" className={style.editableListFormHeader}>
          <Col xs>
            <Headline size="medium" margin="none">
              {label}
            </Headline>
          </Col>
          <Col xs>
            <Row end="xs" className={style.fr}>
              <Col xs>
                <ActionsMenuButton
                  {...this.props}
                  onClick={onToggle}
                  // onAdd={() => this.onAdd(fields)}
                  onAddAbove={() => this.onAddAbove(fields)}
                  onDuplicate={() => this.onDuplicate(fields, currentIndex)}
                  onCancel={() => this.onCancel(fields, currentIndex)}
                  onCopy={() => this.onCopy(fields, currentIndex)}
                  onMoveDown={() => this.onMoveDown(fields, currentIndex)}
                  onMoveUp={() => this.onMoveUp(fields, currentIndex)}
                  onCut={() => this.onCut(fields, currentIndex)}
                  onPaste={() => this.onPaste(fields, currentIndex)}
                  onUndo={() => this.onUndo(fields, currentIndex)}
                  onRedo={() => this.onRedo(fields, currentIndex)}
                  onResetAll={() => this.onResetAll()}
                  onSave={() => this.onSave(fields, currentIndex)}
                  onEdit={() => this.onEdit(currentIndex)}
                  onDelete={() => this.onDelete(fields, currentIndex)}
                  onSortBy={() => this.onSortBy(fields)}
                  marginBottom0
                  fields={fields}
                  id={`clickable-add-${this.marcTagRowTestingId}`}
                />
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <MultiColumnList
              {...this.props}
              visibleColumns={this.getVisibleColumns()}
              contentData={JSON.parse(JSON.stringify(fields.getAll()))}
              rowFormatter={this.VariableFieldRowFormatter}
              rowProps={{ fields }}
              formatter={cellFormatters}
              columnWidths={this.getColumnWidths()}
              isEmptyMessage={isEmptyMessage}
              headerRowClass={style.editListHeaders}
              id={`marcTagEditList-${this.marcTagRowTestingId}`}
            />
          </Col>
        </Row>
      </HotKeys>
    );
  }

  render() {
    const { lastAction } = this.state;
    return (
      <form>
        <FieldArray
          name="items"
          component={this.RenderItems}
          toUpdate={lastAction}
        />
      </form>
    );
  }
}

FieldForm.propTypes = propTypes;
FieldForm.defaultProps = defaultProps;

export default reduxForm({
  form: REDUX.FORM.VARIABLE_FORM,
  navigationCheck: true,
  enableReinitialize: true,
  destroyOnUnmount: true,
})(FieldForm);
