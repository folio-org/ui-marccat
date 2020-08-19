import {
    interactor,
    property,
    clickable,
    isPresent
  } from '@bigtest/interactor';
  
  const ActionButtonInteractor = interactor(class ButtonInteractor {
    clickThrough = clickable();
  });
  
  export default interactor(class ActionMenuInteractor {
    static defaultScope = '#ModuleContainer';
    buttonAction = new ActionButtonInteractor('[data-test-action-button]');
    buttonNewBibRecord = isPresent('[data-test-new-record-button]')
    newBibRecDisabled = property('[data-test-new-record-button]', 'disabled');
  });
  