import React from 'react';
import { Text, View, Image, TouchableOpacity, ImageBackground } from 'react-native';
import { Button,Icon } from 'native-base';

export default class FullImage extends React.Component {

    constructor(props){
        super(props);
        this.state = { }
    }

    static navigationOptions = {
        headerShown: false
    };

    render() {

        return(
            <View style={{flex:1}}>

                <ImageBackground source={{ uri: this.props.route.params.imageSource}} style={{width:'100%', height: '100%'}}>
                    <TouchableOpacity
                        style={{
                            flex: 0.5,
                            position: 'absolute',
                            right:0,
                            top: 0
                        }}
                        onPress={() => {
                            this.props.navigation.goBack()
                        }}
                    >
                        <Icon name="close" style={{ fontSize: 64, fontWeight: 'bold', marginTop: 40, marginRight:20, color: 'black', zIndex: 2 }} />
                    </TouchableOpacity>
                </ImageBackground>

            </View>
        );
    }
}

