import React from 'react';
import { FormattedMessage } from 'react-intl';

export function actionMenuItem(id: string, onClick: () => void) {
  return [
    {
      label: <FormattedMessage id={id} />,
      onClick
    }
  ];
}

export const empty = {};
