import { useOktaAuth } from '@okta/okta-react';
import React from 'react';
import { Form, Input, Button, Checkbox, InputNumber } from 'antd';
import { useDispatch } from 'react-redux';
import { editProduct } from '../../../state/actions';

const UpdateProduct = props => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { authState } = useOktaAuth();
  const formRef = React.createRef();

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

  return (
    <div className="myProductContents">
      <h1>Update Product</h1>
      <Form
        ref={formRef}
        form={form}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        initialValues={{
          item_name: props.item.item_name,
          description: props.item.description,
          price_in_cents: props.item.price_in_cents,
          quantity_available: props.item.quantity_available,
          published: props.item.published,
          id: props.item.id,
          pickup: props.item.pickup,
          delivery: props.item.delivery,
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
        {/*===================Pickup Delivery===================== */}
        <Form.Item label="Pickup" name="pickup" valuePropName="checked">
          <Checkbox></Checkbox>
        </Form.Item>
        <Form.Item label="Delivery" name="delivered" valuePropName="checked">
          <Checkbox></Checkbox>
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
