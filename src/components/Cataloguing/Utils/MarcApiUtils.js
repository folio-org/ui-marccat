import { post, put, remove } from '../../../core/api/HttpService';
import { buildUrl, ENDPOINT } from '../../../utils/Constant';
import { uuid } from './MarcUtils';

// eslint-disable-next-line no-unused-vars
const getOkapiLoggedUser = ({ store }) => store.getState().okapi.currentUser.username;

/**
 * @param {*} props the props
 * @returns lock current marc record
 */
export const lockRecord = props => {
  const { store, bibliographicRecord } = props;
  const okapi = store.getState().okapi;
  const userName = okapi.currentUser.username;
  const id = bibliographicRecord.id;
  const uid = uuid();
  remove(buildUrl(ENDPOINT.LOCK_MARC_RECORD + id, `uuid=${uid}&userName=${userName}&lang=ita&view=1&type=R`), bibliographicRecord, null);
};

/**
 * @param {*} props the props
 * @returns save marc record
 */
export const saveRecord = () => {
  const body = { bibliographicRecord: this.composeBodyJson() };
  post(buildUrl(ENDPOINT.BIBLIOGRAPHIC_RECORD, ENDPOINT.DEFAULT_LANG_VIEW), body);
};

/**
 * @param {*} props the props
 * @returns delete marc record
 */
export const deleteRecord = props => {
  const { store, recordDetail } = props;
  const okapi = store.getState().okapi;
  const userName = okapi.currentUser.username;
  const id = recordDetail.bibliographicRecord.id;
  const uid = uuid;
  remove(buildUrl(ENDPOINT.BIBLIOGRAPHIC_RECORD + id, `id=${id}&uuid=${uid}&userName=${userName}&lang=ita&view=1`, true), null);
};

/**
 *
 * @param {*} props the props
 * @returns update marc record
 */
export const editRecord = props => {
  const { store, bibliographicRecord } = props;
  put(buildUrl(ENDPOINT.BIBLIOGRAPHIC_RECORD, ENDPOINT.DEFAULT_LANG_VIEW), bibliographicRecord, store);
};
/**
 *
 * @param {*} props the props
 * @returns the body json to send
 */
export const composeBodyResponse = props => {
  const { bibliographicRecord, store: { getState } } = props;
  const formData = getState().form.bibliographicRecordForm.values;
  const tagVariableData = getState().form.editableListForm.values.items;

  const tag006Values = [];
  const tag007Values = [];
  const tag008Values = [];

  /* Set leader */
  bibliographicRecord.leader.value = formData.Leader;

  /* populate tag 006 tag 007 tag 008 */
  Object.keys(formData)
    .forEach((z) => {
      if (z.split('-')[0] === 'Tag006' || z === 'Tag006') {
        tag006Values.push({
          name: z.split('-')[1] || 'headerTypeCode',
          value: formData[z]
        });
      }
      if (z.split('-')[0] === 'Tag007' || z === 'Tag007') {
        tag007Values.push({
          name: z.split('-')[1] || 'headerTypeCode',
          value: formData[z]
        });
      }
      if (z.split('-')[0] === 'Tag008' || z === 'Tag008') {
        tag008Values.push({
          name: z.split('-')[1] || 'headerTypeCode',
          value: formData[z]
        });
      }
    });

  bibliographicRecord.fields
    .filter(f => f.code !== '001' || f.code !== '003' || f.code !== '005')
    .forEach(f => {
      if (f.code === '006') {
        tag006Values.forEach(v => {
          f.fixedField[v.name] = v.value;
        });
      }
      if (f.code === '007') {
        tag007Values.forEach(v => {
          f.fixedField[v.name] = v.value;
        });
      }
      if (f.code === '008') {
        tag008Values.forEach(v => {
          f.fixedField[v.name] = v.value;
        });
      }
    });

  tagVariableData.forEach(t => {
    if (t.code === 100 || t.code === 110 || t.code === 700) {
      t.categoryCode = 2;
    }
    t.mandatory = false;
  });
  return bibliographicRecord;
};
