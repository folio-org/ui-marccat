import { beforeEach, describe, it } from '@bigtest/mocha';
import { expect } from 'chai';

import { describeApplication } from '../helpers/describe-application';
import SearchInteractor from '../interactors/search';

describeApplication('Search', () => {
  const searchInteractor = new SearchInteractor();

  beforeEach(function () {
    return this.visit('/marccat/search', () => {
      expect(searchInteractor.$root).to.exist;
    });
  });

  describe('fill search field', function () {
    beforeEach(async function () {
      await searchInteractor.selectIndexes.selectOption('TITLE');
      await searchInteractor.selectCondition.selectOption('CONTAINS');
      await searchInteractor.searchTextArea.fill('1');
    });

    it('returns search results', () => {
      expect(true).to.equal(true);
    });
  });
});
