import {
  count,
  fillable,
  interactor,
  selectable,
  clickable,
  isPresent
} from '@bigtest/interactor';

const SelectInteractor = interactor(class SelectInteractor {
  selectOption = selectable();

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

const RowClickInteractor = interactor(class RowClickInteractor {
  rowClick = clickable();
});

const DetailPanelInteractor = interactor(class DetailPanelInteractor {
  isPresentDetailPanel = isPresent();
})

// https://bigtestjs.io/guides/interactors/introduction/
export default interactor(class SearchInteractor {
  static defaultScope = '#ModuleContainer';
  selectIndexes = new SelectInteractor('[data-test-select-indexes]');
  selectCondition = new SelectInteractor('[data-test-select-condition]');
  searchTextArea = new SearchFieldInteractor('[data-test-search-text-area]');
  countResults = count('[data-row-index]');
  itemRowClick = new RowClickInteractor('[data-test-search-results-table]')
  detailPanel = new DetailPanelInteractor('[data-test-detail-panel]')
});
