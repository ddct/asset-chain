import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Swal from 'sweetalert2'
import fs from 'fs';
var request = require('request');

const axios = require('axios');

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: "theme.palette.background.paper",
  },
  tabsRoot: {
    borderBottom: '1px solid #e8e8e8',
  },
  tabsIndicator: {
    backgroundColor: '#1890ff',
  },
  tabRoot: {
    textTransform: 'uppercase',
    minWidth: 72,
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: theme.spacing.unit * 4,
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:hover': {
      color: '#40a9ff',
      opacity: 1,
    },
    '&$tabSelected': {
      color: '#1890ff',
      fontWeight: theme.typography.fontWeightMedium,
    },
    '&:focus': {
      color: '#40a9ff',
    },
  },
  tabSelected: {},
  typography: {
    padding: theme.spacing.unit * 3,
  },
});

class CustomizedTabs extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value : 0
    }
  }

  handleChange = (event, value) => {
    this.setState({ 
      value: value
    });

    this.props.selectPage({ value });

    if(value == "3"){
 
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
              .then(function (response) {
                  //handle success
                  console.log(response.data.result)
                  
              })
              .catch(function (response) {
                  //handle error
                  console.log(response);
              });
            }
        })
    }
  }

  render() {
    const { classes } = this.props;
    const { value } = this.state;
  
    return (
      <div className={classes.root}>
        <Tabs
          value={value}
          onChange={this.handleChange}
          classes={{ root: classes.tabsRoot, indicator: classes.tabsIndicator }}
          centered
        >
          <Tab
            classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
            label="query"
          />
          <Tab
            classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
            label="query all"
          />
          <Tab
            classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
            label="transfer"
          />
          <Tab
            classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
            label="create"
          />
          <Tab
            classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
            label="change user"
          />
        </Tabs>
      </div>
    );
  }
}

CustomizedTabs.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CustomizedTabs);