/* eslint-disable no-unused-vars */
// @flow
import * as React from 'react';
import { Button } from '@folio/stripes-components';
import { AppIcon } from '@folio/stripes-core';
import { getFieldPosition, getFormat, getMicroformat } from './Mapper';
import style from '../../components/Search/Style/index.css';
import { unionSortAndDedupe } from '../../components/Cataloguing/Utils/MarcApiUtils';

export const columnMapper = (
  isBibsOnly: ?boolean,
  isAuthOnly: ?boolean = true
) => {
  let mapper = {};
  if (isBibsOnly === true && isAuthOnly === false) {
    mapper = {
      'resultView': '',
      '001': 'Id. Number (001)',
      '245': 'Title (245)',
      'name': 'Name (100, 110, 111)',
      'preferredTitle': 'Uniform title (130, 240)',
      'tagHighlighted': 'Tag',
      'countDoc': 'Bibs',
      'subject': 'Subject (6xx)',
      'date1': 'Date 1',
      'date2': 'Date 2',
      'format': 'Format',
    };
  } else if (isAuthOnly === true && isBibsOnly === false) {
    mapper = {
      'resultView': '',
      '001': 'Id. Number (001)',
      '245': 'Title (245)',
      'name': 'Access point (1XX)',
      'preferredTitle': 'Uniform title (240)',
      'tagHighlighted': 'Tag',
      'countDoc': 'Bibs',
      'subject': 'Subject (6xx)',
    };
  } else if (
    (isAuthOnly === true && isBibsOnly === true) ||
    (isAuthOnly === false && isBibsOnly === false)
  ) {
    mapper = {
      'resultView': '',
      '001': 'Id. Number (001)',
      '245': 'Title (245)',
      'name': 'Access point (1XX)',
      'preferredTitle': 'Uniform title (240)',
      'tagHighlighted': 'Tag',
      'countDoc': 'Bibs',
    };
  }
  return mapper;
};
export const renderColumn = (
  isBibsOnly: ?boolean,
  isAuthOnly: ?boolean = true,
  customColumns: Array
) => {
  let visibleCol = [];
  if (isBibsOnly === true && isAuthOnly === false) {
    if (customColumns.length > 0) {
      return customColumns;
    }
    visibleCol = [
      'resultView',
      '001',
      '245',
      'name',
      'preferredTitle',
      'tagHighlighted',
      'countDoc',
      'subject',
      'date1',
      'date2',
      'format',
    ];
  }
  if (isAuthOnly === true && isBibsOnly === false) {
    visibleCol = [
      'resultView',
      '001',
      '245',
      'name',
      'preferredTitle',
      'tagHighlighted',
      'countDoc',
      'subject',
    ];
  }
  if (
    (isAuthOnly === true && isBibsOnly === true) ||
    (isAuthOnly === false && isBibsOnly === false)
  ) {
    visibleCol = [
      'resultView',
      '001',
      '245',
      'name',
      'preferredTitle',
      'tagHighlighted',
      'countDoc',
    ];
  }
  return visibleCol;
};

export const columnWidthMapper = (
  isBibsOnly: ?boolean,
  isAuthOnly: ?boolean = true
) => {
  let widthMapper = {};
  if (isBibsOnly === true && isAuthOnly === false) {
    widthMapper = {
      'resultView': '5%',
      '001': '10%',
      '245': '30%',
      'name': '10%',
      'preferredTitle': '10%',
      'tagHighlighted': '5%',
      'countDoc': '5%',
      'subject': '10%',
      'date1': '5%',
      'date2': '5%',
      'format': '5%',
    };
  } else if (isAuthOnly === true && isBibsOnly === false) {
    widthMapper = {
      'resultView': '5%',
      '001': '15%',
      '245': '30%',
      'name': '15%',
      'preferredTitle': '15%',
      'tagHighlighted': '5%',
      'countDoc': '5%',
      'date1': '5%',
      'date2': '5%',
    };
  } else if (
    (isAuthOnly === true && isBibsOnly === true) ||
    (isAuthOnly === false && isBibsOnly === false)
  ) {
    widthMapper = {
      'resultView': '5%',
      '001': '15%',
      '245': '30%',
      'name': '15%',
      'preferredTitle': '15%',
      'tagHighlighted': '10%',
      'countDoc': '10%',
    };
  }
  return widthMapper;
};

