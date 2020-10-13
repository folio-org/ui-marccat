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
    this.server.createList('bibSearch', 1);
    this.server.createList('authoritySearch', 1);
    this.server.create('bibRecordDetail');
    this.server.create('verticalDetail');

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
        expect(browseInteractor.countResults).to.be.greaterThan(1);
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

  describe('fill browse field and click on item in MCL for browse details', function () {
    beforeEach(async function () {
      await searchInteractor.selectIndexes.selectOption('Title');
      await searchInteractor.selectCondition.selectOption('Browse');
      await searchInteractor.searchTextArea.fillAndSubmit('test');
      await browseInteractor.itemRowClick.click();
    });

    it('returns browse details panel is present', () => {
      expect(browseInteractor.presentBrowseDetailPanel).to.be.true;
    });
    it('returns browse details panel is visible', () => {
      expect(browseInteractor.presentBrowseDetailPanel).to.be.true;
    });
  });

  describe('fill browse field and click on item in MCL for browse details and then click on associated record for marc details', function () {
    beforeEach(async function () {
      await searchInteractor.selectIndexes.selectOption('Title');
      await searchInteractor.selectCondition.selectOption('Browse');
      await searchInteractor.searchTextArea.fillAndSubmit('test');
      await browseInteractor.itemRowClick.click();
      await browseInteractor.associatedItem.click();
    });

    it('returns browse details panel is visible', () => {
      expect(browseInteractor.visibleAssociatedPaneDetails).to.be.true;
    });
    it('returns browse details panel is present', () => {
      expect(browseInteractor.presentAssociatedPaneDetails).to.be.true;
    });
  });

});
