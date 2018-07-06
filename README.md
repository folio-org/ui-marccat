# ui-cataloging

[![CircleCI](https://circleci.com/gh/atcult/ui-cataloging.svg?style=svg)](https://circleci.com/gh/atcult/ui-cataloging)

Copyright (C) 2017-2018 The Open Library Foundation

This software is distributed under the terms of the Apache License,
Version 2.0. See the file "[LICENSE](LICENSE)" for more information.

## Introduction
The `ui-cataloging` module adds the ability to manage cataloging in FOLIO.

## Prerequisites

* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/) (at least version 8)
* [Yarn](https://yarnpkg.com/)

## Installation

* `git clone https://github.com/folio-org/ui-cataloging`
* `cd ui-cataloging`
* `yarn`

## Running

* `yarn start`
* Visit your app at [http://localhost:3000](http://localhost:3000).

By default, this will use the backend OKAPI cluster at
https://okapi.frontside.io However, if you want to run the application
against the mirage server contained within the browser, you can turn

## lint

* `yarn build`

## flow

* `yarn flow`

## Running Tests

* `yarn test` (uses Karma and Mocha to test the application)

To add Istanbul instrumentation and a code coverage report:
* `yarn test --coverage`

## Building

* `yarn build`
