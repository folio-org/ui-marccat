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
    this.server.createList('bibSearch', 1);
    this.server.createList('authoritySearch', 1);
    this.server.create('bibRecordDetail');
    this.server.create('verticalDetail');

    return this.visit('/marccat/search', () => {
      expect(searchInteractor.$root).to.exist;
    });
  });

  describe('fill Bib search field and submit with the ENTER key', function () {
    beforeEach(async function () {
      await searchInteractor.segmentButtonBib.click();
      await searchInteractor.selectIndexes.selectOption('Title');
      await searchInteractor.selectCondition.selectOption('Contains');
      await searchInteractor.searchTextArea.fillAndSubmit('test');
    });

    it('returns at least one search result', () => {
      expect(searchInteractor.countResults).to.be.greaterThan(1);
    });
  });

  describe('fill Bib search field and submit with the button', function () {
    beforeEach(async function () {
      await searchInteractor.segmentButtonBib.click();
      await searchInteractor.selectIndexes.selectOption('Title');
      await searchInteractor.selectCondition.selectOption('Contains');
      await searchInteractor.searchTextArea.fill('test');
      await searchInteractor.buttonSearch.click();
    });

    it('returns at least one search result', () => {
      expect(searchInteractor.countResults).to.be.greaterThan(1);
    });
  });

  describe('fill Auth search field and submit with the ENTER key', function () {
    beforeEach(async function () {
      await searchInteractor.segmentButtonAuth.click();
      await searchInteractor.selectIndexes.selectOption('Title');
      await searchInteractor.selectCondition.selectOption('Contains');
      await searchInteractor.searchTextArea.fillAndSubmit('test');
    });

    it('returns at least one search result', () => {
      expect(searchInteractor.countResults).to.be.greaterThan(1);
    });
  });

  describe('fill Auth search field and submit with the button', function () {
    beforeEach(async function () {
      await searchInteractor.segmentButtonAuth.click();
      await searchInteractor.selectIndexes.selectOption('Title');
      await searchInteractor.selectCondition.selectOption('Contains');
      await searchInteractor.searchTextArea.fill('test');
      await searchInteractor.buttonSearch.click();
    });

    it('returns at least one search result', () => {
      expect(searchInteractor.countResults).to.be.greaterThan(1);
    });
  });

  describe('should test authority indexes', () => {
    beforeEach(async function () {
      await searchInteractor.segmentAuthorityInteractor.click();
    });

    it('should find no results', () => {
      expect(searchInteractor.countResults).to.be.equals(0);
    });

    it('should change options of indexes', () => {
      expect(searchInteractor.selectIndexes.optionCount).to.equal(15);
    });

    it('should remove filter', () => {
      expect(searchInteractor.filtersContainerPresent).to.be.false;
    });
  });

  describe('fill search field and click reset all button', () => {
    beforeEach(async function () {
      await searchInteractor.selectIndexes.selectOption('Title');
      await searchInteractor.selectCondition.selectOption('Contains');
      await searchInteractor.searchTextArea.fill('test');
      await searchInteractor.buttonResetAll.click();
    });

    it('search fields should be reset', function () {
      expect(searchInteractor.searchTextArea.value).to.equal('');
    });
  });

  describe('fill Bib search field, select one record', function () {
    beforeEach(async function () {
      await searchInteractor.segmentButtonBib.click();
      await searchInteractor.selectIndexes.selectOption('Title');
      await searchInteractor.selectCondition.selectOption('Contains');
      await searchInteractor.searchTextArea.fill('test');
      await searchInteractor.buttonSearch.click();
      await searchInteractor.searchResultItem.click();
      await searchInteractor.recordDetailButtonDelete.click();
      await searchInteractor.recordDetailConfirmButton.click();
    });

    it('selected first record', () => {
      expect(searchInteractor.searchResultItem.text).to.not.equal('');
    });
  });

  describe('should test bib indexes', () => {
    it('should change options of indexes', () => {
      expect(searchInteractor.selectIndexes.optionCount).to.equal(50);
    });
  });

});
