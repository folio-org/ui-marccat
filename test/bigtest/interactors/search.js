import {
  count,
  fillable,
  interactor,
  selectable,
  clickable,
  isPresent,
  isVisible
} from '@bigtest/interactor';

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

const RowClickInteractor = interactor(class RowClickInteractor {
  clickThrough = clickable();
});

// https://bigtestjs.io/guides/interactors/introduction/
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
  itemRowClick = new RowClickInteractor('[data-row-index]')
  detailPanel = isVisible('[data-test-detail-search]')
});
