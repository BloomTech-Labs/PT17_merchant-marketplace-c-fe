import React from 'react';
import NewItemInfo from '../../../pages/ProductInfo/NewItemInfo';
import FormButton from '../../../common/FormButton/FormButton';

function Finalize({
  setProgress,
  slider,
  formCosolidate,
  setStatus,
  mainInfo,
  categoryInfo,
  tagInfo,
  photos,
}) {
  const formConfirm = () => {
    formCosolidate();
  };

  return (
    <div className="contents">
      <NewItemInfo
        photos={photos}
        mainInfo={mainInfo}
        categoryInfo={categoryInfo}
        tagInfo={tagInfo}
      />
      <FormButton
        setProgress={setProgress}
        slider={slider}
        progressPercent={100}
        text="Save Product"
        review="true"
        popContent={() => formConfirm()}
      />
    </div>
  );
}

export default Finalize;
