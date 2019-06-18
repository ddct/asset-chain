import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    overflow: 'auto',
    maxHeight: '85%',
  },
});

function PinnedSubheaderList(props) {
  const { classes } = props;
  
  return (
    props.data.length > 0 ?
    <List className={classes.root} >
      {props.data}
    </List>
    : <span></span>
  )
}

PinnedSubheaderList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PinnedSubheaderList);