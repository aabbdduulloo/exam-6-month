import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import "./Users.css";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import axios from "axios";

const request = axios.create({
  baseURL: "https://fakestoreapi.com/products",
});

function Users() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [category, setCategory] = useState("");
  const [rating, setRating] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await request.get("/");
        setProducts(response.data);
        setFilteredProducts(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredProductsMemo = useMemo(() => {
    return products.filter(product => {
      const categoryMatch = category ? product.category === category : true;
      const ratingMatch = rating ? product.rating.rate >= rating : true;
      return categoryMatch && ratingMatch;
    });
  }, [category, rating, products]);

  useEffect(() => {
    setFilteredProducts(filteredProductsMemo);
    setPage(1);
  }, [category, rating, filteredProductsMemo]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleCategoryChange = event => {
    setCategory(event.target.value);
  };

  const handleRatingChange = event => {
    setRating(event.target.value);
  };

  const handleItemsPerPageChange = event => {
    setItemsPerPage(event.target.value);
    setPage(1);
  };

  const pageCount = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, filteredProducts.length);
  const displayedProducts = filteredProducts.slice(startIndex, endIndex);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <div className="form-control">
        <FormControl variant="outlined" fullWidth>
          <InputLabel>Category</InputLabel>
          <Select
            value={category}
            onChange={handleCategoryChange}
            label="Category"
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="men's clothing">Men's Clothing</MenuItem>
            <MenuItem value="women's clothing">Women's Clothing</MenuItem>
            <MenuItem value="jewelery">Jewelery</MenuItem>
            <MenuItem value="electronics">Electronics</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div className="form-control">
        <FormControl variant="outlined" fullWidth>
          <InputLabel>Items per Page</InputLabel>
          <Select
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
            label="Items per Page"
          >
            <MenuItem value={3}>3</MenuItem>
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={10}>10</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div className="products-list">
        {displayedProducts.map(product => (
          <div key={product.id} className="product-card">
            <Link to={`/product/${product.id}`}>
              <h3>{product.title}</h3>
            </Link>
            <p>
              <strong>Price:</strong> ${product.price}
            </p>
            <p>
              <strong>Description:</strong> {product.description}
            </p>
            <p>
              <strong>Category:</strong> {product.category}
            </p>
            <p>
              <strong>Rating:</strong> {product.rating.rate} (
              {product.rating.count} reviews)
            </p>
            <img
              src={product.image}
              alt={product.title}
              className="product-image"
            />
          </div>
        ))}
      </div>
      <Stack spacing={2} className="pagination">
        <Pagination
          count={pageCount}
          page={page}
          onChange={handleChangePage}
          color="primary"
          variant="outlined"
        />
      </Stack>
    </div>
  );
}

export default Users;
