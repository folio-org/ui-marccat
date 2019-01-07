/* eslint-disable react/destructuring-assignment */
import isEqual from 'lodash/isEqual';
import cloneDeep from 'lodash/cloneDeep';
import uniqueId from 'lodash/uniqueId';
import React from 'react';
import stripesForm from '@folio/stripes-form';
import { FieldArray } from 'redux-form';
import PropTypes from 'prop-types';

import { Col, MultiColumnList, Row } from '@folio/stripes/components';
import MarcEditableItem from './MarcEditableItem';
import css from './MarcEditableList.css';
import { DropdownButtonMenu } from '../../../../lib';

const propTypes = {
  actionProps: PropTypes.object,
  actionSuppression: PropTypes.object,
  additionalFields: PropTypes.object,
  columnMapping: PropTypes.object,
  columnWidths: PropTypes.object,
  actionButtonLabel: PropTypes.node,
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
  actionButtonLabel: 'Actions',
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
      openDropDownMenu: false,
    };

    this.renderFields = this.renderFields.bind(this);
    this.setError = this.setError.bind(this);
    this.buildStatusArray = this.buildStatusArray.bind(this);
    this.getColumnWidths = this.getColumnWidths.bind(this);
    this.getVisibleColumns = this.getVisibleColumns.bind(this);
    this.getReadOnlyColumns = this.getReadOnlyColumns.bind(this);
    this.onRow = this.onRow.bind(this);

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
    const callback = (item.id) ?
      this.props.onUpdate :
      this.props.onCreate;
    const res = callback(item);
    Promise.resolve(res).then(
      () => {
        this.props.initialize(fields.getAll());

        this.toggleEdit(index);
      },
      () => this.setError(index, 'Error on saving data'),
    );
  }

  onEdit(index) {
    this.toggleEdit(index);
  }

  onRow = (e, meta) => {
    console.log(e);
  };

  onDelete(fields, index) {
    const { uniqueField } = this.props;
    const item = fields.get(index);
    const res = this.props.onDelete(item[uniqueField]);
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

  renderDropdownLabels = () => {
    const { translate } = this.props;
    return [
      {
        label: translate({ id: 'ui-marccat.button.new.auth' }),
        shortcut: translate({ id: 'ui-marccat.button.new.short.auth' }),
        onClick: () => {},
      },
      {
        label: translate({ id: 'ui-marccat.button.new.auth' }),
        shortcut: translate({ id: 'ui-marccat.button.new.short.auth' }),
        onClick: () => {},
      },
      {
        label: translate({ id: 'ui-marccat.button.new.auth' }),
        shortcut: translate({ id: 'ui-marccat.button.new.short.auth' }),
        onClick: () => {},
      },
      {
        label: translate({ id: 'ui-marccat.button.new.auth' }),
        shortcut: translate({ id: 'ui-marccat.button.new.short.auth' }),
        onClick: () => {},
      },
      {
        label: translate({ id: 'ui-marccat.button.new.bib' }),
        shortcut: translate({ id: 'ui-marccat.button.new.short.bib' }),
        onClick: () => {},
      }];
  };


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


  renderFields({ fields }) {
    const { openDropDownMenu, isEditing } = this.state;
    const cellFormatters = Object.assign({}, this.props.formatter);
    return (
      <div>
        <Row between="xs" className={css.marcEditableListFormHeader}>
          <Col xs>
            <Row end="xs" style={{ float: 'right' }}>
              <Col xs>
                <DropdownButtonMenu
                  {...this.props}
                  marginBottom0
                  label={this.props.actionButtonLabel}
                  labels={this.renderDropdownLabels()}
                  onToggle={() => this.setState({
                    openDropDownMenu: !openDropDownMenu
                  })}
                  open={openDropDownMenu}
                />
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <MultiColumnList
              {...this.props}
              interactive
              visibleColumns={this.getVisibleColumns()}
              contentData={fields.getAll()}
              rowFormatter={this.ItemFormatter}
              rowProps={{ fields }}
              formatter={cellFormatters}
              onRowClick={() => this.onRow}
              columnWidths={this.getColumnWidths()}
              isEmptyMessage={this.props.isEmptyMessage}
              headerRowClass={css.marcEditableListHeaders}
              id={`marcEditableList-${this.testingId}`}
            />
          </Col>
        </Row>
      </div>
    );
  }

  render() {
    return (
      <form>
        <FieldArray name="items" component={this.renderFields} toUpdate={this.state.lastAction} />
      </form>
    );
  }
}

MarcEditableForm.propTypes = propTypes;
MarcEditableForm.defaultProps = defaultProps;

export default stripesForm({
  form: 'marcEditableForm',
  navigationCheck: true,
  enableReinitialize: true,
  destroyOnUnmount: false,
})(MarcEditableForm);
