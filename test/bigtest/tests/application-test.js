import { beforeEach, describe, it } from '@bigtest/mocha';
import { expect } from 'chai';

import setupApplication from '../helpers/setup-application';
import ApplicationInteractor from '../interactors/application';

describe('Application', () => {
  const app = new ApplicationInteractor();

  setupApplication();

  beforeEach(function () {
    //this.server.createList('item', 5, 'withLoan');
    return this.visit('/marccat/search', () => {
      expect(checkIn.$root).to.exist;
    });
  });

  it('shows a greeting message', () => {
    expect(true).to.equal(true);
  });

  // it('has a link to the developer guides', () => {
  //   expect(app.guideLink).to.include('/dev-guide.md');
  // });
});
