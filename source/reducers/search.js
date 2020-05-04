import React from 'react';
import { Recipe, Search } from '../actions/app';

const SET_SEARCH_DATA = 'SEARCH/SET_SEARCH_DATA'
const SET_QUICK_SEARCH_DATA = 'SEARCH/SET_QUICK_SEARCH_DATA'
const CHANGE_LOADING = 'SEARCH/CHANGE_LOADING'
const CLEAN_DATA = 'SEARCH/CLEAN_DATA'
const CLEAN_QUICK_SEARCH_DATA = 'SEARCH/CLEAN_QUICK_SEARCH_DATA'
const SET_SEARCH_RECIPE = 'SEARCH/SET_SEARCH_RECIPE'
const CLEAN_RECIPE = 'SEARCH/CLEAN_RECIPE'

const initialState = {
  quickSearchData: null,
  data: null,
  loading: true,
  searchRecipe: null,
}

export const search = (state = initialState, action) => {
  switch (action.type) {
    case SET_SEARCH_DATA:
      return {
        ...state,
        data: (state.data === null) ? action.data : [ ...state.data, ...action.data ],
        loading: false
      }
    case SET_QUICK_SEARCH_DATA:
      console.log(action.quickData, 'action.quickData')
      return {
        ...state,
        quickSearchData: (state.quickSearchData === null)
          ? action.quickData
          : [ ...state.quickSearchData, ...action.quickData ],
      }
    case CHANGE_LOADING:
      return {
        ...state,
        loading: true
      }
    case CLEAN_DATA:
      return {
        ...state,
        data: null
      }
    case CLEAN_QUICK_SEARCH_DATA:
      return {
        ...state,
        quickSearchData: null
      }
    case SET_SEARCH_RECIPE:
      return {
        ...state,
        searchRecipe: action.recipe
      }
    case CLEAN_RECIPE:
      return {
        ...state,
        searchRecipe: null
      }
    default:
      return state;
  }
}

const setSearchData = (data) => ({type: SET_SEARCH_DATA, data});
const setQuickSearchData = (quickData) => ({type: SET_QUICK_SEARCH_DATA, quickData});
const loading = () => ({type: CHANGE_LOADING});
const cleanStateData = () => ({type: CLEAN_DATA});
const cleanStateQuickSearchData = () => ({type: CLEAN_QUICK_SEARCH_DATA});
const setSearchRecipe = (recipe) => ({type: SET_SEARCH_RECIPE, recipe});
const cleanStateRecipe = () => ({type: CLEAN_RECIPE});

export const getSearchData = (limit, offset, title) => async (dispatch) => {
  dispatch(loading())
  let data = await Search.fullSearch(limit, offset, title)
  dispatch(setSearchData(data.data))
}
export const quickSearchData = (limit, offset, title) => async (dispatch) => {
  dispatch(loading())
  let data = await Search.fullSearch(limit, offset, title)
  dispatch(setQuickSearchData(data.data))
}
export const cleanData = () => {
  return (dispatch) => {
    dispatch(cleanStateData())
  }
}
export const cleanQuickSearchData = () => {
  return (dispatch) => {
    dispatch(cleanStateQuickSearchData())
  }
}
export const getSearchRecipe = (id) => async (dispatch) => {
  let data = await Recipe.fetchRecipe(id)
  dispatch(setSearchRecipe(data.data))
}
export const cleanRecipe = () => {
  return (dispatch) => {
    dispatch(cleanStateRecipe())
  }
}
