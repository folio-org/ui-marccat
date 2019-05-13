// @flow strict
import * as React from 'react';
import { Col } from '@folio/stripes/components';

export default function Bracket({ htmlElement, position, isEnable, onClick }) {
  const Element = htmlElement;

  const getClass = () => {
    const clazz = { active: `${position}Bracket`, disabled: `${position}BracketDisabled` };
    return (isEnable) ? clazz.active : clazz.disabled;
  };

  return (
    <Col xs={1}>
      <Element
        className={getClass(position)}
        onClick={onClick}
      />
    </Col>
  );
}
