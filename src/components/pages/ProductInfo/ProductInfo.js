import { useOktaAuth } from '@okta/okta-react';
import React, { useEffect, useState } from 'react';
import { getDSData } from '../../../api';
import ProductCarousel from '../ProductPage/ProductCarousel';
import { Rate, Avatar, Tag, Button } from 'antd';
import {
  GlobalOutlined,
  MinusCircleOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons';
import { deleteProduct } from '../../../state/actions';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import UpdateProduct from './UpdateProduct';

const ProductInfo = ({ item }) => {
  const [img, setImg] = useState('');
  const [sellerProfile, setSellerProfile] = useState({});
  const [categories, setCategories] = useState([]);
  // eslint-disable-next-line
  const [tags, setTags] = useState([]);
  const { authState } = useOktaAuth();
  const [updateToggle, setUpdateToggle] = useState(false);
  const editProductState = useSelector(
    state => state.editProduct.editedProduct
  );
  const [updatedProduct, setUpdatedProduct] = useState({});
  const history = useHistory();
  const dispatch = useDispatch();
  let oktaStore = JSON.parse(localStorage['okta-token-storage']);
  let seller_profile_id = oktaStore.idToken.claims.sub;

  //<----------------Get Element---------------->
  const getElement = (id, url, setState, errMessage) => {
    getDSData(`${process.env.REACT_APP_API_URI}${url}${id}`, authState)
      .then(res => setState(res))
      .catch(err => {
        console.log(errMessage);
      });
  };
  //<----------------Get Image---------------->
  const imgGet = id => {
    getDSData(`${process.env.REACT_APP_API_URI}photo/${id}`, authState)
      .then(res => setImg(res[0]['url']))
      .catch(err => {
        console.log('Img get fail in ProductInfo.');
      });
  };
  //--------------delete product ---------------->
  const delProduct = e => {
    e.preventDefault();
    dispatch(deleteProduct(item.id, authState));
    history.push('/myprofile/inventory');
  };

  useEffect(() => {
    imgGet(item.id);
    getElement(
      seller_profile_id,
      'profile/',
      setSellerProfile,
      'Seller Name get fail in ItemCard'
    );
    getElement(
      item.id,
      'category/',
      setCategories,
      'Category get fail in ItemCard'
    );
    getElement(item.id, 'tag/item/', setTags, 'Tag get fail in ItemCard');
    // eslint-disable-next-line
  }, []);

  //-------------Edit Item---------------
  const getItem = id => {
    getDSData(`${process.env.REACT_APP_API_URI}item/${id}`, authState)
      .then(res => setUpdatedProduct(res[0]))
      .catch(err => {
        console.log('Edit Product fail in ItemCard');
      });
  };

  useEffect(() => {
    getItem(item.id);
  }, [editProductState]);

  const toggle = () => {
    setUpdateToggle(!updateToggle);
  };
  const cancelEdit = () => {
    history.push('/myprofile/inventory');
  };

  let dollars = updatedProduct.price_in_cents / 100;
  return (
    <div className="product-page">
      {updateToggle ? (
        <UpdateProduct
          item={updatedProduct}
          toggle={toggle}
          setUpdateToggle={setUpdateToggle}
          updateToggle={updateToggle}
          id={updatedProduct.id}
        />
      ) : (
        <div>
          <div>
            {updatedProduct.published ? (
              <div className="published-container">
                <CheckCircleOutlined
                  style={{ fontSize: '32px', color: 'green' }}
                />
                <span className="published">published</span>
              </div>
            ) : (
              <div className="published-container">
                <MinusCircleOutlined
                  style={{ fontSize: '32px', color: 'red' }}
                />
                <span className="published">unpublished</span>
              </div>
            )}
          </div>

          <div className="product-container">
            <div>
              <img src={img} />
            </div>

            <div className="item">
              <div className="name-price">
                <p>{updatedProduct.item_name}</p>
                <p>${dollars}</p>
              </div>
              <div className="rating">
                <Rate />
              </div>
              <div className="store-name">
                <Avatar size="small" icon={<GlobalOutlined />} />
                <h3>Store: {sellerProfile.seller_name}</h3>
              </div>
              <p>Location: {sellerProfile.physical_address}</p>
              <section>
                <p>{updatedProduct.description}</p>
                {updatedProduct.quantity_available !== 0 ? (
                  <h2 style={{ color: 'green' }}>
                    QTY: {updatedProduct.quantity_available}
                  </h2>
                ) : (
                  <h2 style={{ color: 'red' }}>
                    QTY: {updatedProduct.quantity_available}
                  </h2>
                )}
              </section>

              <div
                className="category-tag "
                style={{
                  display: 'flex',
                  justifyContent: 'space-evenly',
                }}
              >
                <h3 className="catH3">Categories: </h3>
                {categories.map(category => (
                  <div className="cats" key={category.id}>
                    {category.category_name}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <Button onClick={delProduct} className="deleteBtn">
            Delete Item
          </Button>
          <Button
            type="primary"
            onClick={toggle}
            style={{ marginLeft: '2rem' }}
          >
            Edit Item
          </Button>
          <Button onClick={cancelEdit} style={{ marginLeft: '2rem' }}>
            Back to Inventory
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProductInfo;
