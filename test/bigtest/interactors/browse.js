import {
    interactor,
    count,
    isVisible,
    isPresent,
    Interactor
  } from '@bigtest/interactor';


  export default interactor(class BrowseInteractor {
    static defaultScope = '#ModuleContainer';
    countResults = count('#data-test-browse-results [data-row-index]')
    itemRowClick = new Interactor('#data-test-browse-results [data-row-inner="0"]');
    visibleBrowseDetailPanel = isVisible('#data-test-browse-pane-detail');
    presentBrowseDetailPanel = isPresent('#data-test-browse-pane-detail');
    associatedItem = new Interactor('#bib-associated [data-row-inner="0"]');
    visibleAssociatedPaneDetails = isVisible('#associated-pane-details');
    presentAssociatedPaneDetails = isPresent('#associated-pane-details');
  });
