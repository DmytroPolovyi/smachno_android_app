import axios from 'axios';

const instance = axios.create({
  withCredentials: true,
  baseURL: 'http://smachno.net/api/v1/',
  headers: {
    Host: 'smachno.net'
  }
})

export const Home = {
  fetchDataAll() {
    return instance.get('categories/all')
  },
  fetchCategory(id, offset) {
    return instance.get(`recipes/list?subcategory_id=${ id }&limit=20&offset=${ offset }`)

  },
  fetchLuckRecipe() {
    return instance.get('recipes/random')
  }
}

export const Recipe = {
  fetchRecipe(id) {
    return instance.get(`recipes/recipe?recipe_id=${ id }`)
  }
}

export const Search = {
  fullSearch(limit, offset, title) {
    return instance.post('recipes/full-search', {
      limit,
      offset,
      title,
    })
  },
}