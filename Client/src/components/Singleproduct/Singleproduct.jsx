import React from "react";
import Dropdown from "../Dropdown/Dropdown";
import "./Singleproduct.css";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";


const Singleproduct = ({ user }) => {
  console.log(user._id)
  const BASE_URL = "http://localhost:5000/api/"
  const userRequest = axios.create({
    baseURL: BASE_URL,
    headers:{token:`Bearer ${user.accessToken}`}
  })
  
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [isDeal, Setisdeal] = useState(false) 
  const userID = user._id
  const[productID,Setproductid] = useState('')
  const [Product, Setproduct] = useState({});
  const [productName, Setproductname] = useState("");
  const [productDescription, Setproductdescription] = useState("");
  const [purchaseDate, Setpurchasedate] = useState("");
  const [sellingPrice, Setsellingprice] = useState("");
  const [updateMode, Setupdatemode] = useState(false);

  useEffect(() => {
    const getproduct = async () => {
      const res = await axios.get(`/products/${path}`);
      Setproduct(res.data);
      Setproductname(res.data.productName);
      Setproductdescription(res.data.productDescription);
      Setpurchasedate(res.data.purchaseDate);
      Setsellingprice(res.data.sellingPrice);
      Setproductid(res.data._id)
    };
    getproduct();
  }, [path]);
  const PF = "http://localhost:5000/images/";

  const handleDelete = async () => {
    try {
      await axios.delete(`/products/${path}`, {
        data: { useremail: user.email },
      });
      window.location.replace("/home");
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`/products/${path}`, {
        useremail: user.email,
        productName,
        productDescription,
        purchaseDate,
        sellingPrice,
      });
      Setupdatemode(false);
      window.location.reload()
    } catch (error) {
      console.log(error);
    }
  };

  const handlechanges = () => {
    Setisdeal('true')
  }

  
  const handleDeal = async () => {
    const newDeal = {
      isDeal,
      userID,
      productID
    } 
    try {
      await userRequest.post('/deals/',newDeal)
     } catch (error) {
      console.log(error)
     }
  }

  const myfunc = () => {
    handlechanges();
    handleDeal();
  }

  return (
    <div className="productdetails">
      <Dropdown />
      {Product.photo && (
        <img src={PF + Product.photo} alt="Cycle" className="imgStyle" />
      )}

      <label htmlFor="productName" className="_1">
        Product Name
      </label>
      {updateMode ? (
        <input
          className="productName1"
          type="text"
          value={productName}
          onChange={(e) => Setproductname(e.target.value)}
        />
      ) : (
        <div className="productName"> {Product.productName} </div>
      )}
      <label htmlFor="productDescription" className="_2">
        Product Description
      </label>
      {updateMode ? (
        <input
          className="productName1"
          type="text"
          value={productDescription}
          onChange={(e) => Setproductdescription(e.target.value)}
        />
      ) : (
        <p className="productDescription">{Product.productDescription}</p>
      )}
      <label htmlFor="purchaseDate" className="_1">
        Purchase Date
      </label>
      {updateMode ? (
        <input
          className="productName1"
          type="text"
          value={purchaseDate}
          onChange={(e) => Setpurchasedate(e.target.value)}
        />
      ) : (
        <div className="purchaseDate"> {Product.purchaseDate} </div>
      )}
      <label htmlFor="sellingPrice" className="_1">
        Selling Price
      </label>
      {updateMode ? (
        <input
          className="productName1"
          type="text"
          value={sellingPrice}
          onChange={(e) => Setsellingprice(e.target.value)}
        />
      ) : (
        <div className="sellingPrice"> {Product.sellingPrice} </div>
      )}
      <label htmlFor="contactSeller" className="_1">
        Contact Seller
      </label>
      <div className="contactSeller">
        {" "}
        {Product.useremail} , {Product.Name}{" "}
      </div>
      <label htmlFor="nego" className="_1">
        Negotiable
      </label>
      <div className="nego"> {Product.negotiable} </div>
      {!isDeal && <div className="makedeal" >
        <span onClick={myfunc} >Make Deal</span>
      </div>}
      {(Product.useremail === user.email || user.isAdmin) && (
        <div className="singleproductedit">
          {(!user.isAdmin || Product.useremail === user.email) && <i
            className="singleposticon fa-solid fa-pen-to-square"
            onClick={() => Setupdatemode(true)}
          ></i>}
          <i    
            className="singleposticon fa-regular fa-trash-can"
            onClick={handleDelete}
          ></i>
        </div>
      )}
      {updateMode && (
        <div className="updatebutton">
          <button className="productupdate" onClick={handleUpdate}>
            Update
          </button>
        </div>
      )}

      <a href="/buyerhomepage">
        <button id="button4">Buy</button>
      </a>
      <a href="/sellercategory">
        <button id="button5">Sell</button>
      </a>
    </div>
  );
};

export default Singleproduct;
