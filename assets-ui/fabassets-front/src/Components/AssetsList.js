import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Laptop from '@material-ui/icons/Laptop';
import Tablet from '@material-ui/icons/Tablet';
import Mobile from '@material-ui/icons/StayCurrentPortrait'
import Logo from '../Components/Logo';

const styles = theme => ({
  root: {
    position: 'relative',
    overflow: 'auto',
    maxHeight: '30%',
    backgroundColor: theme.palette.background.paper,
  },
});

function FolderList(props) {
  const { classes } = props;
  const dataSize = props.data.length;


    if(dataSize > 100) {
        let sorted = JSON.parse(props.data).sort(function(a,b){
            return parseInt(a.Key.substr(5)) - parseInt(b.Key.substr(5))
        });


      return(
        <div className={classes.root}>
          <p class="MuiTypography-root-72 MuiTypography-body1-81 MuiTypography-colorTextSecondary-95 Block-title-192">ASSETS</p>
          <div style={{display:'inline-block'}}>
            {
              sorted.map((asset) => {

                const adminOwned = asset.Record.owner === "admin" || asset.Record.owner === "UNASSIGNED";

                return(

                  <div className={'Asset'}> 

                  {adminOwned ? <div className='available'>AVAILABLE</div> : <div></div>}

                  <div style={{float:'left'}}>
                      
                      {(function() {
                        switch(asset.Record.model) {
                          case 'iPad': return <Avatar style={{backgroundColor: '#87b847'}}><Tablet /></Avatar>;
                          case 'iPad Pro': return <Avatar style={{backgroundColor: '#87b847'}}><Tablet /></Avatar>;
                          case 'iPad Mini': return <Avatar style={{backgroundColor: '#87b847'}}><Tablet /></Avatar>;
                          case 'Quest': return <Avatar style={{backgroundColor:'#599ca6'}}>VR</Avatar>;
                          case 'Rift': return <Avatar style={{backgroundColor:'#599ca6'}}>VR</Avatar>;
                          case 'iPhone': return <Avatar style={{backgroundColor:'#5aa58e'}}><Mobile /></Avatar>;
                          case 'iPhone 7': return <Avatar style={{backgroundColor:'#5aa58e'}}><Mobile /></Avatar>;
                          case 'iPhone 5c': return <Avatar style={{backgroundColor:'#5aa58e'}}><Mobile /></Avatar>;
                          default: return <Avatar style={{backgroundColor: '#c73861'}}><Laptop /></Avatar>;
                        }
                      })()}
                       
                  </div>
                  <div className={'AssetText'}>
                    {asset.Record ? 
                      <ListItemText primary={asset.Key} secondary={`${asset.Record.owner}'s ${asset.Record.make} ${asset.Record.model} (${asset.Record.color})`} />
                    : <ListItemText primary={asset.Key} secondary={asset.Msg}/>
                    }
                  </div>
                </div>
                );
              })
            }
          </div>

        </div>
      );

    } else if (dataSize !== 0) {

        var asset = JSON.parse(props.data);

      return(
        <div className={classes.root}>
          <List>
                <ListItem>
                    <Avatar>
                      <Laptop />
                    </Avatar>
                    <ListItemText primary={asset.owner} secondary={`${asset.owner}'s ${asset.make} ${asset.model} (${asset.color})`} />
                </ListItem>
          </List>
        </div>
      );
    }

    return(
    <Logo />
    );

}

FolderList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FolderList);