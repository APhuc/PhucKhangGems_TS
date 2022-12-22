import { NativeStackScreenProps } from '@react-navigation/native-stack'

export type RootStackParamList = { 
  Home: undefined
  DetailProduct: { idProduct: number, countLike: number }
  DetailCart: undefined
}

export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  Screen
>