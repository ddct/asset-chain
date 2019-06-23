import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { red } from '@material-ui/core/colors';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
});

function ContainedButtons(props) {
  const { classes } = props;
  
  const onClickHandler = () => {
    window.alert(`connected to server with socket ID ${props.socketID}`)
  }

  return (
    <div>
      <Button variant="contained" style={{backgroundColor: props.connected ? 'lightgreen':'red'} } disabled={!props.connected} className={classes.button} onClick={onClickHandler}>
        {props.connected ? "Connected" : "Disconnected"}
      </Button>
    </div>
  );
}

ContainedButtons.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ContainedButtons);