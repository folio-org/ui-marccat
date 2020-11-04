import { beforeEach, describe, it } from '@bigtest/mocha';
import { expect } from 'chai';

import setupApplication from '../helpers/setup-application';
import RecordInteractor from '../interactors/record';

describe('Search', () => {
  setupApplication();
  const recordInteractor = new RecordInteractor();

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

  describe('In filter, select Bibliographic', function () {
    beforeEach(async function () {
      await recordInteractor.segmentButtonBib.click();
    });

    it('Bibliographic selected', () => {
      expect(recordInteractor.segmentButtonBib.isButtonVisible).to.be.true;
    });

    describe('click New Bibliographic Record', function () {
      beforeEach(async function () {
        await recordInteractor.headerDropdown.click();
        await recordInteractor.headerDropdownMenu.clickNew();
      });

      it('Bibliographic record template is loaded', () => {
        expect(recordInteractor.headerDropdownMenu.isNewButtonPresent).to.be.false;
      });

      describe('click Leader section', function () {
        beforeEach(async function () {
          await recordInteractor.leaderButton.click();
        });

        it('Leader section clicked', () => {
          expect(recordInteractor.leaderButtonPresent).to.be.true;
        });

        describe('click 006 section', function () {
          beforeEach(async function () {
            await recordInteractor.tag006Button.click();
          });

          it('006 section clicked', () => {
            expect(recordInteractor.tag006ButtonPresent).to.be.true;
          });
        });

        describe('click 007 section', function () {
          beforeEach(async function () {
            await recordInteractor.tag007Button.click();
          });

          it('007 section clicked', () => {
            expect(recordInteractor.tag007ButtonPresent).to.be.true;
          });
        });

        describe('click 008 section', function () {
          beforeEach(async function () {
            await recordInteractor.tag008Button.click();
          });

          it('008 section clicked', () => {
            expect(recordInteractor.tag008ButtonPresent).to.be.true;
          });
        });

        describe('push cancel button', function () {
          beforeEach(async function () {
            await recordInteractor.cancelButton.click();
          });

          it('filter page loaded', () => {
            expect(recordInteractor.segmentButtonBib.isButtonVisible).to.be.true;
          });
        });

      });

    });

  });

  describe('In filter, select Authority', function () {
    beforeEach(async function () {
      await recordInteractor.segmentButtonAuth.click();
    });

    it('Authority selected', () => {
      expect(recordInteractor.segmentButtonBib.isButtonVisible).to.be.true;
    });

    describe('click New Authority Record', function () {
      beforeEach(async function () {
        await recordInteractor.headerDropdown.click();
        await recordInteractor.headerDropdownMenu.clickNew();
      });

      it('Authority record template is loaded', () => {
        expect(recordInteractor.headerDropdownMenu.isNewButtonPresent).to.be.false;
      });

      describe('click Leader section', function () {
        beforeEach(async function () {
          await recordInteractor.leaderButton.click();
        });

        it('Leader section clicked', () => {
          expect(recordInteractor.leaderButtonPresent).to.be.true;
        });

        describe('click 008 section', function () {
          beforeEach(async function () {
            await recordInteractor.tag008Button.click();
          });

          it('008 section clicked', () => {
            expect(recordInteractor.tag008ButtonPresent).to.be.true;
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

});
