import { beforeEach, describe, it } from '@bigtest/mocha';
import { expect } from 'chai';

import setupApplication from '../helpers/setup-application';
import ActionMenuInteractor from '../interactors/action-menu';

describe('ActionMenu', () => {
  setupApplication();
  const actionMenuInteractor = new ActionMenuInteractor();

  beforeEach(function () {
    this.server.create('fromTemplate');

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
  });


});
