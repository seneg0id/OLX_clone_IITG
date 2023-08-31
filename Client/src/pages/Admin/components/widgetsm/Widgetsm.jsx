import { Visibility } from "@mui/icons-material";
import axios from "axios";
import { useEffect, useState } from "react";
import "./Widgetsm.css";


const Widgetsm = ({user}) => {
  const BASE_URL = "http://localhost:5000/api/"
  const userRequest = axios.create({
    baseURL: BASE_URL,
    headers:{token:`Bearer ${user.accessToken}`}
  })
  
  const [users, Setusers] = useState([]);

  useEffect(() => {
    const fetchusers = async () => {
      try {
        const res = await userRequest.get("users/");
        Setusers(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchusers();
  }, [userRequest]);

  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">New Join Members</span>
      <ul className="widgetSmList">
        {users.map((user) => (
          <li className="widgetSmListItem">
            <img
              src={
                users.img ||
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFL6wnaSoiAJc50Xl0Jj32rh54rj-HZz_efg&usqp=CAU"
              }
              alt=""
              className="widgetSmImg"
            />
            <div className="widgetSmUser">
              <span className="widgetSmUsername">{user.Username}</span>
              <span className="widgetSmUserTitlr">{user.email}</span>
            </div>
            <button className="widgetSmButton">
              <Visibility className="widgetSmIcon" />
              Display
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Widgetsm;
