/* eslint-disable no-param-reassign */
import React from 'react';
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
  Row
} from '@folio/stripes/components';
import MarcEditableItem from './MarcEditableItem';
import { getEmptyVariableField } from '../../Utils/MarcApiUtils';
import ActionsMenuButton from '../Menu/ActionsMenu';
import style from '../../Style/variableform.css';

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
  onDuplicate: PropTypes.func,
  onSortBy: PropTypes.func,
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
      currentIndex: 0,
    };


    this.RenderItems = this.RenderItems.bind(this);
    this.setError = this.setError.bind(this);
    this.buildStatusArray = this.buildStatusArray.bind(this);
    this.getColumnWidths = this.getColumnWidths.bind(this);
    this.getVisibleColumns = this.getVisibleColumns.bind(this);
    this.getReadOnlyColumns = this.getReadOnlyColumns.bind(this);
    this.onAdd = this.onAdd.bind(this);

    this.keys = {
      'add' : ['enter'],
      'cleanField' : ['delete'],
      'cleanAll' : ['backspace'],
      'duplicate' : ['ctrl+d'],
      'copy' : ['ctrl+C'],
      'cut' : ['ctrl+X'],
      'paste' : ['ctrl+V'],
      'undo' : ['ctrl+Z'],
      'redo' : ['ctrl+shift+Z']
    };

    this.handlers = {
      'add' : this.onAdd,
      'cleanField' : this.onCancel,
      'cleanAll' : props.reset('marcEditableListForm'),
      'duplicate' : this.onDuplicate,
      'copy' : () => {},
      'cut' : () => {},
      'paste' : () => {},
      'undo' :() => {},
    };

    if (props.id) {
      this.marcTagRowTestingId = props.id;
    } else if (props.label) {
      this.marcTagRowTestingId = props.label.replace(/\s/, '\u001f').toLowerCase();
    } else {
      this.marcTagRowTestingId = uniqueId();
    }
  }

  componentWillReceiveProps(nextProps) { // eslint-disable-line react/no-deprecated
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
   * @param {*} index
   */
  normalizeField(fields: Array<*>, index: number): Object {
    const item = fields.get(index);
    return (item.variableField.keyNumber > 0) ? getEmptyVariableField(true, item) : getEmptyVariableField(false, item);
  }

  /**
   *
   * @param {*} fields
   */
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
  onDuplicate(fields, index) {
    const item = fields.get(index);
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

  /**
   *
   * @param {*} fields
   * @param {*} index
   */
  onSave(fields, index) {
    const { onCreate } = this.props;
    const item = this.normalizeField(fields, index);
    const callback = onCreate;
    const res = callback(item);
    Promise.resolve(res).then(
      () => {
        this.toggleEdit(index);
      },
      () => this.setError(index, 'Error on save data'),
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
        this.setState((curState) => {
          const newState = cloneDeep(curState);
          newState.status.splice(index, 1);
          return newState;
        });
      },
      () => this.setError(index, 'Error on removing data'),
    );
  }

  onSortBy(fields) {
    const { contentData } = this.props;
    const sorted = sortBy(fields, 'code');
    const sorted2 = sortBy(contentData, 'code');
    fields = sorted;
    return sorted2;
  }

  /**
   *
   * @param {*} index
   * @param {*} errorMsg
   */
  setError(index, errorMsg) {
    this.setState((curState) => {
      const newState = cloneDeep(curState);
      newState.status[index].error = errorMsg;
      newState.lastAction = new Date().getTime();
      return newState;
    });
  }

  getColumnWidths() {
    const { columnWidths } = this.props;
    if (!columnWidths) {
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
    return columnWidths;
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
    this.setState((curState) => {
      const newState = cloneDeep(curState);
      if (newState.status.length === 0) {
        newState.status = this.buildStatusArray();
      }
      newState.status[index].editing = !newState.status[index].editing;
      newState.currentIndex = index;
      newState.lastAction = new Date().getTime();
      return newState;
    });
  }

  TagRowFormatter = ({
    rowIndex,
    rowData,
    cells,
    fields,
    columnWidths,
    rowProps,
  }) => {
    const { status } = this.state;
    const { columnMapping, actionSuppression, actionProps, additionalFields, fieldComponents } = this.props;
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
      <React.Fragment>
        {/* <SingleCheckboxIconButton labels={['']} /> */}
        <MarcEditableItem
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
      </React.Fragment>
    );
  }

  getActions = (fields, item) => {
    const { actionProps, actionSuppression, pristine, submitting, invalid } = this.props;
    const { status } = this.state;

    if (status[item.rowIndex].editing) {
      return (
        <div style={{ display: 'flex' }}>
          <Button
            disabled={pristine || submitting || invalid}
            marginBottom0
            id={`clickable-save-${this.marcTagRowTestingId}-${item.rowIndex}`}
            onClick={() => this.onSave(fields, item.rowIndex)}
            {...(typeof actionProps.save === 'function' ? actionProps.save(item) : {})}
          >
            Save
          </Button>
          <Button
            marginBottom0
            id={`clickable-cancel-${this.marcTagRowTestingId}-${item.rowIndex}`}
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
                id={`clickable-edit-${this.marcTagRowTestingId}-${item.rowIndex}`}
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
                id={`clickable-delete-${this.marcTagRowTestingId}-${item.rowIndex}`}
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
    const { currentIndex } = this.state;
    const { formatter, label, isEmptyMessage, onToggle } = this.props;

    const cellFormatters = Object.assign({}, formatter, { actions: item => this.getActions(fields, item) });
    return (
      <HotKeys
        keyMap={this.keys}
        handlers={{ 'add': () => this.onAdd(fields) }}
      >
        <Row between="xs" className={style.editableListFormHeader}>
          <Col xs>
            <Headline size="medium" margin="none">{label}</Headline>
          </Col>
          <Col xs>
            <Row end="xs" className={style.fr}>
              <Col xs>
                <ActionsMenuButton
                  {...this.props}
                  onClick={onToggle}
                  onAdd={() => this.onAdd(fields)}
                  onDuplicate={() => this.onDuplicate(fields, currentIndex)}
                  onCancel={() => this.onCancel(fields, currentIndex)}
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
              contentData={fields.getAll()}
              rowFormatter={this.TagRowFormatter}
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
        <FieldArray name="items" component={this.RenderItems} toUpdate={lastAction} />
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
