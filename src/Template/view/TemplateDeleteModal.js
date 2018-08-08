import React from 'react';
import ConfirmationModal from '@folio/stripes-components/lib/ConfirmationModal';

export default function TemplateDetailModal({ open, onDelete, hideConfirm, ...props }) {
  const formatMsg = props.stripes.intl.formatMessage;
  const modalHeading = formatMsg({ id: 'ui-marccat.template.delete' });
  const modalMessage = formatMsg({ id: 'ui-marccat.template.delete.modal' });
  const confirmLabel = formatMsg({ id: 'ui-marccat.template.delete.button' });
  return (
    <ConfirmationModal
      open={open}
      heading={modalHeading}
      message={modalMessage}
      onConfirm={onDelete}
      onCancel={hideConfirm}
      confirmLabel={confirmLabel}
    />
  );
}
