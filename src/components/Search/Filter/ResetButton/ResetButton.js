// @flow strict
import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames'; /* eslint-disable-line import/no-extraneous-dependencies */
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

    this.handleClick = this.handleClick.bind(this);
    this.onExited = this.onExited.bind(this);
  }

  /**
   * Handle button click
   */
  handleClick = (e) => {
    const { onClick } = this.props;
    onClick(e);
  }

  onExited() {
  }

  render() {
    const { id, label, className, visible, ...rest } = this.props;
    return (
      <div className={css.resetButtonWrap}>
        <div className={css.resetButtonRoot}>
          <Button
            buttonStyle={visible ? 'none' : 'default'}
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
      </div>
    );
  }
}
