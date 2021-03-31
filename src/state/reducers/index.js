import { combineReducers } from 'redux';
import productsReducer from './productsReducer';
import addProductReducer from './addProductReducer';
import addItemImageReducer from './addItemImageReducer';
import myInfoReducer from './myInfoReducer';
import categoriesReducer from './categoriesReducer';
import addCategoryReducer from './addCategoryReducer';
import addProductCategoryReducer from './addProductCategoryReducer';
import deleteProductReducer from './deleteProductReducer';
import editProductReducer from './editProductReducer';

const reducers = combineReducers({
  products: productsReducer,
  addProduct: addProductReducer,
  addItemImage: addItemImageReducer,
  information: myInfoReducer,
  categories: categoriesReducer,
  addCategory: addCategoryReducer,
  addProductCategory: addProductCategoryReducer,
  deleteProduct: deleteProductReducer,
  editProduct: editProductReducer,
});

export default reducers;
