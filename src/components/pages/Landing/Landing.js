import React from 'react';
import MainNavBar from '../../common/mainNavBar';
import './landing.css';
import BrowserBar from '../../common/browserBar';
//image imports
import Shoes from '../../images/shoes.jpg';
import Plates from '../../images/plates.jpg';
import Cheese from '../../images/cheese.jpg';
import { useOktaAuth } from '@okta/okta-react';

const Landing = () => {
  const okta = useOktaAuth();
  console.log({ okta }, { user: okta.authService.getUser() });
  console.log(JSON.parse(localStorage['okta-token-storage']));

  return (
    <div>
      <MainNavBar />
      <section className="browse">
        <h1 className="title-1">Browse your favorite local store here!</h1>
        <h1>Support your community's business!</h1>
        <div className="browse-bar">
          {' '}
          <BrowserBar />
        </div>
      </section>
      <h1 className="title-2">Top Selling Items</h1>
      <section className="top-rated">
        <div className="top-img">
          <img className="top-rated-image" src={Plates} alt="plates" />
        </div>
        <div className="top-img">
          <img className="top-rated-image" src={Cheese} alt="cheese" />
        </div>
        <div className="top-img">
          <img className="top-rated-image" src={Shoes} alt="shoes" />
        </div>
      </section>
    </div>
  );
};

export default Landing;
