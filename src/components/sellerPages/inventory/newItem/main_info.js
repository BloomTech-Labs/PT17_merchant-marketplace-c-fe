import React from 'react';
import { Form, Input, InputNumber, Checkbox } from 'antd';
import FormButton from '../../../common/FormButton/FormButton';
import '../inventoryStyles.css';

function NewItem({ setProgress, slider, setData }) {
  const [form] = Form.useForm();

  const onFinish = values => {
    setData(values);
  };
  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="contents">
      <h1>Main Information</h1>
      <Form form={form} onFinish={onFinish} onFinishFailed={onFinishFailed}>
        {/*======================Product Name========================== */}
        <Form.Item
          name="item_name"
          rules={[
            {
              required: true,
              message: 'Please input an item name',
            },
          ]}
        >
          <Input placeholder="Name of Item" />
        </Form.Item>
        {/*===================Description===================== */}
        <Form.Item
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
        {/*==============Price In Cents================ */}
        <Form.Item name="price_in_cents" label="Price in cents: " required>
          <InputNumber
            placeholder="Price per item"
            min={1}
            defaultValue={1}
            onChange={onFinish}
          />
        </Form.Item>
        {/*================Quantity Available=============== */}
        <Form.Item
          name="quantity_available"
          label="Quantity available: "
          required
        >
          <InputNumber
            placeholder="quantity_available"
            min={0}
            defaultValue={0}
            onChange={onFinish}
          />
        </Form.Item>

        {/*===============Pickup & Deliver================= */}
        <Form.Item
          label="Pickup"
          name="pickup"
          valuePropName="checked"
          initialValue={false}
        >
          <Checkbox></Checkbox>
        </Form.Item>

        <Form.Item
          label="Delivery"
          name="delivery"
          valuePropName="checked"
          initialValue={false}
        >
          <Checkbox></Checkbox>
        </Form.Item>
        {/*===============Published================= */}
        <Form.Item
          label="Published"
          name="published"
          valuePropName="checked"
          required
          initialValue={false}
        >
          <Checkbox></Checkbox>
        </Form.Item>

        <FormButton
          setProgress={setProgress}
          slider={slider}
          progressPercent={20}
          text="Next"
        />
      </Form>
    </div>
  );
}

export default NewItem;
