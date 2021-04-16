import React from 'react';
import {
  sleep,
  getExampleData,
  getProfileData,
  putData,
  getProfileIdData,
  getDSData,
  postData,
  deleteData,
} from '../../api/index';

export const FETCH_PRODUCTS_START = 'FETCH_PRODUCTS_START';
export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
export const FETCH_PRODUCTS_ERROR = 'FETCH_PRODUCTS_ERROR';

export const FETCH_CATEGORIES_START = 'FETCH_CATEGORIES_START';
export const FETCH_CATEGORIES_SUCCESS = 'FETCH_CATEGORIES_SUCCESS';
export const FETCH_CATEGORIES_ERROR = 'FETCH_CATEGORIES_ERROR';

export const ADD_PRODUCT_START = 'ADD_PRODUCT_START';
export const ADD_PRODUCT_SUCCESS = 'ADD_PRODUCT_SUCCESS';
export const ADD_PRODUCT_ERROR = 'ADD_PRODUCT_ERROR';

export const ADD_CATEGORY_START = 'ADD_CATEGORY_START';
export const ADD_CATEGORY_SUCCESS = 'ADD_CATEGORY_SUCCESS';
export const ADD_CATEGORY_ERROR = 'ADD_CATEGORY_ERROR';

export const ADD_PRODUCT_CATEGORY_START = 'ADD_PRODUCT_CATEGORY_START';
export const ADD_PRODUCT_CATEGORY_SUCCESS = 'ADD_PRODUCT_CATEGORY_SUCCESS';
export const ADD_PRODUCT_CATEGORY_ERROR = 'ADD_PRODUCT_CATEGORY_ERROR';

export const ADD_PRODUCT_TAG_START = 'ADD_PRODUCT_TAG_START';
export const ADD_PRODUCT_TAG_SUCCESS = 'ADD_PRODUCT_TAG_SUCCESS';
export const ADD_PRODUCT_TAG_ERROR = 'ADD_PRODUCT_TAG_ERROR';

export const ADD_ITEM_IMAGE_START = 'ADD_ITEM_IMAGE_START';
export const ADD_ITEM_IMAGE_SUCCESS = 'ADD_ITEM_IMAGE_SUCCESS';
export const ADD_ITEM_IMAGE_ERROR = 'ADD_ITEM_IMAGE_ERROR';

export const FETCH_MY_INFO_START = 'FETCH_MY_INFO_START';
export const FETCH_MY_INFO_SUCCESS = 'FETCH_MY_INFO_SUCCESS';
export const FETCH_MY_INFO_ERROR = 'FETCH_MY_INFO_ERROR';

export const EDIT_MY_INFO_START = 'EDIT_MY_INFO_START';
export const EDIT_MY_INFO_SUCCESS = 'EDIT_MY_INFO_SUCCESS';
export const EDIT_MY_INFO_ERROR = 'EDIT_MY_INFO_ERROR';

export const EDIT_PRODUCT_START = 'EDIT_PRODUCT_START';
export const EDIT_PRODUCT_SUCCESS = 'EDIT_PRODUCT_SUCCESS';
export const EDIT_PRODUCT_ERROR = 'EDIT_PRODUCT_ERROR';

export const DELETE_PRODUCT_START = 'DELETE_PRODUCT_START';
export const DELETE_PRODUCT_SUCCESS = 'DELETE_PRODUCT_SUCCESS';
export const DELETE_PRODUCT_ERROR = 'DELETE_PRODUCT_ERROR';

//=================FETCH====================
//<------------fetchProducts--------------->
export const fetchProducts = authState => dispatch => {
  let oktaStore = JSON.parse(localStorage['okta-token-storage']);
  let oktaId = oktaStore?.idToken.claims.sub;
  dispatch({ type: FETCH_PRODUCTS_START });
  getDSData(
    `${process.env.REACT_APP_API_URI}items/profile/${oktaId}`,
    authState
  )
    .then(response => {
      dispatch({ type: FETCH_PRODUCTS_SUCCESS, payload: response });
    })
    .catch(err => {
      dispatch({ type: FETCH_PRODUCTS_ERROR, payload: err });
    });
};

//<------------fetchCategories--------------->
export const fetchCategories = authState => dispatch => {
  dispatch({ type: FETCH_CATEGORIES_START });
  getDSData(`${process.env.REACT_APP_API_URI}category`, authState)
    .then(response => {
      dispatch({ type: FETCH_CATEGORIES_SUCCESS, payload: response });
    })
    .catch(err => {
      dispatch({ type: FETCH_CATEGORIES_ERROR, payload: err });
    });
};

