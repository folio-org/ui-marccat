import { beforeEach, describe, it } from '@bigtest/mocha';
import { expect } from 'chai';

import setupApplication from '../helpers/setup-application';
import SearchInteractor from '../interactors/search';

describe('Search', () => {
  setupApplication();
  const searchInteractor = new SearchInteractor();

  beforeEach(function () {
    this.server.create('fromTemplate');
    this.server.createList('mergedSearch', 1);

    return this.visit('/marccat/search', () => {
      expect(searchInteractor.$root).to.exist;
    });
  });

  describe('fill search field', function () {
    beforeEach(async function () {
      await searchInteractor.selectIndexes.selectOption('Title');
      await searchInteractor.selectCondition.selectOption('Contains');
      await searchInteractor.searchTextArea.fillAndSubmit('test');
    });

    it('returns at least one search result', () => {
      expect(searchInteractor.countResults).to.be.greaterThan(1);
    });
  });

  describe('open detail result panel', function () {
    beforeEach(async function () {
      await searchInteractor.itemRowClick.rowClick();
    });

    it('returns detail result panel open', () => {
      expect(searchInteractor.detailPanel.isPresentDetailPanel).to.be.true;
    });
  });
});
