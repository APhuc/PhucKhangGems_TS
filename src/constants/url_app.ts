const serverUrl = 'https://uat.phuckhanggem.com'

const logoUrl = `${serverUrl}/_imageslibrary/logonotext.png`

const logoTextUrl = `${serverUrl}/_imageslibrary/logo.png`

const apiUrl = `${serverUrl}/api/API/`

const postUrl = {
  getProduct: `${apiUrl}GetSanPham`,
  productHandling: `${apiUrl}XuLySanPham`,
  getOfficialAddressInformation: `${apiUrl}GetThongTinDiaChinh`,
  getStoreInformation: `${apiUrl}GetThongTinCuaHang`,
  deliveryCharges: `${apiUrl}TinhCuocVanChuyen`,
  payment: `${apiUrl}ThanhToan`,
  getPosts: `${apiUrl}GetBaiViet`,
  getOrder: `${apiUrl}GetThongTinDonHang`
} as const
type typePostUrl = typeof postUrl
type keyPostUrl = keyof typePostUrl
export type valuePostUrl = typePostUrl[keyPostUrl]

const urlApp = {
  serverUrl, apiUrl, postUrl,
  logoUrl, logoTextUrl
}

export default urlApp