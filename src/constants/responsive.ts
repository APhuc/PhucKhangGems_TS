import { Dimensions } from 'react-native'

export const {width, height} = Dimensions.get('window')

export const guidelineBaseWidth = 350
export const guidelineBaseHeight = 680

export const scale = (size: number) => width / guidelineBaseWidth * size;
export const verticalScale = (size: number) => height / guidelineBaseHeight * size

/*iphone 8: 0.8
    ip 5s: --- 320x568
    ip se: --- 320x568
    ip 6: ---- 375x667
    ip 6s: --- 375x667
    ip 6s+: --- 414x736
    ip 7: --- 375x667
    ip 7+: --- 414x736
    ip 8: --- 375x667
    ip 8+: --- 414x736
    ip x: --- 375x812
    ip xs: --- 375x812
    ip xs max: --- 414x896
*/