import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  gridList: {
    flexWrap: 'nowrap',
  }
});


function Banner() {

  return (

      <img id="lego" src="logo.png" height="65px" />

  );
}

export default withStyles(styles)(Banner);