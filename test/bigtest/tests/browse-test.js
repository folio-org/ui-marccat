import { beforeEach, describe, it } from '@bigtest/mocha';
import { expect } from 'chai';

import setupApplication from '../helpers/setup-application';
import SearchInteractor from '../interactors/search';
import BrowseInteractor from '../interactors/browse';

describe('Browse', () => {
  setupApplication();
  const searchInteractor = new SearchInteractor();
  const browseInteractor = new BrowseInteractor();

  beforeEach(function () {
    this.server.create('fromTemplate');
    this.server.create('browseSearch');

    return this.visit('/marccat/search', () => {
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

  describe('should test browse filters', () => {
    beforeEach(async function () {
      await searchInteractor.selectCondition.selectOption('Browse');
    });

    it('should disable all filter', () => {
      expect(searchInteractor.filtersContainerPresent).to.be.false;
    });
  });

  // THIS TEST NOT WORKS YET: " Cannot read property 'query' of undefined" - how do i get the row to click inside the MCL stripes???
  // describe('fill browse field and click on item in MCL for browse details', function () {
  //   beforeEach(async function () {
  //     await searchInteractor.selectIndexes.selectOption('Title');
  //     await searchInteractor.selectCondition.selectOption('Browse');
  //     await searchInteractor.searchTextArea.fillAndSubmit('test');
  //       await searchInteractor.itemRowClick.click();
  //   });

  //   it('returns browse details panel', () => {
  //       expect(browseInteractor.browseDetailPanel).to.be.true;
  //   });
  // });

});
