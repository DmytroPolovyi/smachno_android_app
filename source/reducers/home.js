import React from 'react';
import { Home } from '../actions/app';

const SET_DATA = 'HOME/SET_DATA'
const SET_CATEGORY = 'HOME/SET_CATEGORY'
const SET_RECIPE = 'HOME/SET_SET_RECIPE'
const SET_CATEGORY_NAME = 'HOME/SET_CATEGORY_NAME'
const CLEAN_CATEGORY = 'HOME/CLEAN_CATEGORY'
const CHANGE_LOADING = 'HOME/CHANGE_LOADING'
const ADD_FOR_CATEGORY = 'HOME/ADD_FOR_CATEGORY'

const initialState = {
  data: null,
  category: null,
  categoryName: {},
  luckRecipe: {},
  loading: true
}

export const home = (state = initialState, action) => {
  switch (action.type) {
    case SET_DATA:
      return {
        ...state,
        data: action.data
      }
    case SET_CATEGORY:
      return {
        ...state,
        category: [...action.category],
        loading: false
      }
    case ADD_FOR_CATEGORY:
      return {
        ...state,
        category: [...state.category, ...action.category],
        loading: false
      }
    case SET_CATEGORY_NAME:
      return {
        ...state,
        categoryName: action.category.reduce((acc, item) =>
          ({...acc, [item.id]: item.title}), {})
      }
    case SET_RECIPE:
      return {
        ...state,
        luckRecipe: action.recipe
      }
      case CHANGE_LOADING:
      return {
        ...state,
        loading: true
      }
    case CLEAN_CATEGORY:
      return {
        ...state,
        category: null
      }
    default:
      return state;
  }
}

const setData = (data) => ({type: SET_DATA, data});
const setSubCategory = (category) => ({type: SET_CATEGORY, category});
const addForCategory = (category) => ({type: ADD_FOR_CATEGORY, category});
const cleanCategoryState = () => ({type: CLEAN_CATEGORY});
const setLuckRecipe = (recipe) => ({type: SET_RECIPE, recipe});
const setCategoryName = (category) => ({type: SET_CATEGORY_NAME, category});
const loading = () => ({type: CHANGE_LOADING});

export const getData = () => async (dispatch) => {
  let data = await Home.fetchDataAll()
  dispatch(setData(data.data))
  dispatch(setCategoryName(data.data))
}

export const getCategory = (id, offset) => async (dispatch) => {
  dispatch(loading())
  let data = await Home.fetchCategory(id, offset)
  dispatch(setSubCategory(data.data))
}
export const addItemForCategory = (id, offset) => async (dispatch) => {
  dispatch(loading())
  let data = await Home.fetchCategory(id, offset)
  dispatch(addForCategory(data.data))
}
export const getLuckRecipe = () => async (dispatch) => {
  let data = await Home.fetchLuckRecipe()
  dispatch(setLuckRecipe(data.data))
}
export const CleanCategory = () =>{
  return (dispatch) => {
    dispatch(cleanCategoryState())
  }
}


