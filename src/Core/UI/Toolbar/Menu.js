import React from 'react';
import PropTypes from 'prop-types';
import { Row } from '@folio/stripes-components/lib/LayoutGrid';
import PaneMenu from '@folio/stripes-components/lib/PaneMenu';
import IconButton from '@folio/stripes-components/lib/IconButton';
import Button from '@folio/stripes-components/lib/Button';
import IfPermission from '@folio/stripes-components/lib/IfPermission';
import classNames from 'classnames';
import { PrinterProvider } from '../../';


export const ToolbarMenu = (props) => {
  const { icon, onClick, content, withPrinter, className } = props;
  return (
    <PaneMenu>
      {withPrinter &&
      <PrinterProvider
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

export const ToolbarButtonMenu = (props) => {
  const { create, className, onClick } = props;
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
            marginBottom0
          >{formatMessage({ id: 'ui-marccat.button.new' })}
          </Button>
        </IfPermission>
        }
      </Row>
    </PaneMenu>
  );
};

ToolbarMenu.propTypes = {
  icon: PropTypes.array.isRequired,
  content: PropTypes.node,
  className: PropTypes.string,
  withPrinter: PropTypes.bool,
  onClick: PropTypes.func
};

ToolbarButtonMenu.propTypes = {
  create: PropTypes.bool,
  className: PropTypes.string,
  onClick: PropTypes.func,
  stripes: PropTypes.shape({
    connect: PropTypes.func.isRequired,
    intl: PropTypes.object.isRequired,
  })
};

