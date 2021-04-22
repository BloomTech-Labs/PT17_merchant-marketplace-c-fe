import React from 'react';
import { Input, Select } from 'antd';
import { Link } from 'react-router-dom';
import './searchbarStyles.css';

function SearchBar({ searchVisible, setData }) {
  const { Search } = Input;
  const { Option } = Select;

  console.log('SearchBar', setData);

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

  return (
    <div className={searchVisible ? 'nope' : 'inView'}>
      <div className="searchOuter">
        <div className="searchBtns">
          <button onClick={mainChange}>Main</button>
          <button onClick={publishedChange}>Published</button>
          <button onClick={unPublishedChange}>Drafts</button>
          <button>Archives</button>
        </div>
        <div className="searchBtns"></div>
        <Search
          placeholder="Search through your inventory"
          className="searchBar"
          onSearch={onSearch}
          onChange={e => onSearch(e.target.value)}
          name="searchItem"
          initialvalue=""
        />
        <div>
          <Select defaultValue="Sort By" onChange={sortChange}>
            <Option value="cat">Category</Option>
          </Select>
          <Select defaultValue="Category" onChange={categoryChange}>
            <Option value="candy">Candy</Option>
          </Select>
        </div>
        <div>
          <Link to="/myprofile/inventory/additem">
            <button className="add-item-button">+ Add Item</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
