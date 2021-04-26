import React, { useEffect, useState } from 'react';
import { Input, Button, Select } from 'antd';
import { Link } from 'react-router-dom';
import './searchbarStyles.css';

function SearchBar({ searchVisible, setData }) {
  const [inView, setInView] = useState('nope');
  const { Search } = Input;
  const { Option } = Select;

  function onSearch(values) {
    setData(values);
  }

  function publishedChange() {
    setData('$#&published');
  }
  function unPublishedChange() {
    setData('$#&unpublished');
  }
  function mainChange() {
    setData('$#&main');
  }

  function sortChange(value) {
    console.log(`selected sortBy: ${value}`);
  }

  function categoryChange(value) {
    console.log(`selected category: ${value}`);
  }

  useEffect(() => {
    if (searchVisible === false) {
      setInView('inView');
    }
  });

  return (
    <div className={inView}>
      <div className="searchOuter">
        <div className="searchBtns">
          <Button onClick={mainChange}>Main</Button>
          <Button onClick={publishedChange}>Published</Button>
          <Button onClick={unPublishedChange}>Drafts</Button>
          <Button>Archives</Button>
        </div>
        <div className="searchBtns"></div>
        <Search
          placeholder="Search through your inventory"
          className="searchBar"
          onSearch={onSearch}
          onChange={e => onSearch(e.target.value)}
          name="searchItem"
          initialValue=""
        />
        <div>
          <Link to="/myprofile/inventory/additem">
            <Button className="add-item-button">+ Add Item</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
