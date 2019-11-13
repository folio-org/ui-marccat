import React from 'react';
import PropTypes from 'prop-types';
import EditableItem from '../EditableItem';

const VariableFieldRow = ({
  actionProps,
  actionSuppression,
  additionalFields,
  cells,
  columnMapping,
  columnWidths,
  field,
  fieldComponents,
  hasError,
  isEditing,
  onCancel,
  onDelete,
  onDuplicate,
  onEdit,
  onSave,
  onSortBy,
  readOnlyFields,
  rowData,
  rowIndex,
  rowProps,
  visibleFields,
}) => {
  console.log(
    `hasError=${hasError}, isEditing=${isEditing}, rowIndex=${rowIndex}`
  );
  return (
    <EditableItem
      actionProps={actionProps}
      actionSuppression={actionSuppression}
      additionalFields={additionalFields}
      cells={cells}
      columnMapping={columnMapping}
      error={hasError}
      editing={isEditing}
      field={field}
      fieldComponents={fieldComponents}
      key={rowIndex}
      item={rowData}
      onCancel={onCancel}
      onDelete={onDelete}
      onDuplicate={onDuplicate}
      onEdit={onEdit}
      onSave={onSave}
      onSortBy={onSortBy}
      readOnlyFields={readOnlyFields}
      rowIndex={rowIndex}
      visibleFields={visibleFields}
      widths={columnWidths}
      {...rowProps}
    />
  );
};

// TODO: add to defaultProps and propTypes: actionProps, additionalFields, actionSuppression, columnMapping, columnWidths, fieldComponents, readOnlyFields, rowProps

VariableFieldRow.defaultProps = {
  field: 'items',
  hasError: false,
  isEditing: false,
};

VariableFieldRow.propTypes = {
  cells: PropTypes.arrayOf(PropTypes.element),
  hasError: PropTypes.bool,
  isEditing: PropTypes.bool,
  field: PropTypes.string,
  onCancel: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onDuplicate: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onSortBy: PropTypes.func.isRequired,
  readOnlyFields: PropTypes.arrayOf(PropTypes.string),
  rowIndex: PropTypes.number.isRequired,
  rowProps: PropTypes.object,
  visibleFields: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default VariableFieldRow;
