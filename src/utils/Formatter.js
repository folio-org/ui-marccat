import React from 'react';
import { getFieldPosition, getFormat, getMicroformat } from './Mapper';
import style from '../styles/common.css';

export const columnMapper = {
  'resultView': '',
  '001': 'Id. Number (001)',
  '245': 'Title (245)',
  'uniformTitle': 'Uniform Title (130, 240)',
  'name': 'Name (100, 110, 111)',
  'subject': 'Subject (6xx)',
  'date1': 'Date 1',
  'date2': 'Date 2',
  'format': 'Format',
  'tagHighlighted': 'Field',
  'countDoc': 'Count'
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
    <div>
      { x['100'] && x['100'] }
      { x['110'] && x['110'] }
      { x['111'] && x['111'] }
    </div>
  ),
  format: x => (
    <div>
      { x.recordView === 1 && getFormat(x.leader) }
    </div>
  ),
  subject: x => (
    <div>
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
    </div>
  )
};

export const resultsFormatter = {
  resultView: x => (
    <span className={x.recordView === 1 ? style.bibliographic : style.authority} />
  ),
  name: x => (
    <div>
      { x['100'] && x['100'] }
      { x['110'] && x['110'] }
      { x['111'] && x['111'] }
    </div>
  ),
  uniformTitle: x => (
    <div>
      { x['130'] && x['130'] }
      { x['240'] && x['240'] }
    </div>
  ),
  date1: x => (
    <div>
      {x.recordView === 1 && getFieldPosition(x['008'], 7, 11) }
    </div>
  ),
  date2: x => (
    <div>
      { x.recordView === 1 && getFieldPosition(x['008'], 11, 14) }
    </div>
  ),
  format: x => (
    <div>
      { x.recordView === 1 && getFormat(x.leader) }
      { x.recordView === 1 && getMicroformat(x['007']) }
    </div>
  ),
  countDoc: x => (
    <div>
      { x.recordView === -1 && x.countDoc}
    </div>
  ),
  subject: x => (
    <div>
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
    </div>
  )
};

export const browseFormatter = {
  type: x => (
    <span className={x.countAuthorities === 0 ? style.bibliographic : style.authority} />
  )
};
