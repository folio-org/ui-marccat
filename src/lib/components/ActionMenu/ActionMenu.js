/**
 * @format
 * @flow
 */
import React, { Fragment } from 'react';
import { Button, Icon } from '@folio/stripes/components';
import { FormattedMessage } from 'react-intl';
import style from '../../Style/Dropdown.css';
import CheckboxIconButton from '../Button/OptionButton';


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
        <CheckboxIconButton labels={labels} />
      </div>
    </Fragment>
  );
};

export const ActionMenuDetail = () => {
  return (
    <Fragment>
      <div className={style.dropdownContainerText}>
        <div><FormattedMessage id="ui-marccat.search.actionmenu.export.mrc" /></div>
        <div><FormattedMessage id="ui-marccat.browse.actionmenu.export.csv" /></div>
        <div><FormattedMessage id="ui-marccat.browse.actionmenu.export.dat" /></div>
        <div><FormattedMessage id="ui-marccat.search.actionmenu.print" /></div>
        <div><FormattedMessage id="ui-marccat.search.actionmenu.opac" /></div>
        <div><FormattedMessage id="ui-marccat.search.actionmenu.duplicate" /></div>
        <div><FormattedMessage id="ui-marccat.search.actionmenu.holdings" /></div>
        <div><FormattedMessage id="ui-marccat.search.actionmenu.instances" /></div>
        <div><FormattedMessage id="ui-marccat.search.actionmenu.authority.records" /></div>
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
