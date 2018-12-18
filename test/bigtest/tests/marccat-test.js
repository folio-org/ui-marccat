import { beforeEach, describe } from '@bigtest/mocha';
import { expect } from 'chai';

import setupApplication from '../helpers/setup-application';
import MarccatInteractor from '../interactors/marccat';

describe('Marccat', () => {
  setupApplication();

  const marccat = new MarccatInteractor();

  beforeEach(function () {
    return this.visit('/marccat', () => {
      expect(marccat.$root).to.exist;
    });
  });
});
