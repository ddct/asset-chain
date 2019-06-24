import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  gridList: {
    flexWrap: 'nowrap',
  }
});


function Banner() {

  return (

      <img id="lego" src="logo.png" height="65px" alt="logo" />

  );
}

export default withStyles(styles)(Banner);