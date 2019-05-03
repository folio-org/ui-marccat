import React from 'react';
import { Accordion } from '@folio/stripes/components';
import { MarcLeader } from '../..';
import { Localize } from '../../../../utils/Function';
import FixedField from './FixedField';
import EditableFixedField from './EditableFixedField';

export default ({ ...props }) => {
  const { record, leaderData } = props;
  return (
    <React.Fragment>
      <Accordion label="Leader" id="Leader">
        <MarcLeader
          {...props}
          readOnly
          leaderData={leaderData}
          leaderCode={record.leader.code}
          leaderValue={record.leader.value}
        />
      </Accordion>
      <Accordion
        id="control-field-create-static"
        label={Localize({ key: 'cataloging.accordion.fixedfield.label' })}
      >
        <FixedField
          {...props}
          fixedfields={record.fields.filter(f => f.code < '006')}
        />
      </Accordion>
      <Accordion
        id="control-field-dynamic"
        label={Localize({ key: 'cataloging.accordion.fixedfield.editable.label' })}
      >
        <EditableFixedField
          {...props}
          record={record}
          fixedfields={record.fields.filter(f => f.code > '005' && f.code < '010')}
        />
      </Accordion>
    </React.Fragment>
  );
};
