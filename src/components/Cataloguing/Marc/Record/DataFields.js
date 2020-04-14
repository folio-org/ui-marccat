// @flow
import * as React from 'react';
import { Accordion } from '@folio/stripes/components';
import { Localize } from '../../../../shared/utils/Function';
import FixedField from './Tags/FixedField';
import BaseTag00X from './Tags/BaseTag00X';
import Leader from './Leader';
import FixedField006 from './Tags/FixedField006';
import FixedField007 from './Tags/FixedField007';

export default ({ ...props }) => {
  const { record, leaderData } = props;
  return (
    <React.Fragment>
      <Accordion label="Leader" id="Leader">
        <Leader
          {...props}
          leaderData={leaderData}
          leaderCode={record.leader.code}
          leaderValue={record.leader.value}
        />
      </Accordion>
      <Accordion
        id="control-field-create-static"
        label={Localize({ key: 'cataloging.accordion.fixedfield.label' })}
      >
        <BaseTag00X
          {...props}
          fixedfields={record.fields.filter(f => f.code < '006')}
        />
      </Accordion>
      <Accordion
        id="control-field-dynamic"
        label={Localize({ key: 'cataloging.accordion.fixedfield.editable.label' })}
      >
        <FixedField006
          {...props}
          record={record}
          field={record.fields.filter(f => f.code === '006')}
        />
        <FixedField007
          {...props}
          record={record}
          field={record.fields.filter(f => f.code === '007')}
        />
        <FixedField
          {...props}
          record={record}
          field={record.fields.filter(f => f.code === '008')}
        />
      </Accordion>
    </React.Fragment>
  );
};
