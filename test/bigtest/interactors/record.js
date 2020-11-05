import {
  interactor,
  clickable,
  isPresent,
  isVisible,
  selectable,
  Interactor
} from '@bigtest/interactor';
import ButtonInteractor from '@folio/stripes-components/lib/Button/tests/interactor';

const SegmentButtonBibInteractor = interactor(class SegmentButtonBibInteractor {
  clickThrough = clickable();
  isButtonVisible = isVisible();
});

const SegmentButtonAuthInteractor = interactor(class SegmentButtonAuthInteractor {
  clickThrough = clickable();
});

const DismissButtonInteractor = interactor(class DismissButtonInteractor {
  clickThrough = clickable();
  isButtonPresent = isPresent();
});

@interactor class HeaderDropdown {
  click = clickable('button');
}

@interactor class HeaderDropdownMenu {
  isNewButtonPresent = isPresent('#clickable-dropdown-new-record')
  clickNew = clickable('#clickable-dropdown-new-record');
}

@interactor class HeaderDropdownDetail {
  click = clickable('button');
}

@interactor class HeaderDropdownDetailMenu {
  isEditButtonPresent = isPresent('#clickable-dropdown-edit-record')
  clickEdit = clickable('#clickable-dropdown-edit-record');
}

@interactor class Type006Interactor {
  selectVal = selectable('#Tag006');
}

export default interactor(class RecordInteractor {
  static defaultScope = '#ModuleContainer';
  segmentButtonBib = new SegmentButtonBibInteractor('[data-test-btn-segment-bib]');
  segmentButtonAuth = new SegmentButtonAuthInteractor('[data-test-btn-segment-auth]');
  headerDropdown = new HeaderDropdown('#paneHeaderdata-test-search-result-pane [data-pane-header-actions-dropdown]');
  headerDropdownMenu = new HeaderDropdownMenu();
  headerDropdownDetail = new HeaderDropdownDetail('#paneHeaderdata-test-search-detail-pane [data-pane-header-actions-dropdown]');
  headerDropdownDetailMenu = new HeaderDropdownDetailMenu();
  dismissButton = new DismissButtonInteractor('[data-test-pane-header-dismiss-button]');
  leaderButton = new ButtonInteractor('#fieldleaderbtndown');
  leaderButtonPresent = isPresent('#fieldleaderbtndown');
  tag006Button = new ButtonInteractor('#field006btndown');
  tag006ButtonPresent = isPresent('#field006btndown');
  tag007Button = new ButtonInteractor('#field007btndown');
  tag007ButtonPresent = isPresent('#field007btndown');
  tag008Button = new ButtonInteractor('#field008btndown');
  tag008ButtonPresent = isPresent('#field008btndown');
  cancelButton = new ButtonInteractor('#cancel-instance-edition');
  saveButton = new ButtonInteractor('#clickable-save-instance');
  saveButtonPresent = isPresent('#clickable-save-instance');
  selectType006 = selectable('#Tag006');
  selectType006Interactor = new Interactor('#Tag006');
  selectType007 = selectable('#Tag007');
  selectType007Interactor = new Interactor('#Tag007');
  bibSelectType008 = selectable('#Tag008-0-placeOfPublication');
  bibSelectType008Interactor = new Interactor('#Tag008-0-placeOfPublication');
  authSelectType008 = selectable('#Tag008-0-subjectDescriptor');
  authSelectType008Interactor = new Interactor('#Tag008-0-subjectDescriptor');
});
