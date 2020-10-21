import {
    interactor,
    count,
    isVisible,
    isPresent,
    Interactor,
    property
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
    accordSetBrowseVisible = isVisible('#data-test-accordion-set-browse');
    accordionNoAssAuthRecVisible = isVisible('#data-test-accordion-no-associated-auth-rec');
    buttonCreateNewAuthFromBrowseVisible = isVisible('#data-test-button-create-auth-from-browse');
    buttonCreateNewAuthFromBrowseActive = property('#data-test-button-option', 'disabled');
    accordionAssBibRecVisible = isVisible('#data-test-accordion-associated-bib-rec');
    buttonOptionVisible = isVisible('#data-test-button-option');
    accordionAssBibDetailsVisible = isVisible('#data-test-accordion-bib-associated-details');
    accordSetAssociatedBrowseVisible = isVisible('#data-test-accordion-set-associated-details');
  });
