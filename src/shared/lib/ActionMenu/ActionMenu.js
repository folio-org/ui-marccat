// @flow
import React, { Fragment } from 'react';
import { Button, Icon, MenuSection } from '@folio/stripes/components';
import { FormattedMessage } from 'react-intl';
import CheckboxIconButton from '../Button/OptionButton';
import style from '../Style/Dropdown.css';

export const generateDropdownMenu = (labels, withButton) => {
  return (
    <Fragment>
      {!withButton ?
        (
          <div className={style.dropdownContainerText}>
            {labels.map((l, i) => (
              <div key={i}><FormattedMessage id={l} /></div>
            ))}
          </div>)
        :
        (
          <Button buttonStyle="dropdownItem" onClick={() => {}}>
            <div className={style.dropdownContainerText}>
              {labels.map((l, i) => (
                <div key={i}><FormattedMessage id={l} /></div>
              ))}
            </div>
          </Button>
        )
      }
    </Fragment>
  );
};

export const getActionMenu = (onClick) => (
  <Fragment>
    <Button buttonStyle="dropdownItem" onClick={onClick()}>
      <Icon icon="document">
        <FormattedMessage id="ui-marccat.template.actionmenu.new" />
      </Icon>
    </Button>
  </Fragment>
);
