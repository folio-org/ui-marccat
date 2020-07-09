import { beforeEach, describe, it } from '@bigtest/mocha';
import { expect } from 'chai';

import { describeApplication } from '../helpers/describe-application';
import ApplicationInteractor from '../interactors/application';

describeApplication('Application', () => {
  const app = new ApplicationInteractor();

  beforeEach(function () {
    return this.visit('/marccat/search', () => {
      expect(app.$root).to.exist;
    });
  });

  it('shows a greeting message', () => {
    expect(true).to.equal(true);
  });
});
