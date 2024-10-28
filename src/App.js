import React, { useState, useEffect } from "react";
import { products } from "./mockData";
import ProductList from "./ProductList";
import Filters from "./Filters";
import Spinner from "react-spinners/ClipLoader"; // For loading spinner
import debounce from "lodash.debounce";
import './App.css';

const App = () => {
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [filters, setFilters] = useState({
    category: "",
    brand: "",
    priceRange: [0, 500],
    rating: 0,
  });
  const [loading, setLoading] = useState(false);
  const [noResults, setNoResults] = useState(false);

  useEffect(() => {
    const savedFilters = JSON.parse(localStorage.getItem("filters"));
    if (savedFilters) {
      setFilters(savedFilters);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("filters", JSON.stringify(filters));
  }, [filters]);


  useEffect(() => {
    setLoading(true);
    const debounceFilter = debounce(() => {
      const { category, brand, priceRange, rating } = filters;
      const results = products.filter((product) => {
        return (
            (category ? product.category === category : true) &&
            (brand ? product.brand === brand : true) &&
            product.price >= priceRange[0] &&
            product.price <= priceRange[1] &&
            product.rating >= rating
        );
      });
      setFilteredProducts(results);
      setNoResults(results.length === 0);
      setLoading(false);
    }, 300);

    debounceFilter();

    return () => {
      debounceFilter.cancel();
    };
  }, [filters]);

  return (
      <div className="App">
        <h1>Product Catalog</h1>
        <div style={{ display: "flex" }}>
          <Filters setFilters={setFilters} />
          <div style={{ flexGrow: 1 }}>
            {loading ? (
                <Spinner />
            ) : noResults ? (
                <p>No products found</p>
            ) : (
                <ProductList products={filteredProducts} />
            )}
          </div>
        </div>
      </div>
  );
};

export default App;
