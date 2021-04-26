import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import NavBar from '../../../../common/navBar';
import { connect } from 'react-redux';
import { fetchMyInfo, editMyInfo } from '../../../../../state/actions';
import { useOktaAuth } from '@okta/okta-react';
import './myInfoSection.css';

function MyInfo(props) {
  const history = useHistory();
  const { authState } = useOktaAuth();

  useEffect(() => {
    props.fetchMyInfo(authState);
    // eslint-disable-next-line
  }, []);

  function clicked(event) {
    history.push('/myprofile/editinfo');
  }

  return (
    <>
      <NavBar />
      <br />
      <br />
      <div className="userInfo">
        <div>
          <h3 className="label">Name: </h3>
          <h3>{props.myInfo.seller_name}</h3>
          <h3 className="label">Address: </h3>
          <h3>{props.myInfo.physical_address}</h3>
          <h3 className="label">Phone Number: </h3>
          <h3>{props.myInfo.phone_number}</h3>
          <h3 className="label">Email: </h3>
          <h3>{props.myInfo.email_address}</h3>
          <h3 className="label">Description: </h3>
          <h3>{props.myInfo.description}</h3>
        </div>

        <button onClick={clicked}>Edit</button>
      </div>
    </>
  );
}

const mapStateToProps = state => {
  return {
    myInfo: state.information.myInfo,
    loading: state.information.fetchMyInfoStatus,
  };
};

export default connect(mapStateToProps, { fetchMyInfo, editMyInfo })(MyInfo);
