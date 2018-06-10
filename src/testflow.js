// @flow
import * as React from 'react';
import classNames from 'classnames';

export type WithThemePropsT = {
  theme?: string | string[],
  className?: string
};

import React from 'react';
import PropTypes from 'prop-types';

class ComponentName extends React.Component<WithThemePropsT> {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div></div>
        );
    }
}

ComponentName.propTypes = {};

export default ComponentName;
