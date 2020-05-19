import React from 'react';
import { Text, View, StyleSheet,SafeAreaView, Image, TouchableOpacity } from 'react-native';
import { Icon } from 'native-base';

export default class DetailsScreen extends React.Component {
    constructor(props) {
        super(props);
        console.log(props);
    }

    render() {

        return(
            <SafeAreaView style={{flex: 1, paddingTop:20}}>
                <Text>{this.props.route.params.product_name}</Text>
                {/*<TouchableOpacity*/}
                {/*    onPress={() => this.props.navigation.navigate('FullImage', { imageSource: this.props.route.params.item.image_url })}*/}
                {/*>*/}
                    <Image
                        source={{uri: this.props.route.params.item.image_small_url }}
                        style={{ alignSelf: 'center', width: 200, height: 200, borderRadius: 100 }}
                    />
                    <Text>{this.props.route.params.item.nutriments["energy-kcal"]}</Text>
                {/*</TouchableOpacity>*/}
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    lineContainer: {
        height: 40,
        padding: 10,

    },
});