/**
 * @format
 * @flow
 */
import React from 'react';
import { Button, Icon } from '@folio/stripes/components';
import { FormattedMessage } from 'react-intl';
import style from '../../Style/Dropdown.css';
import { CheckboxIconButton } from '../Button/OptionButton';


export const ActionMenu = () => {
  const labels = ['id. Number', 'Title', 'Name', 'Uniform Title'];
  return (
    <React.Fragment>
      <div className={style.dropdownContainerText}>
        <div><FormattedMessage id="ui-marccat.browse.actionmenu.export.mrc" /></div>
        <div><FormattedMessage id="ui-marccat.browse.actionmenu.export.csv" /></div>
        <div><FormattedMessage id="ui-marccat.browse.actionmenu.export.dat" /></div>
        <div><FormattedMessage id="ui-marccat.browse.actionmenu.printall" /></div>
        <hr />
        <CheckboxIconButton labels={labels} />
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
