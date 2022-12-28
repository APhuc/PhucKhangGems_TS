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
    chuyenphatnhanh: false,//auto
    giatoithieunoitinh: 0,
    giatoithieulientinh: 0
  },
  payment: {
    dienthoai: '',//user login
    dienthoainhan: '',
    tenkhachhang: '',// ten nguoi nhan
    maquocgia: '',
    tenquocgia: '',
    mabang: '',
    thanhpho: '',//có zip code
    tenbang: '',// tinh
    tenquan: '',
    diachi: '',
    hinhthucnhanhang: 0,
    hinhthucthanhtoan: 0,
    dichvucongthem: [], // auto ribf 
    ghichu: '',
    magiamgia: '',//
    nhantaicuahang: 0, // hinhthucnhanhang
    magiamgias: '',// nguoi dung nhap
    email: '',
    ho: '',//ten nguoi nhan
    ten: '',//ten nguio nhhan
    sanphamdachon: [] as any,
    phiship: 0,
    sotiengiam: 0 // so tien giam
  },
  voucher: {
    loai: 63,
    magiamgia: ''
  },
  getContact: {
    loai: 1
  },
  getPolicy: {
    loai: 11,
    thuoc: 'chinh-sach'
  },
  getOrderByCode: {
    loai: 10,
    madonhang: '',
    soitem: 10,
    page: 1
  },
  getOrderByPhone: {
    loai: 10,
    dienthoaikhachhang: '',
    soitem: 10,
    page: 1
  }
}

type typeRequest = typeof request
type keyRequest = keyof typeRequest
export type valueRequest = typeRequest[keyRequest]

export default request
