import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from '../../common';
import './mainNavBar.css';
import { useOktaAuth } from '@okta/okta-react';

function MainNavBar() {
  const { authState, authService } = useOktaAuth();

  return (
    <div className="nav-bar">
      {/* logo */}
      <div className="logo">
        <span>MERCHANT</span> MARKETPLACE
      </div>
      <div className="menu">
        {authState.isAuthenticated && (
          <NavLink
            className="link"
            activeStyle={{ color: 'white' }}
            to="/myprofile/inventory"
          >
            My Profile
          </NavLink>
        )}
        {authState.isAuthenticated && (
          <Button
            handleClick={() => authService.logout()}
            buttonText="Logout"
          />
        )}
        {!authState.isAuthenticated && (
          <Button handleClick={() => authService.login()} buttonText="Login" />
        )}
      </div>
    </div>
  );
}

export default MainNavBar;
