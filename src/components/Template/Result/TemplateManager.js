import React from 'react';
import { connect } from 'react-redux';
import Pane from '@folio/stripes-components/lib/Pane';
import Paneset from '@folio/stripes-components/lib/Paneset';
import Checkbox from '@folio/stripes-components/lib/Checkbox';
import { AccordionSet, Accordion } from '@folio/stripes-components/lib/Accordion';
import { KeyValue } from '@folio/stripes-components';
import * as C from '../../../utils/Constant';
import type { Props } from '../../../core';
import { injectCommonProp } from '../../../core';
import myActionMenuTemplate from '../MyActionMenuTemplate';

type P = Props & {
}

export class TemplateManager extends React.Component<P, {}> {
  constructor(props: P) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <Paneset static>
        <Pane
          defaultWidth="fullWidth"
          paneTitle="Template Title"
          paneSub="SubTitle"
          appIcon={{ app: C.META.ICON_TITLE }}
          actionMenu={myActionMenuTemplate}
        >
          <AccordionSet>
            <KeyValue
              value={<h4>TAG 245 DESCRIPTION HERE...</h4>}
            />
            <Accordion label="Suppress" id="suppress">
              <Checkbox label="Suppress from Discovery" />
            </Accordion>
            <Accordion label="Leader" id="leader">
              <p>Accordion content!</p>
            </Accordion>
            <Accordion label="Controlled fields" id="contr-fields">
              <p>Accordion content!</p>
            </Accordion>
          </AccordionSet>
        </Pane>
      </Paneset>
    );
  }
}

export default (connect(
  ({ marccat: { template } }) => ({
    dataTemplate: template.records,
    templateById: template.recordsById
  }),
)(injectCommonProp(TemplateManager)));
