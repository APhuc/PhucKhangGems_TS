export type typeGetProduct = {
  IDSanPham: number
  SoLuongYeuThich: number
  MaSanPham: string
  SoLuong: number
  TenSanPham: string
  URLImage: string
  URLImage2: string
  URLImage3: string
  URLImage4: string
  URLImage5: string
  GiaBan: number
  GiaTriTienTe: number
  GiamGia: number
  GiaSauGiam: number
  MoTa: string
  IDCuaHang: number
  IDDonViTinh: number
  TenBang: string
  KhoiLuong: number
  success: string | null
}

export type typeGetDetailProduct = {
  TenSanPham: string
  MaSanPham: string
  GiaBan: number
  GiaTriTienTe: number
  GiamGia: number
  GiaSauGiam: number
  MoTa: string
  TenCuaHang: string
  DiaChiCuaHang: string
  DienThoaiCuaHang: string
  EmailCuaHang: string
  URLImage: string
  URLImage2: string
  URLImage3: string
  URLImage4: string
  URLImage5: string
  KhoiLuong: number
  success: string | null
}

export type typeGetProductCart = {
  IDSanPham: number
  MaSanPham: string
  SoLuong: number
  SoLuongTrongKho: number
  TenSanPham: string
  URLImage: string
  GiaBan: number
  GiaTriTienTe: string
  GiamGia: number
  GiaSauGiam: number
  MoTa: string
  IDCuaHang: number
  DienThoaiCuaHang: string
  IDDonViTinh: number
  ThoiGianBaoHanh: number
  TenBang: string
  TenQuan: string
  MaBang: string
  KhoiLuong: number
  success: string | null
}

export type typeGetCountry = {
  CountryCode: string
  CountryName: string
}

export type typeGetProvince = {
  StateCode: string
  StateName: string
}

export type typeGetWardDistrict = {
  ZipCode: string
  SubdivisionName: string
  SubdivisionName2: string
  StateCode: string
  StateName: string
  CityName: string
  CityName2: string
  CityName3: string
}

export type typeGetDelivery = {
  IDHinhThucThanhToan: number
  TenHinhThucThanhToan: string
  value: number
  label: string
  success: string | null
}

export type typeGetReceive = {
  IDHinhThucNhanHang: number
  TenHinhThucNhanHang: string
  value: number
  label: string
  success: string | null
}

export type typeGetTransfer = {
  value: number
  label: string
  TypeUrl: string
  MaNhaVanChuyen: string
  GiaToiThieuNoiTinh: number
  GiaToiThieuLienTinh: number
  IsEdit: number
  SoThuTu: number
  success: string | null
}

export type typeGetDeliveryCharges = {
  success: string | null
  cuocphi: number
  khuvucduocgiaohang: string
}

type typeGetOrder = {
  MaDonHang: string
  HoTenNguoiNhan: string
  DiaChiNhan: string
  DienThoaiKhachHang: string
  TongSoLuong: number
  TongSoTien: number
  NgayDatHang: string
  GhiChu: string
  TenHinhThucNhanHang: string
  TenHinhThucThanhToan: string
  IDNguoiThucHien: string | null
  VAT: number
  SoTienGiam: number
  PhiShip: number
  TenBangNhan: string
  TenQuanNhan: string
  Email: string
}

type typeGetProductPayment = {
  MaSanPham: string
  TenSanPham: string
  SoLuong: number
  ThanhTien: number
  NgayBatDauBaoHanh: string | null
  NgayHetHanBaoHanh: string | null
}

export type typeGetPayment = {
  DonHang: typeGetOrder[]
  SanPham: typeGetProductPayment[]
}