import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Product from "../product/product";
import axios from "axios";
import "./Products.css";
const Products = ({ sort, filters,user }) => {
  const [filteredProducts, Setfilteredproducts] = useState([]);
  const [products, Setproduct] = useState([]);
  const location = useLocation();
  const cat = location.search.split("=")[1];
  useEffect(() => {
    const fetchprod = async () => {
      const res = await axios.get(
        cat
          ? `http://localhost:5000/api/products?category=${cat}`
          : "http://localhost:5000/api/products"
      );
      Setproduct(res.data);
    };
    fetchprod();
  }, [location.search, cat]);
  // useEffect(() => {
  //   const fetchprod = async () => {
  //     const res = await axios.get(
  //       cat
  //         && `http://localhost:5000/api/products?useremail=${cat}`
  //     );
  //     Setproduct(res.data);
  //   };
  //   fetchprod();
  // }, [location.search,cat]);

  useEffect(() => {
    cat &&
      Setfilteredproducts(
        products.filter((item) =>
          Object.entries(filters).every(([key, value]) =>
            item[key].includes(value)
          )
        )
      );
  }, [products, cat, filters]);

  useEffect(() => {
    (!location.search || cat)  &&
      Setfilteredproducts(
        products.filter((item) =>
          Object.entries(filters).every(([key, value]) =>
            item[key].includes(value)
          )
        )
      );
  }, [products, cat, filters,location.search]);


  useEffect(() => {
    if (sort === "newest") {
      Setfilteredproducts((prev) =>
        [...prev].sort((a, b) => a.createdAt - b.createdAt)
      );
    } else if (sort === "asc") {
      Setfilteredproducts((prev) =>
        [...prev].sort((a, b) => a.sellingPrice - b.sellingPrice)
      );
    } else {
      Setfilteredproducts((prev) =>
        [...prev].sort((a, b) => b.sellingPrice - a.sellingPrice)
      );
    }
  }, [sort]);

  return (
    <div className="allprods">
      {cat || !location.search ? filteredProducts.map((p) => (
        <Product user={user} key={p._id} product={p} />
      )) : products.map((p) => (
        <Product user={user} key={p._id} product={p} />
      ))}
    </div>
  );
};

export default Products;
