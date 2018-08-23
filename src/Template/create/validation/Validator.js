import React from 'react';
import { FormattedMessage } from 'react-intl';

export const validate = (values) => {
  const errors = {};

  if (!values.templateName) {
    errors.templateName = <FormattedMessage id="ui-marccat.validation.error.template.name.required" />;
  }
  return errors;
};
export function asyncValidate(values, dispatch, props, blurredField) {
  if (blurredField === 'templateName') {
    return new Promise((resolve, reject) => {
      if (values.templateName === '') {
        const error = <FormattedMessage id="ui-marccat.validation.error.template.name.required" />;
        reject(error);
      } else {
        resolve();
      }
    });
  }
  return new Promise(resolve => resolve());
}
