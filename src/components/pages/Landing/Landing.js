import React, { useState, useEffect } from 'react';
import MainNavBar from '../../common/mainNavBar';
import './landing.css';
import BrowserBar from '../../common/browserBar';
import axios from 'axios';
import ItemCard from '../../common/cards/normalItem';
import { NavLink } from 'react-router-dom';


const Landing = () => {
  const [searchTerm, setSearchTerm] = useState();
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    console.log('searchTerm', searchTerm);
    if (searchTerm) {
      const url = `${process.env.REACT_APP_API_URI}item/?q=${searchTerm.name}`;
      console.log(url);
      axios
        .get(url)
        .then(res => {
          console.log('results:', { res });
          setSearchResults(res.data.items);
        })
        .catch(err => {
          setSearchResults([]);
          console.error(err);
        });
    }
  }, [searchTerm]);

  return (
    <div>
      <MainNavBar />
      <section className="browse">
        <h1 className="title-1">Browse your favorite local store here!</h1>
        <h1>Support your community's business!</h1>
        <div className="browse-bar">
          {' '}
          <BrowserBar setData={setSearchTerm} />
        </div>
      </section>
      {searchResults.map(e => {
        return (
          <NavLink to={`/myprofile/inventory/productpage/${e.id}`} key={e.id}>
            <ItemCard
              name={e.item_name}
              description={e.description}
              price={e.price_in_cents}
              image={e.id}
              count={e.quantity_available}
              published
              key={e.id}
              img_url={e.url}
            />
          </NavLink>
        );
      })}
      {/* <h1 className="title-2">Top rate merchants</h1>
      <section className="top-rated">
        <div className="top-img">1</div>
        <div className="top-img">2</div>
        <div className="top-img">3</div>
      </section> */}

    </div>
  );
};

export default Landing;
