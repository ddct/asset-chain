import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Swal from 'sweetalert2'
const axios = require('axios');

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

class Create extends React.Component {
  state = {
    ID: "",
    color: "",
    make: "",
    model: "",
    owner: ""
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  updateModel(val) {
    this.setState({
        ...this.state,
        model: val
    })
  }

  createHandler = () => {
    //Check form validity
    if (!(this.state.ID && this.state.make && this.state.model && this.state.color && this.state.owner)){
      alert('All fields must be filled in');
    } else if (this.state.ID.slice(0,5) !== 'ASSET') {
        alert('ID MUST CONTAIN "ASSET" FOLLOWED BY ID')
    } else if (this.state.ID.slice(5).length > 3 || isNaN(this.state.ID.slice(5))) {
        alert('ID MUST CONTAIN "ASSET" FOLLOWED BY ID BETWEEN 0 AND 999')
    } else {
      this.props.switchFeedHandler(1)
      this.props.socket.emit('REQUEST', {action: "CREATE", data:this.state, owner:this.props.owner})
    }
  }

  render() {
    const { classes } = this.props;
    if(this.state.model === ""){
      Swal.fire({
        title: 'Select image',
        input: 'file',
        inputAttributes: {
          'accept': 'image/*',
          'aria-label': 'Upload your profile picture',
          'name': 'file'
        },
        type: "info",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Submit"
      }).then((result) => {
          if (result.value) {
            const formData = new FormData();
            formData.append('file', result.value);
            
            axios({
              method: 'post',
              url: 'http://0.0.0.0:22666/classify',
              data: formData,
              config: { headers: {'Content-Type': 'multipart/form-data' }}
              })
              .then((response) => 
                response.data.result === "macbook" ? 
                this.setState({color: "Grey", make: "Apple", model: "Macbook Pro"}) : 
                this.setState({color: "Black", make:"Lenovo", model: "Thinkpad"}))
                
              .catch(function (response) {
                  //handle error
                  console.log(response);
              });
            }
        })
      }

    return (
      <form className="Main-inside" noValidate autoComplete="off">
        <Typography  variant="display2">
          Create an asset
        </Typography>
        <TextField
          label="ASSET ID"
          className={classes.textField}
          value={this.state.ID}
          onChange={this.handleChange('ID')}
          margin="normal"
        />
        <TextField
          label="Colour"
          className={classes.textField}
          value={this.state.color}
          onChange={this.handleChange('color')}
          margin="normal"
        />
        <TextField
          label="Make"
          className={classes.textField}
          value={this.state.make}
          onChange={this.handleChange('make')}
          margin="normal"
        />
        <TextField
          label="Model"
          className={classes.textField}
          value={this.state.model}
          onChange={this.handleChange('model')}
          margin="normal"
        />
        <TextField
          label="Owner"
          className={classes.textField}
          value={this.state.owner}
          onChange={this.handleChange('owner')}
          margin="normal"
        />
        <Button variant="contained" 
                color="primary" 
                disabled={!this.props.connected}
                className={classes.button} 
                onClick={this.createHandler}>
           {this.props.connected ? "CREATE" : "DISCONNECTED"}
        </Button>
        <p>Asset ID is case sensitive and should start with 'ASSET' followed by digits (e.g. ASSET10)</p>
      </form>
      
    );
  }
}


export default withStyles(styles)(Create);