import React from 'react';
import { connect } from 'react-redux';
// import { FormattedMessage } from 'react-intl';
// import Icon from '@folio/stripes-components/lib/Icon';
import Pane from '@folio/stripes-components/lib/Pane';
import Paneset from '@folio/stripes-components/lib/Paneset';
import { AccordionSet, Accordion } from '@folio/stripes-components/lib/Accordion';
import * as C from '../../../utils/Constant';
// import { ActionTypes } from '../../../redux/actions';
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
            <Accordion separator={false} label="Leader" id="ex-1">
              <p>Accordion content!</p>
            </Accordion>
            <Accordion separator={false} label="Controlled fields" id="ex-2">
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
    dataTemplate: template.records
  }),
)(injectCommonProp(TemplateManager)));
