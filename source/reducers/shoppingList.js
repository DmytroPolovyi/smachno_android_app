import React from 'react';
import { Recipe } from '../actions/app';
import { AsyncStorage } from 'react-native';


const ADD_SHOP_ITEM = 'SHOPPING_LIST/ADD_SHOP_ITEM'
const SET_SHOP_LIST = 'SHOPPING_LIST/SET_SHOP_LIST'
const SET_RECIPE = 'SHOPPING_LIST/SET_RECIPE'
const DELETE_SHOP_ITEM = 'SHOPPING_LIST/DELETE_SHOP_ITEM'
const DELETE_ALL_SHOP_ITEM = 'SHOPPING_LIST/DELETE_ALL_SHOP_ITEM'
const SELECTED_SHOP_ITEM = 'SHOPPING_LIST/SELECTED_SHOP_ITEM'

const initialState = {
  shopList: null,
  recipe: null
}

export const shopList = (state = initialState, action) => {
  switch (action.type) {
    case SET_SHOP_LIST:
      return {
        ...state,
        shopList: JSON.parse(action.data)
      }
    case ADD_SHOP_ITEM:
      if (state.shopList !== null) {
        return {
          ...state,
          shopList:
            [ ...state.shopList.filter(item => item.recipeId !== action.obj.recipeId), {...action.obj} ]
        }
      } else {
        return {
          ...state,
          shopList: [ {...action.obj} ]
        }
      }
    case SET_RECIPE:
      return {
        ...state,
        recipe: action.recipe
      }
    case DELETE_ALL_SHOP_ITEM:
      return {
        ...state,
        shopList: []
      }
    case DELETE_SHOP_ITEM:
      return {
        ...state,
        shopList:
          [ ...state.shopList.filter(item => item.recipeId !== action.id) ]
      }
    case SELECTED_SHOP_ITEM:
      return {
        ...state,
        shopList: state.shopList.map(item => {
          const obj = action.array.find(a => +a.recipeId === +item.recipeId)
          if (+item.recipeId === (obj ? obj.recipeId: false )) {
            const arr1 = item.shopList
            const arr2 = obj.item
            const arr3 = arr1.filter(e => arr2.findIndex(i => +i.id === +e.id) === -1);
            return {recipeId: item.recipeId, recipeTitle: item.recipeTitle, shopList: arr3}
          }
          return item
        })
      }
    default:
      return state;
  }
}

const addShopItem = (obj) => ({type: ADD_SHOP_ITEM, obj});
const setShopList = (data) => ({type: SET_SHOP_LIST, data});
const setRecipe = (recipe) => ({type: SET_RECIPE, recipe});
const deleteShopItem = (id) => ({type: DELETE_SHOP_ITEM, id});
const deleteAllShopItem = (id) => ({type: DELETE_ALL_SHOP_ITEM, id});
const selectedShopItem = (array) => ({type: SELECTED_SHOP_ITEM, array});

export const addShoppingItem = (obj) => (dispatch) => {
  dispatch(addShopItem(obj))
  updateAsyncStorage()
}
export const deleteItem = (id) => (dispatch) => {
  dispatch(deleteShopItem(id))
  updateAsyncStorage()
}
export const deleteAllItem = (id) => (dispatch) => {
  dispatch(deleteAllShopItem(id))
  updateAsyncStorage()
}
export const selectedShopList = (arr) => (dispatch) => {
  const array = arr.map(obj => {
    return { ...obj,
      item: obj.item.filter(i => i.value !== false )}
  } )
  dispatch(selectedShopItem(array))
  updateAsyncStorage()
}

const updateAsyncStorage = async () => {
  try {
    let json = JSON.stringify(store.getState().shopList.shopList.filter(item => {
      return item.shopList !== null && item.shopList.length > 0
    }))
    await AsyncStorage.setItem('shoppingList', json);
  } catch (error) {
    console.log(error, 'some error')
  }
};

export const getRecipe = (id) => async (dispatch) => {
  let data = await Recipe.fetchRecipe(id)
  dispatch(setRecipe(data.data))
  updateAsyncStorage()
}

export const getShopList = (key) => async (dispatch) => {
  try {
    const value = await AsyncStorage.getItem(key);
    dispatch(setShopList(value))
  } catch (error) {
    console.log(error, 'some error')
  }
}

