export type IntWeight = 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9

export const fontFamilyApp = (weight: IntWeight) => {
  return `Nunito[${weight}00]`
}