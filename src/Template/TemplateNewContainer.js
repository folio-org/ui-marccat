import React from 'react';
import PropTypes from 'prop-types';
import Pane from '@folio/stripes-components/lib/Pane';
import Paneset from '@folio/stripes-components/lib/Paneset'; // eslint-disable-line import/no-extraneous-dependencies
import css from './styles/TemplateView.css';
// import TemplateNewMandatory from './TemplateNewMandatory'; // deve connettersi al servizio /fields
import AddTagButton from './Tag/AddTagButton';
import NewTagContainer from './Tag/NewTagContainer';

class TemplateNewContainer extends React.Component {
  /* constructor(props) {
    super(props);
    // this.connectedTemplateNewContainer = props.stripes.connect(TemplateNewMandatory);
  } */


  render() {
    const formatMsg = this.props.stripes.intl.formatMessage;

    return (
      <Paneset static style={css.root}>
        <Pane paneTitle={formatMsg({ id: 'ui-cataloging.templates.title' })}>
          {/* mandatory fields */}
          <AddTagButton {...this.props} />
          <NewTagContainer {...this.props} />
        </Pane>
      </Paneset>
    );
  }
}

TemplateNewContainer.propTypes = {
  stripes: PropTypes.shape({ // eslint-disable-line react/no-unused-prop-types
    connect: PropTypes.func.isRequired,
    intl: PropTypes.object.isRequired,
  }).isRequired
};

export default TemplateNewContainer;
