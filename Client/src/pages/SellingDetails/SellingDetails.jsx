import "./SellingDetails.css";
import Navbar from '../../components/Navbar/Navbar';
import { useState } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";

export default function SellerHomepage({ user }) {
  const [productName, Setproductname] = useState("");
  const [Name, Setsellername] = useState("")
  const [productDescription, Setproductdescription] = useState("");
  const [purchaseDate, Setpurchasedate] = useState("");
  const [sellingPrice, Setsellingprice] = useState("");
  const [file, Setfile] = useState(null);
  const [useremail,Setuseremail] = useState("")
  const [contact, Setcontact] = useState("");
  const [negotiable,Setnegotiable] = useState(false)

  const location = useLocation();
  const catname = location.search.split('=')[1]

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newProd = {
      productName,
      Name,
      productDescription,
      purchaseDate,
      sellingPrice,
      contact,
      useremail,
      category: catname,
      negotiable,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      newProd.photo = filename;
      try {
        await axios.post("/upload", data);
      } catch (error) {
        console.log(error)
      }
    }
    try {
      const res = await axios.post("/products", newProd);
      window.location.replace("/productdetails/" + res.data._id);
    } catch (error) {
      console.log(error.response.data)
    }
  };

  return (
    <div className="prodinfo">
      <Navbar/>
      <div className="center">
      {file && (
        <img className="writeImg" src={URL.createObjectURL(file)} alt="" />
      )}
        <form onSubmit={handleSubmit}>
          <div className="imageinpu">
            <input
              type="file"
              className="imageinput"
              required={true}
              onChange={(e) => Setfile(e.target.files[0])}
            />
          </div>
          <div className="pNam">
            <input
              type="text"
              className="prodname"
              placeholder="Product Name"
              autoFocus={true}
              required={true}
              onChange={(e) => Setproductname(e.target.value)}
            />
          </div>
          <div className="pDes">
            <input
              type="text"
              className="prodDes"
              placeholder="Product Description"
              required={true}
              onChange={(e) => Setproductdescription(e.target.value)}
            />
          </div>
          <div className="pDat">
            <input
              type="text"
              className="prodDate"
              placeholder="Purchase Date"
              required={true}
              onChange={(e) => Setpurchasedate(e.target.value)}
            />
          </div>
          <div className="pNam">
            <input
              type="text"
              className="prodname"
              placeholder="Selling Price"
              required={true}
              onChange={(e) => Setsellingprice(e.target.value)}
            />
          </div>
          <div className="pNam">
            <input
              type="checkbox"
              className="prodname"
              placeholder="Negotiable type true else false"
              onChange={(e) => Setnegotiable(true)}
            />Negotiable
          </div>
          <div className="pNam">
            <input
              type="text"
              className="prodname"
              required={true}
              placeholder="Contact Details"
              onChange={(e) => Setcontact(e.target.value)}
            />
          </div>
          <div className="pNam">
            <input
              type="text"
              className="prodname"
              placeholder="email"
              required={true}
              onChange={(e) => Setuseremail(e.target.value)}
            />
          </div>
          <div className="pNam">
            <input
              type="text"
              className="prodname"
              placeholder="Seller name"
              required={true}
              onChange={(e) => Setsellername(e.target.value)}
            />
          </div>
          <button className="button2" type="submit">
            Save
          </button>
        </form>
          <Link to={'/home'} ><button className="button1">Cancel</button></Link> 
      </div>
    </div>
  );
}
