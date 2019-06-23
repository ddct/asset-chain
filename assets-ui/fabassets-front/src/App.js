import React, { Component } from 'react';
import './App.css';
import Paper from '@material-ui/core/Paper';
import Main from './Containers/Main';
import Connected from './Containers/Connected';
import FeedController from './Containers/FeedController';
import Blocks from './Components/Blocks';
import Banner from './Containers/Banner';
import socketIOClient from 'socket.io-client'
import AssetsController from './Containers/Assets';

class App extends Component {

  constructor() {
    super()
    this.state = {
      showFeed: false,
      connected: false,
      socket : socketIOClient("40.117.233.118:4001"),
      blocks : [],
      owner: "thomas",
    }  

    this.switchFeedHandler = this.switchFeedHandler.bind(this);
    this.updateOwner = this.updateOwner.bind(this);
  }

  switchFeedHandler(val) {
    this.setState({
      ...this.state,
      showFeed : (val === 0)
    })
  }

  updateOwner(val) {
    this.setState({
        ...this.state,
        owner: val
    })
  }

  componentDidMount() {
    this.state.socket.on('connect', () => {
      this.setState({
        ...this.state,
        connected: true
      })
      console.log(`Connected to server with id ${this.state.socket.id}`)
    })

    this.state.socket.on('disconnect', () => {
      this.setState({
        ...this.state,
        connected: false
      })
      console.log('disconnected from server')
    })

    this.state.socket.on( 'BLOCKUDPATE', (newBlock) => {
      for (let i=0 ; i<this.state.blocks.length ; i++) {
        if (this.state.blocks[i].number === newBlock.number){
          //block already in blocks array
          return
        }
      }
      this.setState({
        ...this.state,
        blocks: [newBlock ,...this.state.blocks].sort((a,b) =>  parseInt(a.number,10) < parseInt(b.number,10))
      })
      console.log(`New block ${newBlock.number} added`);
    })
    
  }

  render() {
    return (
      <div className="App">
        <div className="Banner-container">
          <Banner />
        </div>
            <AssetsController switchFeedHandler={this.switchFeedHandler}   socket={this.state.socket}/>

        <div className="Main-container">
          <Main socket={this.state.socket} switchFeedHandler={this.switchFeedHandler} connected={this.state.connected} owner={this.state.owner} updateOwner={this.updateOwner}/>
        </div>
        <div className="Feed-container">
          <Paper classes={{root: "Page-container"}}>
            <FeedController showFeed={this.state.showFeed} switchFeedHandler={this.switchFeedHandler} socket={this.state.socket}/>
          </ Paper>
        </div>
        <div className="Blocks-container">  
            <Blocks blocks={this.state.blocks}/>
        </div>
        <div className="Connected-button">
          <Connected connected={this.state.connected} socketID={this.state.socket.id}/>
        </div>
      </div>
    );
  }
}

export default App;
