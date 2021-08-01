const FRUIT_ENDPOINT = 'http://62.109.7.98/api'

class FruitApiService {
  async getDefaultCategories() {
    const url = `${FRUIT_ENDPOINT}/categories`
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    })
    if (!response.ok) {
      throw new Error(`FruitApiService getDefaultCategories failed, HTTP status ${response.status}`)
    }
    const data = await response.json()
    if (!data) {
      throw new Error(`FruitApiService getDefaultCategories failed, data not returned`)
    }
    return data.data
  }

  async getProducts(subredditUrl) {
    const url = `${FRUIT_ENDPOINT}/product/category/${subredditUrl}`
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    })
    if (!response.ok) {
      throw new Error(`FruitApiService getDefaultCategories failed, HTTP status ${response.status}`)
    }
    const data = await response.json()
    if (!data) {
      throw new Error(`FruitApiService getDefaultCategories failed, data not returned`)
    }
    return data.data
  }
}

export default new FruitApiService()
