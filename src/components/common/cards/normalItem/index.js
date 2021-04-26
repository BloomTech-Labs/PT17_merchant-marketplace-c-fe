import { useOktaAuth } from '@okta/okta-react';
import React, { useEffect, useState, useCallback } from 'react';
import { getDSData } from '../../../../api';
import './itemCardStyles.css';
import { Skeleton, Col } from 'antd';
import { MinusCircleOutlined, CheckCircleOutlined } from '@ant-design/icons';

function ItemCard({
  name,
  description,
  price,
  image,
  count,
  published,
  pickup,
  delivery,
}) {
  const [img, setImg] = useState('');
  const { authState } = useOktaAuth();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  let dollars = price / 100;

  //<----------------Get Element---------------->
  const getElement = useCallback(
    (id, url, setState, errMessage) => {
      getDSData(`${process.env.REACT_APP_API_URI}${url}${id}`, authState)
        .then(res => {
          setState(res);
        })
        .catch(err => {
          console.log(errMessage, { err });
        });
    },
    [authState]
  );

  //<----------------Get Image---------------->
  const imgGet = useCallback(
    id => {
      setLoading(true);
      getDSData(`${process.env.REACT_APP_API_URI}photo/${id}`, authState)
        .then(res => {
          setLoading(false);
          setImg(res[0]['url']);
        })
        .catch(err => {
          console.log('Img get fail in ItemCard', { err });
        });
    },
    [authState]
  );

  useEffect(() => {
    imgGet(image);
    getElement(
      image,
      'category/',
      setCategories,
      'Category get fail in ItemCard'
    );
  }, [imgGet, getElement, image]);

  return (
    <Col span={30}>
      <div className="cardContainer">
        <div className="img-frame">
          {loading ? (
            <Skeleton.Image active className="cardImage" />
          ) : (
            <img src={img} className="cardImage" alt="product for sell" />
          )}
        </div>
        <div className="cardInfo">
          <div className="cardDesc">
            <h2 className="descText">{name}</h2>
            <p className="descText" activeStyle={{ color: 'black' }}>
              {description}
            </p>

            {pickup !== false ? (
              <p style={{ color: 'green' }}>Available for Pickup</p>
            ) : (
              <p style={{ color: 'red' }}></p>
            )}

            {delivery !== false ? (
              <p style={{ color: 'green' }}>Available for Delivery</p>
            ) : (
              <p style={{ color: 'red' }}></p>
            )}
          </div>
        </div>
        <div className="cardDesc">
          <h2 className="descText">{name}</h2>
          <p className="descText" activeStyle={{ color: 'black' }}>
            {description}
          </p>
          <div className="categories-tags">
            <div className="category-tag ">
              <h3>Categories: </h3>
              {categories?.length &&
                categories.map(category => (
                  <p className="category" key={category.id}>
                    {category.category_name}
                  </p>
                ))}
            </div>
          </div>
        </div>

        <div>
          <h2 className="cardPrice">${dollars}</h2>
          {count !== 0 ? (
            <h2 style={{ color: 'green' }}>QTY: {count}</h2>
          ) : (
            <h2 style={{ color: 'red' }}>QTY: {count}</h2>
          )}
          {published ? (
            <CheckCircleOutlined style={{ fontSize: '20px', color: 'green' }} />
          ) : (
            <MinusCircleOutlined style={{ fontSize: '20px', color: 'red' }} />
          )}
        </div>
      </div>
    </Col>
  );
}

export default ItemCard;
