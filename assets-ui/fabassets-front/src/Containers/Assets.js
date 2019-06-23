import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import FeedNav from './FeedNav';
import AssetsList from '../Components/AssetsList';
import FeedList from '../Components/FeedList';
import { Divider } from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

class AssetsController extends Component {

  constructor(props) {
    super(props)

    this.state = {
      feed : [],
      info : []
    }
  }

  dataHandler(data) {
    if(data.type === 'INFO'){
      const newFeed = [<Divider key={data.payload}/>, ...this.state.feed]
      this.props.switchFeedHandler(0);
      this.setState({
        feed : newFeed,
        info: data.payload
      })
    }
  }

  componentDidMount() {
    this.props.socket.on('queryAllResponse', (data) => {
      this.dataHandler(data);
      })
    this.props.socket.on('RESPONSE', (data) => {
      this.dataHandler(data);
      })
  }

  render() {
    console.log(this.state.info);
    if(this.state.info.length > 0){
      return (
        <Paper classes={{root: "Assets-container"}}>
          {<AssetsList data={this.state.info}/>}
        </ Paper>
      );
    }else{
      return (
        ''
      );
    }
  }
}

export default AssetsController;
