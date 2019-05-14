// @flow
import * as React from 'react';
import { Accordion } from '@folio/stripes/components';
import { Localize } from '../../../../shared/utils/Function';
import FixedField from './Tags/FixedField';
import BaseTag00X from './Tags/BaseTag00X';
import Leader from './Leader';

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
        <FixedField
          {...props}
          record={record}
          field={record.fields.filter(f => f.code > '005' && f.code < '010')}
        />
      </Accordion>
    </React.Fragment>
  );
};
