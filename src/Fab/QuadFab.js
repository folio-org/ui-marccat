import React from 'react';
import css from './style/QuadFab.css';

class QuadFab extends React.Component {
    static propTypes = {};

    constructor(props) {
      super(props);
      this.state = {};
    }

    render() {
      return (
        <header className={css.header}>
          <div className={css.addbutton}>
            <div className={[css.subbutton, css.tl]} />
            <div className={[css.subbutton, css.tr]} />
            <div className={[css.subbutton, css.bl]} />
            <div className={[css.subbutton, css.br]} />
          </div>
        </header>
      );
    }
}

QuadFab.propTypes = {};

export default QuadFab;
