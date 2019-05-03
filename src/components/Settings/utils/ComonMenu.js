// @flow
import * as React from 'react';
import { Icon } from '@folio/stripes/components';
import { ToolbarButtonMenu } from '../../../shared';


const rightMenu = ({ ...props }) => {
  const { translate } = props;
  return (
    <ToolbarButtonMenu
      {...props}
      label={
        <Icon icon="edit">
          {translate({
            id: 'ui-marccat.search.record.edit' })}
        </Icon>
      }
    />);
};


export default rightMenu;
