import React from 'react';
import PropTypes from 'prop-types';
import VariableFieldRow from './VariableFieldRow';

const createVariableFieldRowFormatter = ({
  onCancel,
  onDelete,
  onDuplicate,
  onEdit,
  onSave,
  onSortBy,
  readOnlyFields,
  status,
  visibleFields,
  ...passThroughProps
}) => {
  const VariableFieldRowFormatter = ({
    cells,
    columnWidths,
    fields,
    rowData,
    rowIndex,
    rowProps,
  }) => {
    const { editing: isEditing, error: hasError } = status[rowIndex];
    const onCancelInternal = () => onCancel(fields, rowIndex);
    const onDeleteInternal = () => onDelete(fields, rowIndex);
    const onDuplicateInternal = () => onDuplicate(fields, rowIndex);
    const onEditInternal = () => onEdit(rowIndex);
    const onSaveInternal = () => onSave(fields, rowIndex);
    const onSortByInternal = () => onSortBy(fields);
    return (
      <VariableFieldRow
        cells={cells}
        columnWidths={columnWidths}
        fields={fields}
        hasError={hasError}
        isEditing={isEditing}
        onCancel={onCancelInternal}
        onDelete={onDeleteInternal}
        onDuplicate={onDuplicateInternal}
        onEdit={onEditInternal}
        onSave={onSaveInternal}
        onSortBy={onSortByInternal}
        readOnlyFields={readOnlyFields}
        rowData={rowData}
        rowIndex={rowIndex}
        rowProps={rowProps}
        visibleFields={visibleFields}
        {...passThroughProps}
      />
    );
  };

  // TODO: add to propTypes: columnWidths, fields, rowData

  VariableFieldRowFormatter.propTypes = {
    cells: PropTypes.arrayOf(PropTypes.element),
    rowIndex: PropTypes.number.isRequired,
    rowProps: PropTypes.object,
  };
};

// TODO: add to propTypes: visibleFields

createVariableFieldRowFormatter.propTypes = {
  status: PropTypes.arrayOf(
    PropTypes.shape({
      editing: PropTypes.bool,
      error: PropTypes.bool,
    }).isRequired
  ),
};

export default createVariableFieldRowFormatter;
