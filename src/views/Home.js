import React from 'react';

import { Text, View, ActivityIndicator, FlatList, StyleSheet, SafeAreaView, Button, Image, } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
//import {ListItem} from '../components/ListItem'



class ListItem extends React.Component{
    _onPress(item){
        this.props.navigation.navigate('Details',
        {
            product_name: item.product_name,
            item: item
        })
    }

    render() {
        return (
            <View style={styles.lineContainer}>
                <TouchableOpacity onPress={()=> this._onPress(this.props.item)}>
                    <Text style={styles.textLino}>{this.props.item.product_name}</Text>
                </TouchableOpacity>
            </View>
        )
    }
}


export default class HomeScreen extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isLoading: true
        }

        this.historic = JSON.parse(localStorage.getItem('historic')) ? JSON.parse(localStorage.getItem('historic')) : [];
    }

    componentDidMount(){
        return fetch('https://fr-en.openfoodfacts.org/category/pizzas/1.json')
            .then((response) => response.json())
            .then((responseJson) => {


                this.setState({
                    isLoading: false,
                    dataSource: responseJson.products,
                });

            })
            .catch((error) =>{
                console.error(error);
            });
    }

    render() {
        if(this.state.isLoading){
            return(
                <View style={{flex: 1, padding: 20}}>
                    <ActivityIndicator/>
                </View>
            )
        }

        return(
            <SafeAreaView style={{flex: 1, paddingTop:20}}>

                <FlatList
                    data={this.state.dataSource}
                    renderItem={({item}) => <ListItem item={item} navigation={this.props.navigation} />}
                    keyExtractor={({id}, index) => id}
                />
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