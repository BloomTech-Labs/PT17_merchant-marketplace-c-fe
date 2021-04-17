import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  useHistory,
  Switch,
} from 'react-router-dom';

import { Security, LoginCallback, SecureRoute } from '@okta/okta-react';
import 'antd/dist/antd.less';

import { NotFoundPage } from './components/pages/NotFound';

import { LoginPage } from './components/pages/Login';
import { config } from './utils/oktaConfig';
import reducer from './state/reducers';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import Landing from './components/pages/Landing/Landing';

// Seller Imports
import SellerProfile from './components/sellerPages/profile';
import Inventory from './components/sellerPages/inventory';
import MyInfo from './components/sellerPages/profile/dashboard/myInfoSection/index.js';
import EditInfo from './components/sellerPages/profile/dashboard/edit/EditInfo.js';
import CurrentInventory from './components/sellerPages/inventory/current';
import { ProductPage } from './components/pages/ProductPage';
import { TestItemImageUpload } from './components/common';

const store = createStore(reducer, compose(applyMiddleware(thunk)));

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Router>
  </Provider>,
  document.getElementById('root')
);

function App() {
  // The reason to declare App this way is so that we can use any helper functions we'd need for business logic, in our case auth.
  // React Router has a nifty useHistory hook we can use at this level to ensure we have security around our routes.
  const history = useHistory();

  const authHandler = () => {
    // We pass this to our <Security /> component that wraps our routes.
    // It'll automatically check if userToken is available and push back to login if not :)
    history.push('/login');
  };

  return (
    <Security {...config} onAuthRequired={authHandler}>
      <Switch>
        <Route path="/login" component={LoginPage} />
        <Route path="/implicit/callback" component={LoginCallback} />
        {/* any of the routes you need secured should be registered as SecureRoutes */}
        <Route exact path="/" component={Landing} />
        <SecureRoute
          exact
          path="/myprofile/inventory"
          component={CurrentInventory}
        />
        <SecureRoute
          exact
          path="/myprofile/inventory/additem"
          component={Inventory}
        />
        <SecureRoute exact path="/myprofile/myinfo" component={MyInfo} />
        <SecureRoute exact path="/myprofile/editinfo" component={EditInfo} />
        <SecureRoute
          exact
          path="/myprofile/inventory/productpage/:id"
          render={routeProps => {
            return <ProductPage match={routeProps.match} />;
          }}
        />
        <SecureRoute
          exact
          path="/test_image_upload"
          component={TestItemImageUpload}
        />
        <Route component={NotFoundPage} />
      </Switch>
    </Security>
  );
}
