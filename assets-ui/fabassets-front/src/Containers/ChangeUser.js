import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
    menu: {
        width: 200,
    },
});

class ChangeUser extends React.Component {
    state = {
        newOwner: this.props.owner
    };

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    createHandler = () => {
        //Check form validity
        console.log(this.state.newOwner)
        this.props.updateOwner(this.state.newOwner)
    }

    render() {
        const { classes } = this.props;

        return (
            <form className="Main-inside" noValidate autoComplete="off">
            <Typography  variant="display2">
            Change user
        </Typography>
        <TextField
        label={"Current user: " + this.props.owner}
        className={classes.textField}
        value={this.state.newOwner}
        onChange={this.handleChange('newOwner')}
        margin="normal"
            />
            <Button variant="contained"
        color="primary"
        className={classes.button}
        onClick={this.createHandler}>
        SET
    </Button>
        </form>

    );
    }
}


export default withStyles(styles)(ChangeUser);