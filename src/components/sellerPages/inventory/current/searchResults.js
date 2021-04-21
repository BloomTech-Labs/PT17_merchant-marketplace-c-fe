import React, { lazy, Suspense } from 'react';
import LoadingProductCard from '../../../common/cards/normalItem/LoadingProductCard';
import useSearch from '../../../common/customHooks/useSearch';
import { NavLink } from 'react-router-dom';

const LazyItemCard = lazy(() => import('../../../common/cards/normalItem'));

function SearchResults({ data, filter }) {
  const searchData = useSearch(data, 'item_name', filter);
  return (
    <div>
      {searchData.map(item => (
        <NavLink
          to={`/myprofile/inventory/productpage/${item.id}`}
          key={item.id}
        >
          {/**---------------------------------------- */}
          <Suspense fallback={<LoadingProductCard />}>
            <LazyItemCard
              id={item.id}
              key={item.id}
              name={item.item_name}
              price={item.price_in_cents}
              description={item.description}
              count={item.quantity_available}
              image={item.id}
              published={item.published}
            />
          </Suspense>
          {/**---------------------------------------- */}
        </NavLink>
      ))}
    </div>
  );
}

export default SearchResults;
