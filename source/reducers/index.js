import { combineReducers } from 'redux';
import { home } from './home';
import { favorite } from './favorite';
import { shopList } from './shoppingList';
import { search } from './search';

const rootReducer = combineReducers({
  app: home,
  favorite,
  shopList,
  search
});

export default rootReducer;