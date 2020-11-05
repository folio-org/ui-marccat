import { beforeEach, describe, it } from '@bigtest/mocha';
import { expect } from 'chai';

import setupApplication from '../helpers/setup-application';
import RecordInteractor from '../interactors/record';
import SearchInteractor from '../interactors/search';

describe('Record Edit', () => {
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
        expect(recordInteractor.headerDropdownDetailMenu.isEditButtonPresent).to.be.true;
      });

      describe('Click edit record button', function () {
        beforeEach(async function () {
          await recordInteractor.headerDropdownDetail.click();
          await recordInteractor.headerDropdownDetailMenu.clickEdit();
        });

        it('Record edition page loaded', () => {
          expect(recordInteractor.headerDropdownDetailMenu.isEditButtonPresent).to.be.false;
        });

        describe('click 006 section', function () {
          beforeEach(async function () {
            await recordInteractor.tag006Button.click();
          });

          it('006 section clicked', () => {
            expect(recordInteractor.tag006ButtonPresent).to.be.true;
          });

          describe('change 006 value', function () {
            beforeEach(async function () {
              await recordInteractor.selectType006('006 - Book');
            });

            it('006 value changed', () => {
              expect(recordInteractor.selectType006Interactor.value).to.equal('16');
            });
          });

        });

        describe('click 007 section', function () {
          beforeEach(async function () {
            await recordInteractor.tag007Button.click();
          });

          it('007 section clicked', () => {
            expect(recordInteractor.tag007ButtonPresent).to.be.true;
          });

          describe('change 007 value', function () {
            beforeEach(async function () {
              await recordInteractor.selectType007('007 - Map');
            });

            it('007 value changed', () => {
              expect(recordInteractor.selectType007Interactor.value).to.equal('24');
            });
          });

        });

        describe('click 008 section', function () {
          beforeEach(async function () {
            await recordInteractor.tag008Button.click();
          });

          it('008 section clicked', () => {
            expect(recordInteractor.tag008ButtonPresent).to.be.true;
          });

          describe('change 008 value', function () {
            beforeEach(async function () {
              await recordInteractor.bibSelectType008('Alaska');
            });

            it('008 value changed', () => {
              expect(recordInteractor.bibSelectType008Interactor.value).to.equal('aku');
            });
          });

        });

        describe('push save button', function () {
          beforeEach(async function () {
            await recordInteractor.saveButton.click();
          });

          it('filter page loaded', () => {
            expect(recordInteractor.saveButtonPresent).to.be.true;
          });
        });

      });

    });

  });

  describe('In filter, select Authority and search records', function () {
    beforeEach(async function () {
      await recordInteractor.segmentButtonAuth.click();
      await searchInteractor.selectIndexes.selectOption('Title');
      await searchInteractor.selectCondition.selectOption('Contains');
      await searchInteractor.searchTextArea.fill('test');
      await searchInteractor.buttonSearch.click();
    });

    it('Authority search executed', () => {
      expect(searchInteractor.countResults).to.be.greaterThan(0);
    });

    describe('select first record', function () {
      beforeEach(async function () {
        await searchInteractor.searchResults.clickThrough();
      });

      it('Record detail loaded', () => {
        expect(recordInteractor.headerDropdownDetailMenu.isEditButtonPresent).to.be.true;
      });

      describe('Click edit record button', function () {
        beforeEach(async function () {
          await recordInteractor.headerDropdownDetail.click();
          await recordInteractor.headerDropdownDetailMenu.clickEdit();
        });

        it('Record edition page loaded', () => {
          expect(recordInteractor.headerDropdownDetailMenu.isEditButtonPresent).to.be.false;
        });

        describe('push save button', function () {
          beforeEach(async function () {
            await recordInteractor.saveButton.click();
          });

          it('filter page loaded', () => {
            expect(recordInteractor.saveButtonPresent).to.be.true;
          });

        });

      });

    });

  });

});
