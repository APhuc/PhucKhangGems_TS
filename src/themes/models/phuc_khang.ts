const phucKhang = {
  BG_APP: 'white',
  BG_SEARCH_PRODUCT: '#F3F4F6',
  COLOR_TEXT_MONNEY: '#f6821f',
  COLOR_SHADOW: '#000',
  COLOR_TEXT_MONNEY_THROUGH: '#777D82',
  COLOR_TEXT_PLACEHOLDER: '#4B5563',
  COLOR_TEXT_ERROR: 'red',
  COLOR_ICON: 'black',
  COLOR_PAGE_INDEX: '#9C9C9C',
  BG_CART: '#EEEEEE',
  COLOR_TEXT_NAME: '#333333',
  COLOR_ICON_COUNT: '#777777',
  COLOR_BORDER_COUNT: '#DDDDDD'
} as const

export type typePhucKhang = typeof phucKhang

export default phucKhang