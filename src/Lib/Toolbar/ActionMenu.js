import * as React from 'react';
import { FormattedMessage } from 'react-intl';

export function actionMenuItem(id: Array<string>, onClick?: [() => void]) {
  return [
    {
      label: <FormattedMessage id={id[0]} />,
      onClick: (onClick) ? onClick[0] : null
    },
    {
      label: <FormattedMessage id={id[1]} />,
      onClick: (onClick) ? onClick[1] : null
    }
  ];
}

export const empty = {};
