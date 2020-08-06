import { beforeEach, describe, it } from '@bigtest/mocha';
import { expect } from 'chai';

import setupApplication from '../helpers/setup-application';
import SearchInteractor from '../interactors/search';

describe('Browse', () => {
  setupApplication();
  const searchInteractor = new SearchInteractor();

  beforeEach(function () {
    this.server.create('fromTemplate', 1);
    this.server.createList('browseSearch', 1);

    return this.visit('/marccat/browse', () => {
      expect(searchInteractor.$root).to.exist;
    });
  });

  describe('fill browse field', function () {
    beforeEach(async function () {
        await searchInteractor.selectIndexes.selectOption('Title');
        await searchInteractor.selectCondition.selectOption('Browse');
        await searchInteractor.searchTextArea.fillAndSubmit('test');
    });

    it('returns browse result', () => {
        expect(searchInteractor.countResults).to.be.greaterThan(1);
    });
  });
});
