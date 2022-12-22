export const keyStorage = {
  storage_like_product: '@storage_like_product',
  storage_token: '@storage_token'
}

type typeKeyStorage = typeof keyStorage
type keyKeyStorage = keyof typeKeyStorage
export type valueKeyStorage = typeKeyStorage[keyKeyStorage]