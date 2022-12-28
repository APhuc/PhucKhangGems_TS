import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined
  DetailProduct: { idProduct: number, countLike: number }
  DetailCart: undefined
  Contact: undefined
  Policy: undefined
}

export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  Screen
>

export type RootTabParamList = {
  Home: undefined
  MyOrder: undefined
  Information: undefined
  Account: undefined
}

export type RootTabScreenProps<Screen extends keyof RootTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<RootTabParamList, Screen>,
  NativeStackScreenProps<RootStackParamList>
>