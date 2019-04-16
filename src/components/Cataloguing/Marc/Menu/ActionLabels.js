/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { MenuItem } from '@folio/stripes/components';
import { Localize } from '../../../../utils/Function';
import style from '../../../../shared/lib/Style/Dropdown.css';

export default ({ ...props }) => {
  const getLabels = () => {
    return [{
      label: Localize({ key: 'cataloging.actions.add.field.below' }),
      shortcut: Localize({ key: 'cataloging.actions.add.field.below.shortcut' }),
      onClick: props.onAdd,
    },
    {
      label: Localize({ key: 'cataloging.actions.add.field.above' }),
      shortcut: Localize({ key: 'cataloging.actions.add.field.above.shortcut' }),
      onClick: props.onAdd,
    },
    {
      label: Localize({ key: 'cataloging.actions.copy' }),
      shortcut: Localize({ key: 'cataloging.actions.copy.shortcut' }),
      onClick: () => {},
    },
    {
      label: Localize({ key: 'cataloging.actions.paste' }),
      shortcut: Localize({ key: 'cataloging.actions.paste.shortcut' }),
      onClick: () => {},
    },
    {
      label: Localize({ key: 'cataloging.actions.cut' }),
      shortcut: Localize({ key: 'cataloging.actions.cut.shortcut' }),
      onClick: () => {},
    },
    {
      label: Localize({ key: 'cataloging.actions.move.fields.up' }),
      shortcut: Localize({ key: 'cataloging.actions.move.fields.up.shortcut' }),
      onClick: () => {},
    },
    {
      label: Localize({ key: 'cataloging.actions.move.fields.down' }),
      shortcut: Localize({ key: 'cataloging.actions.move.fields.down.shortcut' }),
      onClick: () => {},
    },
    {
      label: Localize({ key: 'cataloging.actions.sort.by.tag.number' }),
      shortcut: Localize({ key: 'cataloging.actions.sort.by.tag.number.shortcut' }),
      onClick: props.onSortBy,
    },
    {
      label: Localize({ key: 'cataloging.actions.clear.fields' }),
      shortcut: Localize({ key: 'cataloging.actions.clear.fields.shortcut' }),
      onClick: props.onCancel,
    },
    {
      label: Localize({ key: 'cataloging.actions.delete.fields' }),
      shortcut: Localize({ key: 'cataloging.actions.delete.fields.shortcut' }),
      onClick: props.onDelete,
    },
    {
      label: Localize({ key: 'cataloging.actions.duplicate.fields' }),
      shortcut: Localize({ key: 'cataloging.actions.duplicate.field.shortcut' }),
      onClick: props.onDuplicate,
    },
    {
      label: Localize({ key: 'cataloging.actions.undo' }),
      shortcut: Localize({ key: 'cataloging.actions.undo.shortcut' }),
      onClick: () => {},
    },
    {
      label: Localize({ key: 'cataloging.actions.redo' }),
      shortcut: Localize({ key: 'cataloging.actions.redo.shortcut' }),
      onClick: () => {},
    },
    {
      label: Localize({ key: 'cataloging.actions.lookup' }),
      shortcut: Localize({ key: 'cataloging.actions.lookup.shortcut' }),
      onClick: () => {},
    },
    {
      label: Localize({ key: 'cataloging.actions.view.marc.docs' }),
      shortcut: Localize({ key: 'cataloging.actions.view.marc.docs.shortcut' }),
      onClick: () => {},
    }
    ];
  };

  const renderDropdDownMenu = (labels) => (
    <React.Fragment>
      {labels.map((l, i) => (
        <MenuItem itemMeta={{ metaData: l }} onSelectItem={l.onClick} key={i}>
          <div className={style.dropdownContainerMenuItem}>
            <div className={style.dropdownShortcutVariable}>
              {l.label}
              <span className="bold light">{l.shortcut}</span>
            </div>
          </div>
        </MenuItem>
      ))}
    </React.Fragment>
  );

  return (renderDropdDownMenu(getLabels()));
};
