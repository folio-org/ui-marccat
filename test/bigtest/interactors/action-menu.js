import {
    interactor,
    property,
    clickable,
    isPresent,
    count
} from '@bigtest/interactor';

const ActionButtonInteractor = interactor(class ButtonInteractor {
  clickThrough = clickable();
});

@interactor class HeaderDropdown {
  click = clickable('button');
}

@interactor class HeaderDropdownMenu {
  isNewButtonPresent = isPresent('#clickable-dropdown-new-record')
  clickNew = clickable('#clickable-dropdown-new-record');
}

export default interactor(class ActionMenuInteractor {
  static defaultScope = '#ModuleContainer';
  buttonAction = new ActionButtonInteractor('[data-test-action-button]');
  historyActionMenu = new ActionButtonInteractor('[data-test-history-search]');
  historyClearButton = new ActionButtonInteractor('[data-test-clear-history]');
  newRecordButton = new ActionButtonInteractor('[data-test-clear-history]');
  historyResultCount = count('[data-row-index]');
  buttonNewBibRecord = isPresent('[data-test-new-record-button]');
  newBibRecDisabled = property('[data-test-new-record-button]', 'disabled');
  associatedBrowseActionMenuSection = isPresent('#data-test-browse-action-menu');
  associatedButtonNew = property('[data-test-browse-new-button]', 'disabled');

  segmentButtonBib = new ActionButtonInteractor('[data-test-btn-segment-bib]');
  segmentButtonAuth = new ActionButtonInteractor('[data-test-btn-segment-auth]');
  headerDropdown = new HeaderDropdown('#paneHeaderdata-test-search-result-pane [data-pane-header-actions-dropdown]');
  headerDropdownMenu = new HeaderDropdownMenu();
  isCancelInstanceEdition = isPresent('#cancel-instance-edition');

});
