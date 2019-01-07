import {
  interactor,
  isPresent
} from '@bigtest/interactor';

export default interactor(class MarccatInteractor {
    hasCreateRecordButton = isPresent('[data-test-clickable-new-record]');
});
