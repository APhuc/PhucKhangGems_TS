const request = {
  getProduct: {
    loai: 1,
    sotrang: 1,
    soitem: 10,
    timkiem: ''
  },
  getDetailProduct: {
    loai: 4,
    idsanpham: 0
  },
  productHandling: {
    loai: 5,
    idsanpham: 0,
    yeuthich: 1 as 1 | -1
  },
  getCart: {
    loai: 21,
    idsanphams: ''
  },
  getCountry: {
    loai: 'quocgia'
  },
  getProvince: {
    loai: 'bang',
    CountryCode: ''
  },
  getWardDistrict: {
    loai: 'zipcode',
    CountryCode: '',
    StateCode: ''
  },
  getDelivery: {
    loai: 26
  },
  getReceive: {
    loai: 25
  },
  getTransfer: {
    loai: 27,
    mabanghotro: ''
  },
  deliveryCharges: {
    idcuahang: 0,
    matinhgui: '',
    tinhgui: '',
    quangui: '',
    matinhnhan: '',
    tinhnhan: '',
    quannhan: '',
    diachinhan: '',
    trongluong: 0,
    trigia: 0,
    manhavanchuyen: '',
    chuyenphatnhanh: false,
    giatoithieunoitinh: 0,
    giatoithieulientinh: 0
  },
  payment: {
    dienthoai: '',
    dienthoainhan: '',
    tenkhachhang: '',
    maquocgia: '',
    tenquocgia: '',
    mabang: '',
    thanhpho: '',
    tenbang: '',
    tenquan: '',
    diachi: '',
    hinhthucnhanhang: 0,
    hinhthucthanhtoan: 0,
    dichvucongthem: [{"ID":4,"DonGia":"15000","SoLuong":1}],
    ghichu: '',
    magiamgia: '', 
    nhantaicuahang: 0,
    magiamgias: '',
    email: '',
    ho: '',
    ten: '',
    sanphamdachon: [] as any,
    phiship: 0,
    sotiengiam: 0
  }
}

type typeRequest = typeof request
type keyRequest = keyof typeRequest
export type valueRequest = typeRequest[keyRequest]

export default request
