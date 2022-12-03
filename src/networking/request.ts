const request = {
  getProduct: {
    loai: 1,
    sotrang: 1,
    soitem: 10
  }
} as const
type typeRequest = typeof request
type keyRequest = keyof typeRequest
export type valueRequest = typeRequest[keyRequest]

export default request
