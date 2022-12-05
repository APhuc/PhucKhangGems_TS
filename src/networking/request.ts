const request = {
  getProduct: {
    loai: 1,
    sotrang: 1,
    soitem: 10,
    timkiem: ''
  },
  productHandling: {
    loai: 5,
    idsanpham: 0,
    yeuthich: 1 as 1 | -1
  }
}
type typeRequest = typeof request
type keyRequest = keyof typeRequest
export type valueRequest = typeRequest[keyRequest]

export default request
