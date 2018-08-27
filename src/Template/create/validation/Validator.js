import React from 'react';
import { FormattedMessage } from 'react-intl';

export const validate = (values) => {
  const errors = {};
  if (!values.templateName) {
    errors.templateName = <FormattedMessage id="stripes-core.label.missingRequiredField" />;
  }
  if (!values.marcCategory || values.marcCategory === '1') {
    errors.marcCategory = <FormattedMessage id="ui-marccat.marc.category.validation.required" />;
  }
  if (!values.headingType || values.headingType === '1') {
    errors.headingType = <FormattedMessage id="ui-marccat.heading.type.validation.required" />;
  }
  return errors;
};
export function asyncValidate(values, dispatch, props, blurredField) {
  if (blurredField === 'templateName') {
    return new Promise((resolve, reject) => {
      if (values.templateName === '') {
        const error = <FormattedMessage id="stripes-core.label.missingRequiredField" />;
        reject(error);
      } else {
        resolve();
      }
    });
  }
  return new Promise(resolve => resolve());
}
