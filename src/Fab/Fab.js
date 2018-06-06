import React from 'react';
import css from './style/Fab.css';

class Fab extends React.Component { // eslint-disable-line no-unused-vars
  static propTypes = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const image = 'https://ssl.gstatic.com/bt/C3341AA7A1A076756462EE2E5CD71C11/1x/ic_reminders_speeddial_white_24dp.png';
    const edit = 'https://ssl.gstatic.com/bt/C3341AA7A1A076756462EE2E5CD71C11/1x/bt_compose2_1x.png';
    return (
      <div id="container-floating">
        <div className={[css.nd5, css.nds]} data-toggle="tooltip" data-placement="left" data-original-title="Simone" />
        <div className={[css.nd4, css.nds]} data-toggle="tooltip" data-placement="left" data-original-title="contract@gmail.com">
          <img className={css.reminder} alt="" />
          <p className={css.letter}>C</p>
        </div>
        <div className={[css.nd3, css.nds]} data-toggle="tooltip" data-placement="left" data-original-title="Reminder">
          <img className={css.reminder} src={image} alt="" />
        </div>
        <div className={[css.nd1, css.nds]} data-toggle="tooltip" data-placement="left" data-original-title="Edoardo@live.it">
          <img className={css.reminder} alt="" />
          <p className={css.letter}>E</p>
        </div>
        <div id="floating-button" data-toggle="tooltip" data-placement="left" data-original-title="Create">
          <p className={css.plus}>+</p>
          <img className={css.edit} src={edit} alt="" />
        </div>
      </div>
    );
  }
}

export default css;
