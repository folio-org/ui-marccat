import React from 'react';
import { connect } from '@folio/stripes-connect';
// import { xsltProcess, xmlParse } from 'xslt-processor';
import Paneset from '@folio/stripes-components/lib/Paneset';
import Pane from '@folio/stripes-components/lib/Pane';
import * as C from '../../Utils';

// const xsltString = require('../../../config/static/txt.xslt');
type Props = {
    stripes: Object;
  };

type State = {
  };

class XLSTTrasform extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    const formatMsg = this.props.stripes.intl.formatMessage;
    // const xml = xmlParse(xmlString); // xmlString: string of xml file contents
    // const xslt = xmlParse(xsltString); // xsltString: string of xslt file contents
    // const outXmlString = xsltProcess(xml, xslt); // outXmlString: output xml string.

    return (
      <Paneset static>
        <Pane
          paneTitle={formatMsg({ id: 'ui-marccat.' })}
          paneSub={formatMsg({ id: 'ui-marccat.' })}
          appIcon={{ app: C.META.ICON_TITLE }}
        >
          <div>
            {/* {outXmlString} */}
          </div>
        </Pane>
      </Paneset>
    );
  }
}

export default connect(XLSTTrasform, C.META.MODULE_NAME);
