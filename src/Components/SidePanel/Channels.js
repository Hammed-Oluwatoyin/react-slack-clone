import React from 'react';
import {Menu, Icon , Modal, Form, Input,Button } from 'semantic-ui-react';
import firebase from '../../firebase';


class Channels extends React.Component {
    state ={

        channels:[],
        channelName:'',
        channelDetails:'',
        modal: false,
        channelsRef: firebase.database().ref('channels')
    }

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
               {/*Channels*/}
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
export default Channels;