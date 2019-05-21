import * as React from 'react';
import {
  Pane,
  Paneset,
  AccordionSet,
  PaneMenu,
  Row,
  Col,
  AppIcon
} from '@folio/stripes/components';
import FixedFieldForm from '../FixedField/FixedFieldForm';
import VariableFieldForm from '../VariableField';
import { filterVariableFields } from '../Utils/MarcApiUtils';
import { deleteRecordAction } from '../Actions';

import { ACTION, destroy } from '../../../redux/actions';
import { META } from '../../../config/constants';
import DeleteRecordButton from '../Button/DeleteRecordButton';
import SaveRecordButton from '../Button/SaveRecordButton';


export default function RecordPane({
  record,
  mode,
  id,
  leaderData,
  saveRecord,
  detail,
  onCreate,
  onDelete,
  ...props
}) {


  const deleteRecord = _ => {
    const { dispatch } = props;
    dispatch(deleteRecordAction(detail));
  };

  const handleClose = (submit) => {
    const { dispatch, router, toggleFilterPane, reset } = props;
    dispatch({ type: ACTION.FILTERS, payload: {}, filterName: '', isChecked: false });
    reset();
    dispatch(destroy());
    toggleFilterPane();
    return (submit) ? router.push(`/marccat/search?savedId=${id}`) : router.push('/marccat/search');
  };

  const renderActionButtons = () => {
    return (
      <PaneMenu>
        <SaveRecordButton {...props} saveRecord={saveRecord} />
        <DeleteRecordButton {...props} />
      </PaneMenu>
    );
  };

  return (
    <Paneset static>
      <Pane
        defaultWidth="fullWidth"
        paneTitle={(record && mode) ? 'Edit Record' : 'New Monograph'}
        paneSub={'id. ' + record.id || id}
        appIcon={<AppIcon app={META.ICON_TITLE} />}
        actionMenu={() => {}}
        dismissible
        onClose={() => handleClose()}
        lastMenu={renderActionButtons()}
      >
        <Row center="xs">
          <Col xs={12} sm={6} md={8} lg={8}>
            <AccordionSet>
              <FixedFieldForm
                {...props}
                leaderData={leaderData}
                record={record}
              />
              <VariableFieldForm
                {...props}
                fields={filterVariableFields(record.fields)}
                onCreate={onCreate}
                onDelete={onDelete}
              />
            </AccordionSet>
          </Col>
        </Row>
      </Pane>
    </Paneset>
  );
}
