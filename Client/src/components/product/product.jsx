import { Link } from "react-router-dom";
import "./product.css";

const Product = ({ product}) => {
  const PF = "http://localhost:5000/images/";
  return (
    <div className="singleprod">
      <div className="circle"></div>
      {product.photo && <img className='Image' src={PF  + product.photo} alt="Product" />}
      <Link  to={`/productdetails/${product._id}`}> <div className="info">
        <div className="text">{product.productName}</div>
        <div className="text">Price {product.sellingPrice}</div>
      </div></Link>
    </div>
  );
};

export default Product;
