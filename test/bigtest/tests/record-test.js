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

    describe('click New Record', function () {
      beforeEach(async function () {
        await recordInteractor.headerDropdown.click();
        await recordInteractor.headerDropdownMenu.clickNew();
      });

      it('record template is loaded', () => {
        expect(recordInteractor.headerDropdownMenu.isNewButtonPresent).to.be.false;
      });

      describe('click Leader section', function () {
        beforeEach(async function () {
          await recordInteractor.leaderButton.click();
        });

        it('Leader section clicked', () => {
          expect(recordInteractor.leaderButtonPresent).to.be.true;
        });
      });

    });

  });

});