export const columnMapperForAssociated = {
  'resultView': '',
  '245': '',
  'name': '',
  'subject': '',
  'format': '',
};
export const browseColMapper = {
  type: '',
  cr0: '',
  cr1: '',
  stringText: 'Access point',
  countAuthorities: 'Auths',
  countDocuments: 'Bibs',
};

const subjectTags = (x) => {
  return (
    <span>
      {x['600']}
      {x['610']}
      {x['611']}
      {x['630']}
      {x['647']}
      {x['648']}
      {x['650']}
      {x['651']}
      {x['653']}
      {x['654']}
      {x['655']}
      {x['651']}
      {x['653']}
      {x['654']}
      {x['655']}
      {x['656']}
      {x['657']}
      {x['658']}
      {x['662']}
    </span>);
};

export const resultsFormatterForAssociated = {
  resultView: x => (x.recordView === 1 ? (
    <AppIcon size="small" app="marccat" iconKey="marc-bib" />
  ) : (
    <AppIcon size="small" app="marccat" iconKey="marc-authority" />
  )),
  name: x => (
    <span>
      {x['100']}
      {x['110']}
      {x['111']}
    </span>
  ),
  format: x => <span>{x.recordView === 1 && getFormat(x.leader)}</span>,
  tagHighlighted: x => (
    <span className={style.tagHighLighted}>{x.tagHighlighted}</span>
  ),
  subject: x => (
    subjectTags(x)
  ),
};

export const resultsFormatter = (
  isBibsOnly: ?boolean = true,
  isAuthOnly: ?boolean = true
) => {
  const all = {
    resultView: x => (x.recordView === 1 ? (
      <AppIcon size="small" app="marccat" iconKey="marc-bib" />
    ) : (
      <AppIcon size="small" app="marccat" iconKey="marc-authority" />
    )),
    name: x => (
      <span>
        {x['100']}
        {x['110']}
        {x['111']}
        {x['130'] && !isBibsOnly}
      </span>
    ),
    preferredTitle: x => (
      <span>
        {x['130'] && isBibsOnly}
        {x['240']}
      </span>
    ),
    countDoc: x => <span>{x.recordView === -1 && x.countDoc}</span>,
    tagHighlighted: x => (
      <span className={style.tagHighLighted}>{x.tagHighlighted}</span>
    ),
  };

  const isBib = {
    resultView: x => (x.recordView === 1 ? (
      <AppIcon size="small" app="marccat" iconKey="marc-bib" />
    ) : (
      <AppIcon size="small" app="marccat" iconKey="marc-authority" />
    )),
    name: x => (
      <span>
        {x['100']}
        {x['110']}
        {x['111']}
        {!isBibsOnly && x['130']}
      </span>
    ),
    preferredTitle: x => (
      <span>
        {isBibsOnly && x['130']}
        {x['240']}
      </span>
    ),
    date1: x => (
      <span>{x.recordView === 1 && getFieldPosition(x['008'], 7, 11)}</span>
    ),
    date2: x => (
      <span>{x.recordView === 1 && getFieldPosition(x['008'], 11, 14)}</span>
    ),
    format: x => (
      <span>
        {x.recordView === 1 && getFormat(x.leader)}
        {x.recordView === 1 && getMicroformat(x['007'])}
      </span>
    ),
    countDoc: x => <span>{x.recordView === -1 && x.countDoc}</span>,
    tagHighlighted: x => (
      <span className={style.tagHighLighted}>{x.tagHighlighted}</span>
    ),
    subject: x => (
      subjectTags(x)
    ),
  };
  return isAuthOnly && isBibsOnly ? all : isBib;
};
