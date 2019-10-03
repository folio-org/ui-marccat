// @flow
import React, { Fragment } from 'react';
import { Button, Icon } from '@folio/stripes/components';
import { FormattedMessage } from 'react-intl';
import CheckboxIconButton from '../Button/OptionButton';
import style from '../Style/Dropdown.css';


export const ActionMenu = () => {
  const labels = [
    'resultView-View',
    '001-id Number',
    '245-Title',
    'name-Name',
    'preferredTitle-Preferred Title',
    'tagHighlighted-Tag',
    'date1-Date 1',
    'date2-Date 2',
    'format-Format',
  ];
  return (
    <Fragment>
      <div className={style.dropdownContainerText}>
        <div><FormattedMessage id="ui-marccat.browse.actionmenu.export.mrc" /></div>
        <div><FormattedMessage id="ui-marccat.browse.actionmenu.export.csv" /></div>
        <div><FormattedMessage id="ui-marccat.browse.actionmenu.export.dat" /></div>
        <div><FormattedMessage id="ui-marccat.browse.actionmenu.printall" /></div>
        <hr />
        <CheckboxIconButton labels={labels} />
      </div>
    </Fragment>
  );
};

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
