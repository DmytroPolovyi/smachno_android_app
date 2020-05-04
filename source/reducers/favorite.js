import React from 'react';
import { Recipe } from '../actions/app';
import { AsyncStorage } from 'react-native';

const SET_FAVORITE = 'FAVORITE/SET_FAVORITE'
const SET_FAVORITE_RECIPE = 'FAVORITE/SET_FAVORITE_RECIPE'
const ADD_FAVORITE = 'FAVORITE/ADD_FAVORITE'
const DELETE_FAVORITE = 'FAVORITE/DELETE_FAVORITE'

const initialState = {
  favorite: [],
}

export const favorite = (state = initialState, action) => {
  switch (action.type) {
    case SET_FAVORITE:
      return {
        ...state,
        favorite: JSON.parse(action.data)
      }
    case ADD_FAVORITE:
      if (state.favorite !== null) {
        return {
          ...state,
          favorite:
            [ ...state.favorite, {key: action.obj.id, value: action.obj} ]
        }
      } else {
        return {
          ...state,
          favorite: [ {key: action.obj.id, value: action.obj} ]
        }
      }
    case DELETE_FAVORITE:
      return {
        ...state,
        favorite: [ ...state.favorite.filter(item => (item.key !== action.key)), {key: action.key, value: false} ]
      }
    default:
      return state;
  }
}

const addFavorite = (obj) => ({type: ADD_FAVORITE, obj});
const deleteFavorite = (key) => ({type: DELETE_FAVORITE, key});
const setFavorite = (data) => ({type: SET_FAVORITE, data});
const setFavoriteRecipe = (data) => ({type: SET_FAVORITE_RECIPE, data});

export const addFavoriteItem = (obj) => (dispatch) => {
  dispatch(addFavorite(obj))
  updateAsyncStorage()
}
export const deleteFavoriteItem = (id) => (dispatch) => {
  dispatch(deleteFavorite(id))
  updateAsyncStorage()
}

const updateAsyncStorage = async () => {
  try {
    let json = JSON.stringify(store.getState().favorite.favorite.filter(item => item.value !== false))
    await AsyncStorage.setItem('favorite', json);
  } catch (error) {
    console.log(error, 'some error')
  }
};

export const getFavoriteRecipe = (id) => async (dispatch) => {
  let data = await Recipe.fetchRecipe(id)
  dispatch(setFavoriteRecipe(data.data))
}

export const getFavorite = (key) => async (dispatch) => {
  try {
    const value = await AsyncStorage.getItem(key);
    dispatch(setFavorite(value))
  } catch (error) {
    console.log(error, 'some error')
  }
}

