import {
  count,
  fillable,
  interactor,
  selectable
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

// https://bigtestjs.io/guides/interactors/introduction/
export default interactor(class SearchInteractor {
  static defaultScope = '#ModuleContainer';
  selectIndexes = new SelectInteractor('#selectIndexes');
  selectCondition = new SelectInteractor('#selectCondition');
  searchTextArea = new SearchFieldInteractor('#searchTextArea');
  countResults = count('[data-row-index]');
});
