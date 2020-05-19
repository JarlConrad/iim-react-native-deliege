import React from "react";
import {Button, Image, StyleSheet, Text, View} from "react-native";
import {TouchableOpacity} from "react-native-gesture-handler";

export default class ItemList extends React.Component{
    _onPress(item){
        this.props.navigation.navigate('Details',
            {
                product_name: item.product.product_name,
                item: item
            })
    }

    render() {
        return (
            <View style={styles.lineContainer} >
                <TouchableOpacity style={styles.lineContainerTouchable} onPress={()=> this._onPress(this.props.item)}>
                    <View style={styles.lineContainerImg}>
                        <Image
                            style={{ width: "100%", height: "100%" }}
                            resizeMode={"contain"}
                            source={{uri: this.props.item.product.image_small_url }}
                        />
                    </View>
                    <Text style={{flex: 2}}>{this.props.item.product.product_name}</Text>
                    <Button style={{flex: 1}} title={'Details'}/>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    lineContainer: {
        padding: 10,
        height: 100,
        backgroundColor: '#fff',
        flexDirection: 'column'
    },
    lineContainerTouchable: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    lineContainerImg: {
        height: 80,
        flex: 1
    },
});