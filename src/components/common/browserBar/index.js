import React, { useState } from 'react';
import { Input, Form, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import './BrowserBar.css';

function BrowserBar({ setData }) {
  const [search, setSearch] = useState({ name: '' });

  const searchHandle = e => {
    setSearch({ ...search, [e.target.name]: e.target.value });
  };

  const submitHandler = () => {
    setData(search);
  };

  return (
    <Form className="search-bar" onFinish={submitHandler}>
      <Input
        name="name"
        value={search.name}
        onChange={searchHandle}
        placeholder="What are you looking for?"
      />
      <Button htmlType="submit">
        <SearchOutlined />
      </Button>
    </Form>
  );
}

export default BrowserBar;
