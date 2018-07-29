import React from 'react';
import PropTypes from 'prop-types';
import PaneMenu from '@folio/stripes-components/lib/PaneMenu';
import IconButton from '@folio/stripes-components/lib/IconButton';
import classNames from 'classnames';
import { PrinterProvider } from '../../';

const ToolbarMenu = (props) => {
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
ToolbarMenu.propTypes = {
  icon: PropTypes.array.isRequired,
  content: PropTypes.node,
  className: PropTypes.string,
  withPrinter: PropTypes.bool,
  onClick: PropTypes.func
};

export default ToolbarMenu;
