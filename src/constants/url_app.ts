const serverUrl = 'https://uat.phuckhanggem.com/'

const logoUrl = `${serverUrl}_imageslibrary/logonotext.png`

const apiUrl = `${serverUrl}api/API/`

const postUrl = {
  getProduct: `${apiUrl}GetSanPham`
}
type typePostUrl = typeof postUrl
type keyPostUrl = keyof typePostUrl
type valuePostUrl = typePostUrl[keyPostUrl]

const urlApp = {
  serverUrl, logoUrl, apiUrl, postUrl
}



export default urlApp