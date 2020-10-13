import { beforeEach, describe, it } from '@bigtest/mocha';
import { expect } from 'chai';

import setupApplication from '../helpers/setup-application';
import ActionMenuInteractor from '../interactors/action-menu';
import SearchInteractor from '../interactors/search';
import BrowseInteractor from '../interactors/browse';

describe('ActionMenu', () => {
  setupApplication();
  const actionMenuInteractor = new ActionMenuInteractor();
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
      expect(actionMenuInteractor.$root).to.exist;
    });
  });

  describe('should test action buttton', () => {
    beforeEach(async function () {
      await actionMenuInteractor.buttonAction.click();
    });

    it('show create new bib record avaiable', () => {
      expect(actionMenuInteractor.buttonNewBibRecord).to.be.true;
    });

  });

  describe('click on Action and show aviable button for New Bib Record', function () {
    beforeEach(async function () {
      await actionMenuInteractor.buttonAction.click();
    });

    it('return button New NOT disabled ', () => {
      expect(actionMenuInteractor.newBibRecDisabled).to.be.false;
    });

    describe('click on new record button', function () {
      beforeEach(async function () {
        await actionMenuInteractor.newRecordButton.click();
      });

      it('new button clicked ', () => {
        expect(actionMenuInteractor.newBibRecDisabled).to.be.false;
      });

    });

  });

  describe('click on Action Menu on left panel for history search results', function () {
    beforeEach(async function () {
      await actionMenuInteractor.historyActionMenu.click();
    });

    it('no results come back because no research has been done yet', () => {
      expect(actionMenuInteractor.historyResultCount).to.be.equal(0);
    });
  });

  describe('fill search field and click on Action Menu on left panel for history search results', function () {
    beforeEach(async function () {
      await searchInteractor.selectIndexes.selectOption('Title');
      await searchInteractor.selectCondition.selectOption('Contains');
      await searchInteractor.searchTextArea.fillAndSubmit('test');
      await actionMenuInteractor.historyActionMenu.click();
    });

    it('returns at least one search result in the history MCL', () => {
      expect(actionMenuInteractor.historyResultCount).to.be.greaterThan(0);
    });

  });

  describe('fill search and browse, then click on Action Menu on left panel for history search results', function () {
    beforeEach(async function () {
      await searchInteractor.selectIndexes.selectOption('Title');
      await searchInteractor.selectCondition.selectOption('Contains');
      await searchInteractor.searchTextArea.fillAndSubmit('test');
      await searchInteractor.selectIndexes.selectOption('Title');
      await searchInteractor.selectCondition.selectOption('Browse');
      await searchInteractor.searchTextArea.fillAndSubmit('test');
      await actionMenuInteractor.historyActionMenu.click();

    });

    it('returns the results of search and browse search in history panel', () => {
      expect(actionMenuInteractor.historyResultCount).to.be.equal(2);
    });

  });

  describe('click on Action Menu on left panel for history search results and then click clear button', function () {
    beforeEach(async function () {
      await actionMenuInteractor.historyActionMenu.click();
      await actionMenuInteractor.historyClearButton.click();
    });

    it('returns the results and after clicking on clear history there will be no result', () => {
      expect(actionMenuInteractor.historyResultCount).to.be.equal(0);
    });

  });

  describe('perform browse search, click on item and open actionMenu inside associated results panel', function () {
    beforeEach(async function () {
      await searchInteractor.selectIndexes.selectOption('Title');
      await searchInteractor.selectCondition.selectOption('Browse');
      await searchInteractor.searchTextArea.fillAndSubmit('test');
      await browseInteractor.itemRowClick.click();
    });

    it('action menu is present inside associated records panel', () => {
      expect(actionMenuInteractor.associatedBrowseActionMenuSection).to.be.true;
    });

    it('in a browse search you can only create new record inside detail panel', () => {
      expect(actionMenuInteractor.associatedButtonNew).to.be.false;
    });

  });


});
