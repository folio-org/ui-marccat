import React from 'react';
import { FormattedMessage } from 'react-intl';

export function actionMenuItem(id: string, onClick: () => void) {
  return [
    {
      label: <FormattedMessage id={id[0]} />,
      onClick
    },
    {
      label: <FormattedMessage id={id[1]} />,
      onClick
    }
  ];
}

export const empty = {};
