import "./Login.css";
import img1 from "../pictures/img1.jpg";
import iitg from "../pictures/iitg.jpg";
import Button from "../../components/Button/Button";
import logo from '../pictures/logo.PNG'
const Login = () => {
  const outlook = () => {
    window.open('http://localhost:5000/auth/outlook','_self')
  }
  const facebook = () => {
    window.open('https://www.facebook.com/','_blank')
  }
  const instagram = () => {
    window.open('https://www.instagram.com/','_blank')
  }
  return (
    <div className="main" style={{ backgroundColor: '#D9E1E7' }}>
      <div className="Main">
      <img className="logo_" src={logo} alt="logo" />
      <img className="campus" align='center' src={iitg} alt="" />
      </div>
      <img className="img1" src={img1} alt="" />
      <div className="button" onClick={outlook}>
        <Button styles={{ padding:'40% 15%' , font:'Montserrat'}} text={<b><h2>Login</h2></b>} />
       </div>
          <div className="contact">
              <i className="topicon1 fa-brands fa-facebook" onClick={facebook}></i>
              <i className="topicon2 fa-brands fa-instagram" onClick={instagram} ></i>
          </div>
    </div>
  );
};

export default Login;
