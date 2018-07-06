import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import styles from '../styles/TemplateItem';


function TemplateListItem({
  item,
  link,
  onClick
}) {

  return (
    <Link to={{
        pathname: '/courses',
        search: '?sort=name',
        hash: '#the-hash',
        state: { fromDashboard: true }
    }}
    >About
    </Link>
  );
}

TemplateListItem.propTypes = {
  item: PropTypes.object,
  link: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]),
  active: PropTypes.bool,
  showSelected: PropTypes.bool,
  onClick: PropTypes.func,
  headingLevel: PropTypes.string
};

export default withStyles(styles)(TemplateListItem);
