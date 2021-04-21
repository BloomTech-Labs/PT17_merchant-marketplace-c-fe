import axios from 'axios';
import React, { useEffect, useState } from 'react';
import NavBar from '../../common/navBar/index';
import ProductInfo from '../ProductInfo/ProductInfo';

const ProductPage = props => {
  const [item, setItem] = useState();

  useEffect(() => {
    const url = `${process.env.REACT_APP_API_URI}item/${props.match.params.id}`;
    axios
      .get(url)
      .then(res => {
        console.log('results:');
        setItem(res.data[0]);
      })
      .catch(err => {
        console.error(err);
      });
  }, []);

  return (
    <div>
      <NavBar />
      {item && <ProductInfo item={item} />}
    </div>
  );
};

export default ProductPage;
