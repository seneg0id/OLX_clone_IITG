import Sidebar from "./components/Sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import './App.css'
import Home from "./Pages/Homepage/Home";
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Userlist from "./Pages/userList/Userlist";
import User from "./Pages/user/User";
import Productlist from "./Pages/Productlist/Productlist";
function App() {
  return (
    <BrowserRouter>
      <div>
      <Topbar />
      <div className="container">
          <Sidebar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/users" element={<Userlist />} />
            <Route path="/products" element={<Productlist/> } />
          </Routes>
      </div>
    </div>
    </BrowserRouter>
    
  );
}

export default App;
