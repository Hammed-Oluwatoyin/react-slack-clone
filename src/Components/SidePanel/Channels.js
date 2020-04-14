import React from 'react';
import {Menu, Icon , Modal, Form, Input,Button } from 'semantic-ui-react';
import firebase from '../../firebase';
import {connect} from 'react-redux';
import {setCurrentChannel} from '../../redux/channel/channelActions';


class Channels extends React.Component {
    state ={
        activeChannel: '',
        channels:[],
        channelName:'',
        channelDetails:'',
        modal: false,
        firstLoad: true,
        channelsRef: firebase.database().ref('channels')

    }




    componentDidMount(){
        this.addListeners();
    }
    componentWillUnmount(){
        this.removeListener();
    }

    removeListeners = () => {
        this.state.channelsRef.off();
    }



    addListeners = () => {
        let loadedChannels = [];
        this.state.channelsRef.on('child_added', snap =>{
            loadedChannels.push(snap.val());
            console.log(loadedChannels);
            this.setState({ channels: loadedChannels}, () => this.setFirstChannel());
        })
    }

    setActiveChannel = (channel) => {
        this.setState({activeChannel: channel.id})
    }

changeChannel = channel => {
    this.setActiveChannel(channel);
    this.props.setCurrentChannel(channel);
    

}

    displayChannels = channels => (
        channels.length > 0 && channels.map(channel => (
            <Menu.Item 
            key={channel.id}
            onClick={()=> this.changeChannel(channel)}
            name={channel.name}
            style={{opacity: 0.7}}
             active={channel.id === this.state.activeChannel}>
                #{channel.name}
            </Menu.Item>
        )) 
    )

    closeModal =() =>{
         this.setState({modal: false});
    }
    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});

    }
    openModal = () => {
        this.setState({modal: true});
    }
    

    isFormValid =({channelName, channelDetails} ) => channelName && channelDetails; 

    addChannel =( ) => {
        const {channelsRef ,channelName, channelDetails} = this.state;
        const {currentUser} = this.props;

        const key = channelsRef.push().key;

        const newChannel ={
            id:key,
            name: channelName,  
            details: channelDetails,
            createdBy:{
                name:currentUser.displayName,
                avatar:currentUser.photoURL
            }
        };

        channelsRef
        .child(key)
        .update(newChannel)
        .then(() => {
            this.setState({channelName:'', channelDetails: ''});
            this.closeModal();
            console.log('channel added');
        })
        .catch(err => {
            console.error(err);
        })

        


         

    }


    handleSubmit = (event) => {
        event.preventDefault();
        if(this.isFormValid(this.state)){
            this.addChannel();
        }
    }


    setFirstChannel =() => {
        const firstChannel = this.state.channels[0];
        if(this.state.firstLoad && this.state.channels.length > 0){
            this.props.setCurrentChannel(firstChannel);
            this.setActiveChannel(firstChannel);
        }
        this.setState({ firstLoad:false });
    }

    render (){
        const {channels, modal} = this.state; 
        return (
            <React.Fragment>
        <Menu.Menu styles = {{paddingBottom:'2em'}}>
               <Menu.Item>
                   <span>
                       <Icon name='exchange' /> CHANNELS
                   </span>{" "}
                ({channels.length}) <Icon name='add' onClick={this.openModal}/>
               </Menu.Item>
               {this.displayChannels(channels)}
           </Menu.Menu> 
           <Modal basic open={modal} onClose={this.closeModal}>

            <Modal.Header>add a channel </Modal.Header>
            <Modal.Content>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Field>
                        <Input
                        fluid
                        label='Name of Channel'
                        name='channelName'
                        onChange={this.handleChange}/>
                    </Form.Field>
                    <Form.Field>
                        <Input
                        fluid
                        label='About the Channel'
                        name='channelDetails'
                        onChange={this.handleChange}/>
                    </Form.Field>

                </Form>
            </Modal.Content>
            <Modal.Actions>
                <Button color="green" inverted onClick={this.handleSubmit}>
                    <Icon name='checkmark'/> Add

                </Button>
                <Button color="red" inverted onClick={this.closeModal}>
                    <Icon name='remove'/> Cancel

                </Button>
            </Modal.Actions>
           </Modal>
            </React.Fragment>
          
        )
    }
}

 const mapDispatchToProps = dispatch =>({
    setCurrentChannel: channel => dispatch(setCurrentChannel(channel))

 })
export default connect(null , mapDispatchToProps)(Channels);