import Splash from "./pages/Splash/Splash";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import "../src/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminHome from './pages/Admin/Homepage/Home'
import Userlist from './pages/Admin/userList/Userlist'
import Productlist from './pages/Admin/Productlist/Productlist'
import BuyerCategoryPage from "./pages/BuyerCategoryPage/BuyerCategorypage";
import SellerHomepage from "./pages/SellingDetails/SellingDetails";
import Profile from "./pages/Profile/Profile";
import Cycle from "./pages/ProductDetails/ProductDetails";
import BuyerHomepage from "./pages/BuyerHomepage/BuyerHomepage";
import SellerCategorypage from "./pages/SellerCategorypage/SellerCategorypage";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { loginSuccess } from "./redux/userRedux";
function App() {
  // const user = true;
  const [user, setUser] = useState(null);
  const dispatch = useDispatch()
  useEffect(() => {
    const getUser = () => {
      fetch("http://localhost:5000/auth/login/success", {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      })
        .then((response) => {
          if (response.status === 200) return response.json();
          throw new Error("authentication has been failed");
        })
        .then((resObject) => {
          setUser(resObject.user);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getUser();
  }, []);
  
  const [isLoading, setIsLoading] = useState(true);
  
  const lol = useSelector(state => state.user)
  useEffect(() => {
    dispatch(
      loginSuccess(user)
    )
  })

  useEffect(() => {
    // Wait for 3 seconds
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);


  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={isLoading ? <Splash /> : <Login />} />
          <Route path="/home" element={user ? <Home  /> : <Login />} />
          <Route path="/auth/login" element={user ? <Home  /> : <Login />} />
          <Route
            path="/buyercategory"
            element={user ? <BuyerCategoryPage /> : <Login />}
          />
          <Route
            path="/buyerhomepage"
            element={user ? <BuyerHomepage user={user}/> : <Login />}
          />
          <Route
            path="/sellercategory"
            element={user ? <SellerCategorypage /> : <Login />}
          />
          <Route
            path="/sellerhomepage"
            element={user ? <SellerHomepage user={user} /> : <Login />}
          />
          <Route
            path="/profile"
            element={user ? <Profile user={user} /> : <Login />}
          />
          <Route
            path="/productdetails/:productId"
            element={user ? <Cycle User={user} /> : <Login />}
          />
            <Route path="/admin" element={(user && user.isAdmin) ? <AdminHome user={user} /> : <Home  />} />
            <Route path="/admin/users" element={(user && user.isAdmin) ? <Userlist  user={user}/> : <Home />} />
            <Route path="/admin/products" element={(user && user.isAdmin) ? <Productlist user={user}/> : <Home />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
