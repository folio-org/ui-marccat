import React from 'react';
import PropTypes from 'prop-types';
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
                    <span className={cx('hamburger', 'hamburger1')}></span>
                    <span className={cx('hamburger', 'hamburger2')}></span>
                    <span className={cx('hamburger', 'hamburger3')}></span>
                </label>
                <a href="#" className={cx('menuitem')}> <i className={'fa fa-bar-chart'}></i> </a>
                <a href="#" className={cx('menuitem')}> <i className={'fa fa-plus'}></i> </a>
                <a href="#" className={cx('menuitem')}> <i className={'fa fa-heart'}></i> </a>
                <a href="#" className={cx('menuitem')}> <i className={'fa fa-envelope'}></i> </a>
            </nav>
        );
    }
}

RightFabMenu.propTypes = {};

export default RightFabMenu;
