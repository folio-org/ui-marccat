// @flow
import React, { Fragment } from 'react';
import { Button, Icon } from '@folio/stripes/components';
import { FormattedMessage } from 'react-intl';
import CheckBoxLabelForm from '../Form/CheckBoxLabelForm';
import style from '../Style/Dropdown.css';


export const ActionMenu = () => {
  const labels = [
    'View',
    'id Number',
    'Title',
    'Name',
    'Preferred Title',
    'Tag',
    'Date 1',
    'Date 2',
    'Format'
  ];
  return (
    <Fragment>
      <div className={style.dropdownContainerText}>
        <div><FormattedMessage id="ui-marccat.browse.actionmenu.export.mrc" /></div>
        <div><FormattedMessage id="ui-marccat.browse.actionmenu.export.csv" /></div>
        <div><FormattedMessage id="ui-marccat.browse.actionmenu.export.dat" /></div>
        <div><FormattedMessage id="ui-marccat.browse.actionmenu.printall" /></div>
        <hr />
        <CheckBoxLabelForm labels={labels} />
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
