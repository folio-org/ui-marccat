import { describe, beforeEach, it } from '@bigtest/mocha';
import { expect } from 'chai';

import setupApplication from '../helpers/setup-application';
import ApplicationInteractor from '../interactors/application';
import MarccatInteractor from '../interactors/marccat';

describe('Application', () => {
  const app = new ApplicationInteractor();
  const marccat = new MarccatInteractor();

  setupApplication();

  beforeEach(function () {
    this.visit('/');
  });

  it('renders', () => {
    expect(marccat.$root).to.exist;
  });
});
