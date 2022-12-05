import AsyncStorage from '@react-native-async-storage/async-storage'

import { valueKeyStorage } from './key_storage'

export const setStringValueStorage = async (key: valueKeyStorage, value: string) => {
  try {
    await AsyncStorage.setItem(key, value)
  } catch (e) {
    // saving error
  }
}

export const setObjectValueStorage = async (key: valueKeyStorage, value: object) => {
  try {
    const jsonValue = JSON.stringify(value)
    await AsyncStorage.setItem(key, jsonValue)
  } catch (e) {
    // saving error
  }
}

export const getStringValueStorage = async (key: valueKeyStorage) => {
  try {
    const value = await AsyncStorage.getItem(key)
    return value
  } catch(e) {
    // error reading value
  }
}

export const getObjectValueStorage = async (key: valueKeyStorage) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key)
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch(e) {
    // error reading value
  }
}

export const removeValueStorage = async (key: valueKeyStorage) => {
  try {
    await AsyncStorage.removeItem(key)
  } catch(e) {
    // remove error
  }
}