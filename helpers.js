import { AsyncStorage } from 'react-native';

export async function retrieveHistoric() {
    try {
        return await AsyncStorage.getItem('historic', (err, result) => {
            return result;
        }).then(data => JSON.parse(data));
    } catch(e) {
        console.log(e);
    }
}

export async function storeHistoric(item) {
    let historic = [];
    await retrieveHistoric()
        .then(res => {
            if (res) {
                historic = res;
            }
        });

    historic.push(item);

    try {
        await AsyncStorage.setItem('historic', JSON.stringify(historic));
    } catch (e) {
        console.log(e)
    }
}

export async function clearHistoric() {
    await AsyncStorage.clear();
}