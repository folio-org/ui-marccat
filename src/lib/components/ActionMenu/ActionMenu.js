/**
 * @format
 * @flow
 */
import React from 'react';
import { Button, Icon } from '@folio/stripes/components';
import { FormattedMessage } from 'react-intl';
import style from '../../Style/Dropdown.css';


export const ActionMenu = () => {
  return (
    <React.Fragment>
      <div className={style.dropdownContainerText}>
        <div><FormattedMessage id="ui-marccat.browse.actionmenu.export.mrc" /></div>
        <div><FormattedMessage id="ui-marccat.browse.actionmenu.export.csv" /></div>
        <div><FormattedMessage id="ui-marccat.browse.actionmenu.export.dat" /></div>
        <div><FormattedMessage id="ui-marccat.browse.actionmenu.printall" /></div>
      </div>
    </React.Fragment>
  );
};

export const getActionMenu = () => (
  <React.Fragment>
    <Button buttonStyle="dropdownItem">
      <Icon icon="document">
        <FormattedMessage id="ui-marccat.template.actionmenu.new" />
      </Icon>
    </Button>
  </React.Fragment>
);
