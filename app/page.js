'use client';

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import ProductCard from './components/ProductCard.jsx';
import CategorySelect from './components/CategorySelect.jsx';
import LoadingPage from './components/Loading.jsx'; 

const HomePage = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories);
  
  const [products, setProducts] = useState([]); // Local products state
  const [selectedCategory, setSelectedCategory] = useState('');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('https://dummyjson.com/products/categories');
        dispatch({ type: 'SET_CATEGORIES', payload: response.data });
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, [dispatch]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      let url = `https://dummyjson.com/products?limit=10&skip=${(page - 1) * 10}`;
      if (selectedCategory) {
        url = `https://dummyjson.com/products/category/${selectedCategory}?limit=10&skip=${(page - 1) * 10}`;
      }
      const response = await axios.get(url);
      const fetchedProducts = response.data.products || [];
      
      // Update hasMore based on the number of fetched products
      if (fetchedProducts.length < 10) setHasMore(false);
      setProducts((prev) => [...prev, ...fetchedProducts]);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (hasMore) {
      fetchProducts();
    }
  }, [page, selectedCategory, hasMore]); // Dependency on selectedCategory and page

  useEffect(() => {
    // Simulate an initial loading time of 5 seconds
    const timeout = setTimeout(() => {
      setInitialLoad(false);
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setProducts([]); // Clear products on category change
    setPage(1); // Reset page to 1
    setHasMore(true); // Reset hasMore to true
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 100
      ) {
        if (hasMore && !loading) {
          setPage((prevPage) => prevPage + 1);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasMore, loading]);

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm)
  );

  // Render the loading page if still loading or during initial load
  if (initialLoad) {
    return <LoadingPage />;
  }

  return (
    <div className="container mx-auto p-4 md:p-6">
      <div className='flex flex-row items-center justify-between mb-6'>
        <h1 className="text-2xl font-bold ">Product List</h1>
        <CategorySelect
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={handleCategoryChange}
          className="mt-4 md:mt-0"
          key={categories}
        />
      </div>

      <input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Search for products..."
        className="p-2 border rounded mb-6 w-full border-slate-300"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {loading && <p className="text-center mt-6">Loading more products...</p>}
      {!hasMore && <p className="text-center mt-6">No more products to load.</p>}
    </div>
  );
};

export default HomePage;



// Important Notes (Limitations) :
//----------------------------------------------------------------------------------
// 1.) Limited error handling and loading indicators.
// 2.) No caching mechanism for fetched data.
// 3.) Styling is minimal; we can add more styles.

