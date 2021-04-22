import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import './navStyles.css';
import SearchBar from '../searchbar';

function NavBar({ searchVisible, data, setData }) {
  console.log('NavBar', setData);
  return (
    <div className="nav-container">
      <div className="nav">
        <div className="logo">
          <NavLink to="/" activeStyle={{ color: 'black' }}>
            <span style={{ color: 'rebeccapurple' }}>MERCHANT</span> MARKETPLACE
          </NavLink>
        </div>
        <Link to="/myprofile/inventory">Inventory</Link>
        <Link to="#">Orders</Link>
        <Link to="#">Payment</Link>
        <Link to="/myprofile/myinfo">My Info</Link>
        <Link to="#">Messages</Link>
      </div>
      <SearchBar searchVisible={searchVisible} setData={setData} data={data} />
    </div>
  );
}

export default NavBar;
