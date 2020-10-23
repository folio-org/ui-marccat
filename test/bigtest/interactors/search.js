import {
  count,
  fillable,
  interactor,
  selectable,
  clickable,
  isPresent,
  isVisible,
  Interactor
} from '@bigtest/interactor';
import ButtonInteractor from '@folio/stripes-components/lib/Button/tests/interactor';

const SelectInteractor = interactor(class SelectInteractor {
  selectOption = selectable();
  optionCount = count('option');

  selectAndBlur(val) {
    return this
      .selectOption(val)
      .blur();
  }
});

const SearchFieldInteractor = interactor(class TextFieldInteractor {
  fill = fillable();

  fillAndSubmit(val) {
    return this
      .fill(val)
      .trigger('keydown', { which: 13, key: 'Enter' });
  }
});

const SegmentNavigationInteractor = interactor(class SegmentNavigationInteractor {
  clickThrough = clickable();
});

const SearchButtonInteractor = interactor(class SearchButtonInteractor {
  clickThrough = clickable();
});

const ResetAllButtonInteractor = interactor(class ResetAllButtonInteractor {
  clickThrough = clickable();
});

const SegmentButtonBibInteractor = interactor(class SegmentButtonBibInteractor {
  clickThrough = clickable();
});

const SegmentButtonAuthInteractor = interactor(class SegmentButtonAuthInteractor {
  clickThrough = clickable();
});

const SearchResultsInteractor = interactor(class SearchResultsInteractor {
  rows = count('[data-row-index]');
  clickThrough = clickable('[data-row-inner="0"]');
});

@interactor class HeaderDropdown {
  click = clickable('button');
}

@interactor class HeaderDropdownMenu {
  isDeleteButtonPresent = isPresent('#clickable-dropdown-delete-record')
  clickDelete = clickable('#clickable-dropdown-delete-record');
}

export default interactor(class SearchInteractor {
  static defaultScope = '#ModuleContainer';
  selectIndexes = new SelectInteractor('[data-test-select-indexes]');
  selectCondition = new SelectInteractor('[data-test-select-condition]');
  searchTextArea = new SearchFieldInteractor('[data-test-search-text-area]');
  countResults = count('[data-row-index]');
  segmentAuthorityInteractor = new SegmentNavigationInteractor('#segment-navigation-Authority');
  buttonSearch = new SearchButtonInteractor('[data-test-btn-search]');
  buttonResetAll = new ResetAllButtonInteractor('[data-test-btn-reset-all]');
  filtersContainerPresent = isPresent('[data-test-filters-container]');
  segmentButtonBib = new SegmentButtonBibInteractor('[data-test-btn-segment-bib]');
  segmentButtonAuth = new SegmentButtonAuthInteractor('[data-test-btn-segment-auth]');
  itemRowClick = new Interactor('#data-test-search-results-table [data-row-inner="0"]');

  detailPanelPresent = isPresent('#record-pane-details');
  searchResults = new SearchResultsInteractor('#data-test-search-results-table');
  detailPanel = isVisible('[data-test-detail-search]')
  searchResultItem = new Interactor('#data-test-search-results-table [data-row-inner="0"]');
  headerDropdown = new HeaderDropdown('#paneHeaderdata-test-search-detail-pane [data-pane-header-actions-dropdown]');
  headerDropdownMenu = new HeaderDropdownMenu();
  confirmDeleteModalPresent = isPresent('#record-detail-delete-confirmation-modal');
  recordDetailConfirmButton = new ButtonInteractor('[data-test-confirmation-modal-confirm-button]');
  recordDetailCancelButton = new ButtonInteractor('[data-test-confirmation-modal-cancel-button]');
});
