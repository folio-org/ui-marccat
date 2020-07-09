import {
  fillable,
  interactor,
  text,
  property,
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

  fillAndBlur(val) {
    return this.fill(val)
      .blur();
  }
});

// https://bigtestjs.io/guides/interactors/introduction/
export default interactor(class SearchInteractor {
  static defaultScope = '#ModuleContainer';
  selectIndexes = new SelectInteractor('#selectIndexes');
  selectCondition = new SelectInteractor('#selectCondition');
  searchTextArea = new SearchFieldInteractor('#searchTextArea');
});
