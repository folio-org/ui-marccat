// @flow strict
import * as React from 'react';
import PropTypes from 'prop-types';
import camelCase from 'lodash/camelCase';
import classnames from 'classnames'; /* eslint-disable-line import/no-extraneous-dependencies */
import { Transition } from 'react-transition-group'; /* eslint-disable-line import/no-extraneous-dependencies */
import { Button, Icon } from '@folio/stripes/components';
import css from './ResetButton.css';

export default class ResetButton extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    id: PropTypes.string,
    label: PropTypes.node,
    onClick: PropTypes.func.isRequired,
    visible: PropTypes.bool,
  }

  constructor(props) {
    super(props);

    this.state = {
      fasterExitTransition: false,
    };

    this.handleClick = this.handleClick.bind(this);
    this.onExited = this.onExited.bind(this);
  }

  /**
   * Handle button click
   */
  handleClick = (e) => {
    const { onClick } = this.props;
    this.setState({
      fasterExitTransition: true,
    });
    onClick(e);
  }

  onExited() {
    this.setState({
      fasterExitTransition: false,
    });
  }

  render() {
    const { id, label, className, visible, ...rest } = this.props;
    const { fasterExitTransition } = this.state;
    return (
      <div className={css.resetButtonRoot}>
        <Transition in={visible} timeout={1000} onExited={this.onExited}>
          {
            state => (
              <div
                className={
                  classnames(
                    css.transition,
                    css[camelCase(`transition ${state}`)],
                    { [css.fasterExitTransition]: fasterExitTransition }
                  )
                }
              >
                <Button
                  buttonStyle="none"
                  id={id}
                  {...rest}
                  onClick={this.handleClick}
                  disabled={!visible}
                  buttonClass={classnames(css.button, className)}
                >
                  <Icon size="small" icon="times-circle-solid">
                    {label}
                  </Icon>
                </Button>
              </div>
            )
          }
        </Transition>
      </div>
    );
  }
}
