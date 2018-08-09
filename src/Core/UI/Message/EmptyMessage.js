import * as React from 'react';
import PropTypes from 'prop-types';
import Icon from '@folio/stripes-components/lib/Icon';
import css from './EmptyMessage.css';

const EmptyMessage = (props) => {
  const { icon, label } = props;
  return (
    <div className={css.emptyMessage}>
      <div className={css.emptyMessageLabelWrap}>
        {icon && <Icon iconRootClass={css.emptyMessageIcon} icon={icon} />}
        <span className={css.emptyMessageLabel}>{label}</span>
      </div>
    </div>
  );
};

EmptyMessage.propTypes = {
  icon: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired
};

export default EmptyMessage;
