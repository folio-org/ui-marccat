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

    it('should disable all filter', () => {
      expect(searchInteractor.filtersContainerPresent).to.be.false;
    });
    it('browse result', () => {
      expect(browseInteractor.countResults).to.be.greaterThan(1);
  });

  });

  describe('fill browse field and click on item in MCL for browse details', function () {
    beforeEach(async function () {
      await searchInteractor.selectIndexes.selectOption('Title');
      await searchInteractor.selectCondition.selectOption('Browse');
      await searchInteractor.searchTextArea.fillAndSubmit('test');
      await browseInteractor.itemRowClick.click();
    });

    it('browse details panel is present in DOM', () => {
      expect(browseInteractor.presentBrowseDetailPanel).to.be.true;
    });
    it('browse details panel is visible', () => {
      expect(browseInteractor.visibleBrowseDetailPanel).to.be.true;
    });
    it('associated marc details panel is NOT present in DOM', () => {
      expect(browseInteractor.presentAssociatedPaneDetails).to.be.false;
    });

    it('AccordionSet is visible in detail browse panel', () => {
      expect(browseInteractor.accordSetBrowseVisible).to.be.true;
    });
    it('Accordion No Associated Auth record is visible', () => {
      expect(browseInteractor.accordionNoAssAuthRecVisible).to.be.true;
    });
    it('button create New Auth record is visible', () => {
      expect(browseInteractor.buttonCreateNewAuthFromBrowseVisible).to.be.true;
    });
    it('button create New Auth record is enabled', () => {
      expect(browseInteractor.buttonCreateNewAuthFromBrowseVisible).to.be.true;
    });
    it('Accordion Bib Associated record visible', () => {
      expect(browseInteractor.accordionAssBibRecVisible).to.be.true;
    });
    it('option button visible', () => {
      expect(browseInteractor.buttonOptionVisible).to.be.true;
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

    it('browse details panel is present in DOM  with associated details record panel', () => {
      expect(browseInteractor.presentBrowseDetailPanel).to.be.true;
    });
    it('browse details panel is visible with associated details record panel', () => {
      expect(browseInteractor.visibleBrowseDetailPanel).to.be.true;
    });
    it('associated marc details panel is visible', () => {
      expect(browseInteractor.visibleAssociatedPaneDetails).to.be.true;
    });
    it('associated marc details panel is present in DOM', () => {
      expect(browseInteractor.presentAssociatedPaneDetails).to.be.true;
    });
  });

});
