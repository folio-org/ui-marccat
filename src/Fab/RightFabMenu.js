import React from 'react';
import classNames from 'classnames/bind';
import css from './style/RightFabMenu.css';

let cx = classNames.bind(css);

class RightFabMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <nav className={css.menu}>
        <input type="checkbox" href="#" className={css.menuopen} name="menu-open" id="menuopen" />
        <label className={css.menuopenbutton} htmlFor="menu-open">
          <span className={cx('hamburger', 'hamburger1')} />
          <span className={cx('hamburger', 'hamburger2')} />
          <span className={cx('hamburger', 'hamburger3')} />
        </label>
        <a href="/" className={cx('menuitem')}> <i className="fa fa-bar-chart" /> </a>
        <a href="/" className={cx('menuitem')}> <i className="fa fa-plus" /> </a>
        <a href="/" className={cx('menuitem')}> <i className="fa fa-heart" /> </a>
        <a href="/" className={cx('menuitem')}> <i className="fa fa-envelope" /> </a>
      </nav>
    );
  }
}

RightFabMenu.propTypes = {};

export default RightFabMenu;
