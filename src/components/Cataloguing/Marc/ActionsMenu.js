/* eslint-disable no-alert */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/**
 * @format
 * @flow
 */
import React from 'react';
import {
  Dropdown,
  DropdownMenu,
  Button,
  Icon
} from '@folio/stripes/components';
import type { Props } from '../../../core';
import { Localize } from '../../../shared/Function';
import style from '../../../lib/Style/Dropdown.css';

type P = Props & {
  onToggle(): void,
  open: boolean
}

export default class ActionsMenu extends React.Component<P, {}> {
  constructor() {
    super();
    this.state = {
      dropdownOpen: false,
    };

    this.onToggle = this.onToggle.bind(this);
    this.addFieldBelow = this.addFieldBelow.bind(this);
    this.addFieldAbove = this.addFieldAbove.bind(this);
    this.copy = this.copy.bind(this);
    this.paste = this.paste.bind(this);
    this.cut = this.cut.bind(this);
    this.moveFieldsUp = this.moveFieldsUp.bind(this);
    this.moveFieldsDown = this.moveFieldsDown.bind(this);
    this.clearFields = this.clearFields.bind(this);
    this.deleteFields = this.deleteFields.bind(this);
    this.duplicatFields = this.duplicatFields.bind(this);
    this.undo = this.undo.bind(this);
    this.redo = this.redo.bind(this);
    this.lookup = this.lookup.bind(this);
    this.viewMarkDocs = this.viewMarkDocs.bind(this);
    this.sortByTgNumber = this.sortByTgNumber.bind(this);
  }

  onToggle() {
    const { dropdownOpen } = this.state;
    const isOpen = dropdownOpen;
    this.setState({
      dropdownOpen: !isOpen,
    });
  }

  addFieldBelow(item) {
    // eslint-disable-next-line react/destructuring-assignment
    this.props.onAdd(item);
  }

  addFieldAbove() { alert('addFieldAbove'); }
  copy() { alert('copy'); }
  paste() { alert('paste'); }
  cut() { alert('cut'); }
  moveFieldsUp() { alert('moveFieldsUp'); }
  moveFieldsDown() { alert('moveFieldsDown'); }
  clearFields() { alert('clearFields'); }
  deleteFields() { alert('deleteFields'); }
  duplicatFields() { alert('duplicatFields'); }
  redo() { alert('redo'); }
  undo() { alert('undo'); }
  lookup() { alert('lookup'); }
  viewMarkDocs() { alert('viewMarkDocs'); }
  sortByTgNumber() { alert('sortByTgNumber'); }

  renderDropdownLabels = () => {
    return [{
      label: Localize({ key: 'cataloging.actions.add.field.below' }),
      shortcut: Localize({ key: 'cataloging.actions.add.field.below.shortcut' }),
      onClick: this.addFieldBelow,
    },
    {
      label: Localize({ key: 'cataloging.actions.add.field.above' }),
      shortcut: Localize({ key: 'cataloging.actions.add.field.above.shortcut' }),
      onClick: this.addFieldBelow,
    },
    {
      label: Localize({ key: 'cataloging.actions.copy' }),
      shortcut: Localize({ key: 'cataloging.actions.copy.shortcut' }),
      onClick: this.copy,
    },
    {
      label: Localize({ key: 'cataloging.actions.paste' }),
      shortcut: Localize({ key: 'cataloging.actions.paste.shortcut' }),
      onClick: this.paste,
    },
    {
      label: Localize({ key: 'cataloging.actions.cut' }),
      shortcut: Localize({ key: 'cataloging.actions.cut.shortcut' }),
      onClick: this.cut,
    },
    {
      label: Localize({ key: 'cataloging.actions.move.fields.up' }),
      shortcut: Localize({ key: 'cataloging.actions.move.fields.up.shortcut' }),
      onClick: this.moveFieldsUp,
    },
    {
      label: Localize({ key: 'cataloging.actions.move.fields.down' }),
      shortcut: Localize({ key: 'cataloging.actions.move.fields.down.shortcut' }),
      onClick: this.moveFieldsDown,
    },
    {
      label: Localize({ key: 'cataloging.actions.clear.fields' }),
      shortcut: Localize({ key: 'cataloging.actions.clear.fields.shortcut' }),
      onClick: this.clearFields,
    },
    {
      label: Localize({ key: 'cataloging.actions.delete.fields' }),
      shortcut: Localize({ key: 'cataloging.actions.delete.fields.shortcut' }),
      onClick: this.deleteFields,
    },
    {
      label: Localize({ key: 'cataloging.actions.duplicate.fields' }),
      shortcut: Localize({ key: 'cataloging.actions.duplicate.field.shortcut' }),
      onClick: this.duplicatFields,
    },
    {
      label: Localize({ key: 'cataloging.actions.sort.by.tag.number' }),
      shortcut: Localize({ key: 'cataloging.actions.sort.by.tag.number.shortcut' }),
      onClick: this.sortByTgNumber,
    },
    {
      label: Localize({ key: 'cataloging.actions.undo' }),
      shortcut: Localize({ key: 'cataloging.actions.undo.shortcut' }),
      onClick: this.undo,
    },
    {
      label: Localize({ key: 'cataloging.actions.redo' }),
      shortcut: Localize({ key: 'cataloging.actions.redo.shortcut' }),
      onClick: this.redo,
    },
    {
      label: Localize({ key: 'cataloging.actions.lookup' }),
      shortcut: Localize({ key: 'cataloging.actions.lookup.shortcut' }),
      onClick: this.lookup,
    },
    {
      label: Localize({ key: 'cataloging.actions.view.marc.docs' }),
      shortcut: Localize({ key: 'cataloging.actions.view.marc.docs.shortcut' }),
      onClick: this.viewMarkDocs,
    }
    ];
  };

  renderDropdDownMenu = () => {
    const labels = this.renderDropdownLabels();
    return (
      <React.Fragment>
        <div className={style.dropdownContainer}>
          {labels.map((l, i) => (
            <div className={style.dropdownShortcutVariable} key={i} onClick={l.onClick}>
              {l.label}
              <span className="bold light">{l.shortcut}</span>
            </div>
          ))}
        </div>
      </React.Fragment>
    );
  };

  render() {
    const { dropdownOpen } = this.state;
    return (
      <Dropdown
        open={this.state ? dropdownOpen : false}
        onToggle={this.onToggle}
      >
        <Button
          data-role="toggle"
          aria-haspopup="true"
        >
          Actions
          <Icon
            icon="caret-down"
            size="small"
            iconClassName="myClass"
          />
        </Button>
        <DropdownMenu
          data-role="menu"
          aria-label="available permissions"
          onToggle={this.onToggle}
        >
          {this.renderDropdDownMenu()}
        </DropdownMenu>
      </Dropdown>
    );
  }
}
