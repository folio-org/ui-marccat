/* eslint-disable react/no-unused-prop-types */
import * as React from 'react';
import { Row } from '@folio/stripes-components/lib/LayoutGrid';
import PaneMenu from '@folio/stripes-components/lib/PaneMenu';
import IconButton from '@folio/stripes-components/lib/IconButton';
import Button from '@folio/stripes-components/lib/Button';
import IfPermission from '@folio/stripes-components/lib/IfPermission';
import classNames from 'classnames';
import { Printer } from '..';

type ToolbarMenuProps = {
  icon: Array,
  content: React.node,
  className?: string,
  withPrinter?: bool,
  onClick: () => void;
  type?: string;
  create: bool;
  disabled?: bool;
  label?: string;
  stripes: Object;
};

export const ToolbarMenu = (props: ToolbarMenuProps) => {
  const { icon, onClick, content, withPrinter, className } = props;
  return (
    <PaneMenu>
      {withPrinter &&
      <Printer
        trigger={() => <IconButton key={`icon-${icon[0]}`} icon={icon[0]} className={classNames(className)} />}
        content={content}
      />}
      {!withPrinter &&
        icon.map((i) => {
          return (
            <IconButton key={`icon-${i}`} icon={i} onClick={onClick} className={classNames(className)} />
          );
        })
      }
    </PaneMenu>
  );
};

export const ToolbarButtonMenu = (props: ToolbarMenuProps) => {
  const { create, className, onClick, label, type, disabled } = props;
  const { formatMessage } = props.stripes.intl;
  return (
    <PaneMenu>
      <Row>
        {create &&
        <IfPermission perm="perms.permissions.template.create">
          <Button
            buttonClass={classNames(className)}
            id="create-new-template"
            buttonStyle="primary"
            onClick={onClick}
            type={type || 'button'}
            disabled={disabled}
            marginBottom0
          >{formatMessage({ id: label })}
          </Button>
        </IfPermission>
        }
      </Row>
    </PaneMenu>
  );
};