//=====================ADD========================
//<------------addItemImage---------------------->
export const addItemImage = (authState, itemId, photoUrl) => dispatch => {
  dispatch({ type: ADD_ITEM_IMAGE_START });
  postData(
    process.env.REACT_APP_API_URI + 'photos',
    {
      url: photoUrl,
      item_id: itemId,
    },
    authState
  )
    .then(response => {
      dispatch({ type: ADD_ITEM_IMAGE_SUCCESS, payload: response });
    })
    .catch(err => {
      dispatch({ type: ADD_ITEM_IMAGE_ERROR, payload: err });
    });
};

//<---------------addProduct---------------------->
export const addProduct = (newProduct, authState) => async dispatch => {
  dispatch({ type: ADD_PRODUCT_START });

  try {
    let response = await postData(
      process.env.REACT_APP_API_URI + 'item',
      newProduct.new_item,
      authState
    );
    dispatch({ type: ADD_PRODUCT_SUCCESS, payload: response[0] });
    return response[0];
  } catch (error) {
    dispatch({ type: ADD_PRODUCT_ERROR, payload: error });
    return error;
  }
};

//<---------------addCategory---------------------->
export const addCategory = (newCategory, authState) => dispatch => {
  dispatch({ type: ADD_CATEGORY_START });
  postData(
    process.env.REACT_APP_API_URI + 'categories/',
    {
      category_name: newCategory,
    },
    authState
  )
    .then(response => {
      dispatch({ type: ADD_CATEGORY_SUCCESS, payload: response });
    })
    .catch(err => {
      dispatch({ type: ADD_CATEGORY_ERROR, payload: err });
    });
};

//<---------------addProductCategory---------------------->
export const addProductCategory = (
  authState,
  productID,
  categoryID
) => dispatch => {
  dispatch({ type: ADD_PRODUCT_CATEGORY_START });
  postData(
    process.env.REACT_APP_API_URI +
      `item/${productID}/categories/${categoryID}`,
    { category_id: categoryID, item_id: productID },
    authState
  )
    .then(response => {
      dispatch({ type: ADD_PRODUCT_CATEGORY_SUCCESS, payload: response });
    })
    .catch(err => {
      dispatch({ type: ADD_PRODUCT_CATEGORY_ERROR, payload: err });
    });
};

//=================DELETE====================
//<------------deleteProduct--------------->
export const deleteProduct = (itemId, authState) => dispatch => {
  dispatch({ type: DELETE_PRODUCT_START });
  deleteData(process.env.REACT_APP_API_URI + `items/${itemId}/`, authState)
    .then(response => {
      dispatch({ type: DELETE_PRODUCT_SUCCESS, payload: response.data });
    })
    .catch(error => {
      dispatch({ type: DELETE_PRODUCT_ERROR, payload: error });
    });
};

export const fetchMyInfo = authState => dispatch => {
  let oktaStore = JSON.parse(localStorage['okta-token-storage']);
  let oktaId = oktaStore.idToken.claims.sub;

  dispatch({ type: FETCH_MY_INFO_START });
  getProfileIdData(authState, oktaId)
    .then(response => {
      dispatch({ type: FETCH_MY_INFO_SUCCESS, payload: response });
    })
    .catch(err => {
      dispatch({ type: FETCH_MY_INFO_ERROR, payload: err });
    });
};
//=================EDIT====================
//<------------editMyInfo--------------->
export const editMyInfo = (authState, editedInfo) => async dispatch => {
  let oktaStore = JSON.parse(localStorage['okta-token-storage']);
  let oktaId = oktaStore.idToken.claims.sub;
  editedInfo.id = oktaId;

  dispatch({ type: EDIT_MY_INFO_START });
  putData(process.env.REACT_APP_API_URI + 'profile/', editedInfo, authState)
    .then(response => {
      dispatch({ type: EDIT_MY_INFO_SUCCESS, payload: response });
    })
    .catch(err => {
      dispatch({ type: EDIT_MY_INFO_ERROR, payload: err });
    });
};
//<------------editProduct--------------->
export const editProduct = (editedProduct, authState) => dispatch => {
  dispatch({ type: EDIT_PRODUCT_START });
  putData(
    process.env.REACT_APP_API_URI + `item/${editedProduct.id}`,
    editedProduct,
    authState
  )
    .then(response => {
      dispatch({ type: EDIT_PRODUCT_SUCCESS, payload: response });
    })
    .catch(err => {
      dispatch({ type: EDIT_PRODUCT_ERROR, payload: err });
    });
};
