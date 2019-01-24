/* eslint-disable no-unused-vars */
import React from 'react';
import { getFieldPosition, getFormat, getMicroformat } from './Mapper';
import style from '../components/Search/index.css';

export const columnMapper = (isBibsOnly:?boolean, isAuthOnly:?boolean = true) => {
  const isBib = {
    'resultView': '',
    '001': 'Id. Number (001)',
    '245': 'Title (245)',
    'preferredTitle': (isBibsOnly) ? 'Preferred title (130, 240)' : 'Preferred title (240)',
    'name': (isBibsOnly) ? 'Name (100, 110, 111)' : 'Access point (1XX)',
    'subject': 'Subject (6xx)',
    'date1': 'Date 1',
    'date2': 'Date 2',
    'tagHighlighted': 'Tag',
    'countDoc': 'Bibs'
  };
  const isAuth = {
    'resultView': '',
    '001': 'Id. Number (001)',
    '245': 'Title (245)',
    'preferredTitle': (isBibsOnly) ? 'Preferred title (130, 240)' : 'Preferred title (240)',
    'name': (isBibsOnly) ? 'Name (100, 110, 111)' : 'Access point (1XX)',
    'subject': 'Subject (6xx)',
    'date1': 'Date 1',
    'date2': 'Date 2',
    'format': 'Format',
    'tagHighlighted': 'Tag',
    'countDoc': 'Bibs'
  };
  const all = {
    'resultView': '',
    '001': 'Id. Number (001)',
    '245': 'Title (245)',
    'preferredTitle': (isBibsOnly) ? 'Preferred title (130, 240)' : 'Preferred title (240)',
    'name': (isBibsOnly) ? 'Name (100, 110, 111)' : 'Access point (1XX)',
    'tagHighlighted': 'Tag',
    'countDoc': 'Bibs'
  };
  return all;
};

export const columnWidthMapper = (isBibsOnly:?boolean, isAuthOnly:?boolean) => {
  return (isBibsOnly) ? {
    'resultView': '5%',
    '001': '10%',
    '245': '30%',
    'preferredTitle': '5%',
    'name': '15%',
    'subject': '8%',
    'date1': '5%',
    'date2': '5%',
    'format': '8%',
    'tagHighlighted': '5%',
    'countDoc': '4%'
  } : {
    'resultView': '6%',
    '001': '10%',
    '245': '30%',
    'preferredTitle': '25%',
    'date1': '5%',
    'date2': '5%',
    'name': '15%',
    'tagHighlighted': '5%',
    'countDoc': '9%'
  };
};

export const columnMapperForAssociated = {
  'resultView': '',
  '245': '',
  'name': '',
  'subject': '',
  'format': '',
};
export const browseColMapper = {
  'type': '',
  'headingNumber': 'Heading #',
  'stringText': 'Access point',
  'countAuthorities': 'Authority Records',
  'countDocuments': 'Bibliographic Records'
};
export const resultsFormatterForAssociated = {
  resultView: x => (
    <span className={x.recordView === 1 ? style.bibliographic : style.authority} />
  ),
  name: x => (
    <span>
      { x['100'] && x['100'] }
      { x['110'] && x['110'] }
      { x['111'] && x['111'] }
    </span>
  ),
  format: x => (
    <span>
      { x.recordView === 1 && getFormat(x.leader) }
    </span>
  ),
  tagHighlighted: x => (
    <span className={style.tagHighLighted}>
      {x.tagHighlighted}
    </span>
  ),
  subject: x => (
    <span>
      { x['600'] && x['600'] }
      { x['610'] && x['610'] }
      { x['611'] && x['611'] }
      { x['630'] && x['630'] }
      { x['647'] && x['647'] }
      { x['648'] && x['648'] }
      { x['650'] && x['650'] }
      { x['651'] && x['651'] }
      { x['653'] && x['653'] }
      { x['654'] && x['654'] }
      { x['655'] && x['655'] }
      { x['651'] && x['651'] }
      { x['653'] && x['653'] }
      { x['654'] && x['654'] }
      { x['655'] && x['655'] }
      { x['656'] && x['656'] }
      { x['657'] && x['657'] }
      { x['658'] && x['658'] }
      { x['662'] && x['662'] }
    </span>
  )
};

export const resultsFormatter = (isBibsOnly:?boolean = true, isAuthOnly:?boolean = true) => {
  const all = {
    resultView: x => (
      <span className={x.recordView === 1 ? style.bibliographic : style.authority} />
    ),
    name: x => (
      <span>
        { x['100'] && x['100'] }
        { x['110'] && x['110'] }
        { x['111'] && x['111'] }
        { (x['130'] && !isBibsOnly) && x['130'] }
      </span>
    ),
    preferredTitle: x => (
      <span>
        { (x['130'] && isBibsOnly) && x['130'] }
        { x['240'] && x['240'] }
      </span>
    ),
    countDoc: x => (
      <span>
        { x.recordView === -1 && x.countDoc}
      </span>
    ),
    tagHighlighted: x => (
      <span className={style.tagHighLighted}>
        {x.tagHighlighted}
      </span>
    ),
  };

  const isBib = {
    resultView: x => (
      <span className={x.recordView === 1 ? style.bibliographic : style.authority} />
    ),
    name: x => (
      <span>
        { x['100'] && x['100'] }
        { x['110'] && x['110'] }
        { x['111'] && x['111'] }
        { (x['130'] && !isBibsOnly) && x['130'] }
      </span>
    ),
    preferredTitle: x => (
      <span>
        { (x['130'] && isBibsOnly) && x['130'] }
        { x['240'] && x['240'] }
      </span>
    ),
    date1: x => (
      <span>
        {x.recordView === 1 && getFieldPosition(x['008'], 7, 11) }
      </span>
    ),
    date2: x => (
      <span>
        { x.recordView === 1 && getFieldPosition(x['008'], 11, 14) }
      </span>
    ),
    format: x => (
      <span>
        { x.recordView === 1 && getFormat(x.leader) }
        { x.recordView === 1 && getMicroformat(x['007']) }
      </span>
    ),
    countDoc: x => (
      <span>
        { x.recordView === -1 && x.countDoc}
      </span>
    ),
    tagHighlighted: x => (
      <span className={style.tagHighLighted}>
        {x.tagHighlighted}
      </span>
    ),
    subject: x => (
      <span>
        { x['600'] && x['600'] }
        { x['610'] && x['610'] }
        { x['611'] && x['611'] }
        { x['630'] && x['630'] }
        { x['647'] && x['647'] }
        { x['648'] && x['648'] }
        { x['650'] && x['650'] }
        { x['651'] && x['651'] }
        { x['653'] && x['653'] }
        { x['654'] && x['654'] }
        { x['655'] && x['655'] }
        { x['651'] && x['651'] }
        { x['653'] && x['653'] }
        { x['654'] && x['654'] }
        { x['655'] && x['655'] }
        { x['656'] && x['656'] }
        { x['657'] && x['657'] }
        { x['658'] && x['658'] }
        { x['662'] && x['662'] }
      </span>
    )
  };
  return (isAuthOnly && isBibsOnly) ? all : isBib;
};

export const browseFormatter = {
  type: x => (
    <span className={x.countAuthorities === 0 ? style.bibliographic : style.authority} />
  )
};
