import Search from '@mui/icons-material/Search';
import React from "react";
import Dropdown from '../Dropdown/Dropdown';
import './Navbar.css'
import { Link } from 'react-router-dom';
import  HomeIcon  from '@mui/icons-material/Home';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
const Navbar = ({user}) => {
  return (
    <div className='Container'>
          <div className="Wrapper">
              <div className="Left">
                  <div className="Language">EN</div>
                  <div className="SearchContainer">
                      <input type="text" placeholder='Search' className='Input' />
                      <Search style={{ color: "gray", fontSize: 16 }} />
          </div>
          <Link to={'/home'} ><HomeIcon className='navhome' sx={{ fontSize: 30 }} /></Link>
          <Link to={'/admin'}>
          <AdminPanelSettingsIcon className='admin' sx={{ fontSize: 28 }} />
          </Link>
              </div>
        <div className="Center">
          
                  <div className="Logo67">CAMPUS OLX</div>
              </div>
        <div className="Right">
          <Dropdown />
              </div>
          </div>
    </div>
  );
};

export default Navbar;