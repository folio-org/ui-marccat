import PropTypes from 'prop-types';
import React from 'react';
import Pane from '@folio/stripes-components/lib/Pane';
import Paneset from '@folio/stripes-components/lib/Paneset'; // eslint-disable-line import/no-extraneous-dependencies
import Selection from '@folio/stripes-components/lib/Selection';
import { ENDPOINT, RESOURCE_TYPE } from '../constant';

class LogicalView extends React.Component {
    static manifest = Object.freeze({
      views: {
        type: RESOURCE_TYPE,
        root: ENDPOINT.BASE_URL,
        path: ENDPOINT.LOGICAL_VIEW_URL,
        headers: ENDPOINT.HEADER,
        records: 'views',
        GET: {
          params: { lang: 'ita' },
        },
      },
    });

    render() {
      const { resources: { views } } = this.props; // eslint-disable-line react/prop-types
      if (!views || !views.hasLoaded) return <div />;
      const logicalViews = views.records;

      return (
        <Paneset static>
          <Pane defaultWidth="80%" paneTitle="Some Stripes Components">
            <div>
              <Selection
                name="SelectionViews"
                label="Views"
                id="viewsSelect"
                placeholder="Select view"
                dataOptions={logicalViews}
              />
            </div>
          </Pane>
        </Paneset>
      );
    }
}

LogicalView.propTypes = {
  stripes: PropTypes.shape({ // eslint-disable-line react/no-unused-prop-types
    connect: PropTypes.func.isRequired,
    intl: PropTypes.object.isRequired,
  }).isRequired
};

export default LogicalView;
