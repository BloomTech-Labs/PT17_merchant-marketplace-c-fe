import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchMyInfo, editMyInfo } from '../../../../../state/actions';
import { useOktaAuth } from '@okta/okta-react';
import NavBar from '../../../../common/navBar';

function EditInfo({ fetchMyInfo, ...props }) {
  const history = useHistory();
  const { authState } = useOktaAuth();
  const [sellerForm, setSellerForm] = useState({
    id: `${props.myInfo.id}`,
    seller_name: `${props.myInfo.seller_name}`,
    email_address: `${props.myInfo.email_address}`,
    phone_number: `${props.myInfo.phone_number}`,
    physical_address: `${props.myInfo.physical_address}`,
    description: `${props.myInfo.description}`,
  });

  useEffect(() => {
    fetchMyInfo(authState);
  }, [authState, fetchMyInfo]);

  function editForm(e) {
    console.log('sellerform', sellerForm);
    setSellerForm({
      ...sellerForm,
      [e.target.name]: e.target.value,
    });
  }

  function cancelEdit(e) {
    history.go(-1);
  }

  async function submitEdit(e) {
    await props.editMyInfo(authState, sellerForm);
    history.push('/myprofile/myinfo');
  }

  return (
    <>
      <NavBar />
      <br />
      <br />
      <label>
        Name
        <input
          name="seller_name"
          value={sellerForm.seller_name}
          onChange={editForm}
        ></input>
      </label>
      <br />
      <label>
        Address
        <input
          name="physical_address"
          value={sellerForm.physical_address}
          onChange={editForm}
        ></input>
      </label>
      <br />
      <label>
        PhoneNumber
        <input
          name="phone_number"
          value={sellerForm.phone_number}
          onChange={editForm}
        ></input>
      </label>
      <br />
      <label>
        Email
        <input
          name="email_address"
          value={sellerForm.email_address}
          onChange={editForm}
        ></input>
      </label>
      <br />
      <label>
        Description
        <input
          name="description"
          value={sellerForm.description}
          onChange={editForm}
        ></input>
      </label>
      <button onClick={submitEdit}>submit</button>
      <button onClick={cancelEdit}>cancel</button>
    </>
  );
}

const mapStateToProps = state => {
  console.log('state in editInfo', state.information.myInfo);
  return {
    myInfo: state.information.myInfo,
    loading: state.information.fetchMyInfoStatus,
  };
};

export default connect(mapStateToProps, { editMyInfo, fetchMyInfo })(EditInfo);
