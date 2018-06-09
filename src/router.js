import React from 'react';
import PropTypes from 'prop-types';

class Router extends React.Component {
    static propTypes = {
      stripes: PropTypes.shape({
        connect: PropTypes.func.isRequired,
        intl: PropTypes.object.isRequired,
      }).isRequired,
      location: PropTypes.object.isRequired,
      match: PropTypes.object.isRequired,
      showSettings: PropTypes.bool
    };

    constructor(props) {
      super(props);
      this.state = {};
    }

    render() {
      let rootPath = this.props.match.path;
      return (
        <Switch>
          <Route path={`${rootPath}/templateList`} render={() => <TemplateView {...this.props} {...this.props} />} />
          <Route path={`${rootPath}/template/create`} render={() => <CreateTemplate {...this.props} {...this.props} />} />
        </Switch>
      );
    }
}

Router.propTypes = {};

export default Router;
