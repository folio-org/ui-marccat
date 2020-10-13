import {
    interactor,
    property,
    clickable,
    isPresent,
    count,
    isVisible
  } from '@bigtest/interactor';

  const ActionButtonInteractor = interactor(class ButtonInteractor {
    clickThrough = clickable();
  });

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
  });
