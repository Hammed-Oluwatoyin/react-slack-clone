import React from 'react';
import {Sidebar, Menu, Divider, Button} from "semantic-ui-react";


class ColorPanel extends React.Component {
    render() {
        return (
            <Sidebar
            
            
            icon='labelled'
            inverted = 'true'
            vertical ='true'
            visible = {true}
            width='very thin'>
                <Divider/>
                <Button icon='add' size="small" color='blue'/>


            </Sidebar>
        )
    }
}

export default ColorPanel;