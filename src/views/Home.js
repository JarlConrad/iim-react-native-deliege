import React from 'react';

import { Text, View, ActivityIndicator, FlatList, StyleSheet, SafeAreaView, Button, Image, } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { retrieveHistoric, clearHistoric } from '../../helpers';

import ItemList from '../components/ItemList'

export default class HomeScreen extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isLoading: true,
            historic: []
        };
    }

    clearHistoricOnHome = async () => {
        await clearHistoric().then(() => this.setState({historic: []}));
    };

    getHistoric = async () => {
        await retrieveHistoric()
            .then(res => {
                setTimeout( () => {
                    this.setState({
                        isLoading: false,
                    });
                }, 1000);

                if (res) {
                    this.setState({
                        historic: res
                    })
                }
            });
    };

    async componentDidMount(){
        await this.getHistoric();

        this.props.navigation.addListener('focus', () => {
            this.setState({
                isLoading: true,
            });

            this.getHistoric();
        });
    }

    render() {
        if(this.state.isLoading){
            return(
                <View style={{flex: 1, padding: 20}}>
                    <ActivityIndicator/>
                </View>
            )
        } else if (this.state.historic && this.state.historic.length === 0) {
            return(
                <SafeAreaView style={{flex: 1, paddingTop:20, alignItems: 'center', justifyContent: 'center'}}>
                    <Text>Aucun produits dans l'historique</Text>
                </SafeAreaView>
            )
        }

        return(
            <SafeAreaView style={{flex: 1, paddingTop:20}}>

                <FlatList
                    data={this.state.historic}
                    renderItem={({item}) => <ItemList item={item} navigation={this.props.navigation} />}
                    keyExtractor={({id}, index) => index.toString()}
                />
                <Button title={'Delete historic'} onPress={this.clearHistoricOnHome}></Button>
            </SafeAreaView>
        );
    }
}
