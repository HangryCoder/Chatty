import AsyncStorage from '@react-native-async-storage/async-storage';

class LocalStorage {

    set = async (key, value) => {
        try {
            await AsyncStorage.setItem(key, value)
        } catch (e) {
            console.log("Error " + e)
        }
    }

    get = async () => {
        try {
            return await AsyncStorage.getItem('username')
        } catch (e) {
            console.log("Error " + e)
            return null
        }
    }
}

export default new LocalStorage()