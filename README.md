# ui-marccat

Copyright (C) 2017-2019 The Open Library Foundation

This software is distributed under the terms of the Apache License,
Version 2.0. See the file "[LICENSE](LICENSE)" for more information.

## Introduction

The MARCcat UI Module, or `ui-marccat`, is a Stripes UI module used for searching, sorting, filtering, viewing, editing and creating BIB record. (A "Stripes UI module" is an NPM module that adheres to certain conventions that allow it to function within the [Stripes UI framework](https://github.com/folio-org/stripes/blob/master/README.md) that is part of FOLIO.)

FOLIO has several [server-side modules](https://dev.folio.org/source-code/#server-side) that run under Okapi (mod-auth, mod-configuration, [mod-marccat](https://github.com/folio-org/mod-marccat), mod-metadata, mod-files, etc.).

## Installation

First, a Stripes UI development server needs to be running. See the [quick start](https://github.com/folio-org/stripes/blob/master/doc/quick-start.md) instructions, which explain how to run it using packages from the FOLIO NPM repository or use some parts from local in-development versions.

The other parts that are needed are the Okapi gateway, various server-side modules (including mod-marccat), and sample data.

(At some point, this process will be dramatically streamlined; but at present, this software is primarily for developers to work on, rather than for marccat to use.)


## Additional information
You can test "ui-marccat" in a local environent on: [folio.atcult.it](http://folio.atcult.it/)
Other FOLIO Developer documentation is at [dev.folio.org](https://dev.folio.org/)
