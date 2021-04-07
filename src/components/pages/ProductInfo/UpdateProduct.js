import { useOktaAuth } from '@okta/okta-react';
import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Checkbox, InputNumber, Select } from 'antd';
import { useDispatch } from 'react-redux';
import { editProduct } from '../../../state/actions';
import { getDSData } from '../../../api';
import { Tag, Skeleton } from 'antd';
import { Widget } from '@uploadcare/react-widget';
import { addItemImage } from '../../../state/actions/index';
import uploadcare from 'uploadcare-widget';
import axios from 'axios';

const UpdateProduct = props => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { authState } = useOktaAuth();
  const formRef = React.createRef();

  const [loading, setLoading] = useState(false);
  const [img, setImg] = useState('');
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);

  function openUploadDialog(e) {
    let dialog = uploadcare.openDialog(null, {
      publicKey: '7f074009b333b2d5be63',
      imagesOnly: true,
    });
    dialog.done(function(file, fileGroup, list) {
      setLoading(true);
      file.promise().done(function(fileInfo) {
        setLoading(false);
        setImg(fileInfo.originalUrl);
        addItemImage(authState, props.item.id, fileInfo.originalUrl);
        console.log('fileinfo: ', fileInfo);
      });
    });
  }

  const onFinish = values => {
    dispatch(editProduct(values, authState));
    props.setUpdateToggle(!props.updateToggle);
  };
  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };
  const cancelEdit = e => {
    props.setUpdateToggle(!props.updateToggle);
    formRef.current.resetFields();
  };

  const imgGet = id => {
    setLoading(true);
    getDSData(`${process.env.REACT_APP_API_URI}photo/${props.id}`, authState)
      .then(res => {
        setLoading(false);
        setImg(res[0]['url']);
      })
      .catch(err => {
        console.log('Img get fail in ItemCard');
      });
  };
  useEffect(() => {
    imgGet(props.image);
  }, []);

  return (
    <div className="myProductContents">
      <img src={img} className="editImage" alt="product for sell" />
      <button onClick={openUploadDialog}> Replace image </button>

      <h1>Update Product</h1>
      <Form
        ref={formRef}
        form={form}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        initialValues={{
          image: props.item.image,
          item_name: props.item.item_name,
          description: props.item.description,
          price_in_cents: props.item.price_in_cents,
          quantity_available: props.item.quantity_available,
          published: props.item.published,
          id: props.item.id,
        }}
      >
        {/*======================item_name========================== */}
        <Form.Item
          label="Product Name"
          name="item_name"
          rules={[
            {
              required: true,
              message: 'Please input an edited item name',
            },
          ]}
        >
          <Input placeholder="Item Name" />
        </Form.Item>
        {/*======================Description========================== */}
        <Form.Item
          label="Description"
          name="description"
          rules={[
            {
              message:
                'The length of a description should not be more than 140 characters',
              max: 140,
            },
          ]}
        >
          <Input.TextArea placeholder="Short Description (Max 140 Characters)" />
        </Form.Item>
        {/*======================Price In Cents========================== */}
        <Form.Item name="price_in_cents" label="Price In Cents" required>
          <InputNumber placeholder="Price per item" min={1} />
        </Form.Item>
        {/*======================Quantity Available========================== */}
        <Form.Item name="quantity_available" label="Quantity" required>
          <InputNumber placeholder="quantity_available" min={0} />
        </Form.Item>
        {/*===================Published===================== */}
        <Form.Item
          label="Published"
          name="published"
          valuePropName="checked"
          required
        >
          <Checkbox></Checkbox>
        </Form.Item>

        {/*======================Product_id========================== */}
        <div style={{ display: 'none' }}>
          <Form.Item name="id">
            <Input placeholder="product_id" />
          </Form.Item>
        </div>

        <Button type="primary" htmlType="submit">
          Submit
        </Button>
        <Button onClick={cancelEdit} style={{ marginLeft: '0.5rem' }}>
          Cancel
        </Button>
      </Form>
    </div>
  );
};
export default UpdateProduct;
