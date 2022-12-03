import { Dimensions } from 'react-native'

export const {width, height} = Dimensions.get('window')

export const guidelineBaseWidth = 360
export const guidelineBaseHeight = 592

export const scale = (size: number) => width / guidelineBaseWidth * size;
export const verticalScale = (size: number) => height / guidelineBaseHeight * size