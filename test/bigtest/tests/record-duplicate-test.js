import { beforeEach, describe, it } from '@bigtest/mocha';
import { expect } from 'chai';

import setupApplication from '../helpers/setup-application';
import RecordInteractor from '../interactors/record';
import SearchInteractor from '../interactors/search';

describe('Record Duplicate', () => {
  
  setupApplication();
  const recordInteractor = new RecordInteractor();
  const searchInteractor = new SearchInteractor();

  beforeEach(function () {
    this.server.create('fromTemplate');
    this.server.create('fromAuthTemplate');
    this.server.createList('mergedSearch', 1);
    this.server.createList('bibSearch', 1);
    this.server.createList('authoritySearch', 1);
    this.server.create('browseSearch');
    this.server.create('bibRecordDetail');
    this.server.create('authRecordDetail');
    this.server.create('verticalDetail');
    this.server.create('headerType');
    this.server.create('header007Type');
    this.server.create('header008Type');
    this.server.create('authHeader008Type');
    this.server.create('fixedFieldsCodeGroup');
    this.server.create('fixedFieldsCode31Group');
    this.server.create('fixedFieldsCodeGroupsByLeader');
    this.server.create('authFixedFieldsCodeGroup');
    this.server.create('authFixedFieldsCode008Group');
    this.server.create('fixedFieldDisplayValue');
    this.server.create('authFixedFieldDisplayValue');
    this.server.create('filterTagsListsValue');
    this.server.create('filterTagValue');
    this.server.create('createHeadingValue');
    this.server.create('createBibRecordValue');
    this.server.create('createAuthRecordValue');
    this.server.create('duplicateBibRecordValue');

    return this.visit('/marccat/search', () => {
      expect(recordInteractor.$root).to.exist;
    });
  });

  describe('In filter, select Bibliographic and search records', function () {
    beforeEach(async function () {
      await recordInteractor.segmentButtonBib.click();
      await searchInteractor.selectIndexes.selectOption('Title');
      await searchInteractor.selectCondition.selectOption('Contains');
      await searchInteractor.searchTextArea.fill('test');
      await recordInteractor.filterSupressedChk.clickThrough();
      await recordInteractor.filterAllTypeChk.clickThrough();
      await searchInteractor.buttonSearch.click();
    });

    it('Bibliographic search executed', () => {
      expect(searchInteractor.countResults).to.be.greaterThan(0);
    });

    describe('select first record', function () {
      beforeEach(async function () {
        await searchInteractor.searchResults.clickThrough();
      });

      it('Record detail loaded', () => {
        expect(recordInteractor.headerDropdownDetailMenu.isDuplicateButtonPresent).to.be.true;
      });

      describe('Click duplicate record button', function () {
        beforeEach(async function () {
          await recordInteractor.headerDropdownDetail.click();
          await recordInteractor.headerDropdownDetailMenu.clickDuplicate();
        });

        it('Record duplication page loaded', () => {
          expect(recordInteractor.headerDropdownDetailMenu.isDuplicateButtonPresent).to.be.true;
        });

      });

    });

  });

});
