import { useOktaAuth } from '@okta/okta-react';
import React, { useState, useEffect } from 'react';
import { Avatar } from 'antd';
import {
  GlobalOutlined,
  MinusCircleOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons';
import { getDSData } from '../../../api';

const NewItemInfo = ({ photos, mainInfo, categoryInfo }) => {
  const [sellerProfile, setSellerProfile] = useState({});
  const { authState } = useOktaAuth();
  let oktaStore = JSON.parse(localStorage['okta-token-storage']);
  let seller_profile_id = oktaStore.idToken.claims.sub;

  //<----------------Get Seller Profile---------------->
  const getSellerProfile = id => {
    getDSData(`${process.env.REACT_APP_API_URI}profile/${id}`, authState)
      .then(res => setSellerProfile(res))
      .catch(err => {
        console.log('Seller Name get fail in ItemCard');
      });
  };
  useEffect(() => {
    getSellerProfile(seller_profile_id);
    // eslint-disable-next-line
  }, []);
  let dollars = mainInfo.price_in_cents / 100;
  return (
    <div className="product-page">
      <div className="product-container-newitem">
        <div>
          <img src={photos} alt="products" />
        </div>

        <div className="newitem">
          <div className="name-price">
            <p>
              {mainInfo.item_name}
              <span> ${dollars}</span>
            </p>
          </div>

          <div className="store-name-newitem">
            <Avatar size="small" icon={<GlobalOutlined />} />
            <h3>
              <span className="title">Store:</span> {sellerProfile.seller_name}
            </h3>
          </div>
          <p>
            <span className="title">Location:</span>{' '}
            {sellerProfile.physical_address}
          </p>
          <section>
            <p>
              <span className="title">Description: </span>
              {mainInfo.description}
            </p>
            {mainInfo.quantity_available !== 0 ? (
              <h2 style={{ color: 'green' }}>
                QTY: {mainInfo.quantity_available}
              </h2>
            ) : (
              <h2 style={{ color: 'red' }}>
                QTY: {mainInfo.quantity_available}
              </h2>
            )}
          </section>
          <div className="categories-container">
            <div className="title">Categories: </div>
            {categoryInfo.map(category => (
              <div key={category.id}>{category.category_name}</div>
            ))}
          </div>
        </div>
      </div>
      {mainInfo.published ? (
        <div className="published-container">
          <CheckCircleOutlined style={{ fontSize: '18px', color: 'green' }} />
          <span className="published">published</span>
        </div>
      ) : (
        <div className="published-container">
          <MinusCircleOutlined style={{ fontSize: '18px', color: 'red' }} />
          <span className="published">unpublished</span>
        </div>
      )}
    </div>
  );
};

export default NewItemInfo;
