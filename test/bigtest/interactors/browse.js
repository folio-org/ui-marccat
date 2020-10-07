import {
    interactor,
    isVisible
  } from '@bigtest/interactor';
  

  export default interactor(class BrowseInteractor {
    static defaultScope = '#ModuleContainer';
    browseDetailPanel = isVisible('[data-test-browse-item-detail]')
  });
  