import React, { useState, useEffect } from 'react';
import {Text, View, Button, StyleSheet, Image} from 'react-native';
import { Camera } from 'expo-camera';
import { storeHistoric } from '../../helpers';

import ItemList from '../components/ItemList'

const { FlashMode: CameraFlashModes, Type: CameraTypes } = Camera.Constants;

export default class Scan extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            isFlashOn: false,
            flashState: Camera.Constants.FlashMode.off,
            hasCameraPermission: null,
            type: Camera.Constants.Type.back,
            scanned: null,
            itemScanned: null
        };
    }

    async componentDidMount() {
        const status = await Camera.requestPermissionsAsync();
        this.setState({ hasCameraPermission: status.status === 'granted' });

        this.props.navigation.addListener('focus', () => {
            this.setState({
                scanned: null
            });
        });
    }

    changeFlash(){
        this.state.isFlashOn ?
            this.setState({isFlashOn:false, flashState: Camera.Constants.FlashMode.off}) :
            this.setState({isFlashOn:true, flashState: Camera.Constants.FlashMode.torch})
    }

    handleBarCodeScanned = async ({ type, data }) => {
        await fetch(`https://world.openfoodfacts.org/api/v0/product/${data}.json`)
            .then((res) => res.json())
            .then(async (dataProduct) => {
                this.setState({
                    scanned: true,
                    itemScanned: dataProduct
                });
                await storeHistoric(dataProduct);
                console.log('Scan done');
            });
        /*this.props.navigation.navigate('Details', { data: data })*/
    };


    render(){
        const { hasCameraPermission } = this.state;
        if (hasCameraPermission === null) {
            return <View />;
        } else if (hasCameraPermission === false) {
            return (
                <View>
                    <Text>No access to camera</Text>
                </View>
            );
        } else {
            return (
                <View style={{ flex: 1 }}>
                    <Camera
                        type={this.state.type}
                        flashMode={this.state.flashState}
                        onBarCodeScanned={this.state.scanned ? undefined : this.handleBarCodeScanned}
                        style={{
                            flex: 1,
                            flexDirection: 'column',
                            justifyContent: 'flex-end'
                        }}

                    >

                        <Button title={'Flash'} onPress={()=> this.changeFlash()} />
                        <Button title={'Recommencer'} onPress={()=> this.setState({scanned: null, itemScanned: null})} />
                        {this.state.scanned && this.state.itemScanned ?
                            <ItemList item={this.state.itemScanned} navigation={this.props.navigation} /> :
                            null}
                    </Camera>
                </View>
            );
        }
    }
}