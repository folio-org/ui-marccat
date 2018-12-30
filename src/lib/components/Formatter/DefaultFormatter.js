import React from 'react';
import { Link } from 'react-router-dom';

export type P = {
    cells: Array<Element>;
    labelStrings: Array<string>;
    rowClass: string;
    rowIndex: number;
    rowProps: Object;
    rowWidth: number;
}

function defaultRowFormatter({ rowIndex, rowClass, cells, rowProps, labelStrings }:P) {
  let Element = 'div';

  if (rowProps.to) {
    Element = Link;
  }

  if (rowProps.href) {
    Element = 'a';
  }
  if (rowProps.span) {
    Element = 'span';
  }
  if (rowProps.onClick) {
    Element = 'button';
  }

  if (!rowProps.interactive) {
    Element = 'div';
  }

  return (
    <Element
      key={`row-${rowIndex}`}
      className={rowClass}
      aria-label={labelStrings.join('...')}
      role="listitem"
      {...rowProps}
      tabIndex="0"
    >
      {cells}
    </Element>
  );
}

export default defaultRowFormatter;
