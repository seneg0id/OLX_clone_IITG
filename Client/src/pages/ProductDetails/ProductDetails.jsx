import "./ProductDetails.css";
import Singleproduct from "../../components/Singleproduct/Singleproduct";
import Navbar from '../../components/Navbar/Navbar';
export default function Cycle({User}) {
  return (
    <div className="productdetails">
      <Navbar />
      <Singleproduct user={User} />
    </div>
  );
}

