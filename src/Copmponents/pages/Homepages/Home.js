import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import QuestionList from "../../Questions/QuestionList";
import "./Home.css";
import Logoutnotfictions from "../../login/Logoutnotfictions";
const Home = () => {
  const { userData, setUserData } = useContext(UserContext);
  const navigate = useNavigate();
  const [notification, setNotification] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_base_url}/user`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("auth-token")}`,
          },
        });

        setUserData({
          token: localStorage.getItem("auth-token"),
          user: res.data,
        });
      } catch (err) {
        console.log(err);
      }
    };

    fetchUser();
  }, [setUserData]);
  //** let user to login if not signed in */
  useEffect(() => {
    if (!userData.user) navigate("/login");
  }, [userData.user, navigate]);


  return (
    <div style={{ marginTop: "160px" }}>
      <div className="d-flex home-page ">
        
        <div className="ask">
          <Link to="questions " className="link">
            {" "}
            <h2 className="askQ" title="click here to ask">Aks Quesiosn</h2>
          </Link>{" "}
          <br />
        </div>
     
        <div className=" d-flex welcome">
          <h2 className="username">
          Welcome:  {userData.user?.display_name} 
          {/* <img 
  src={`https://ui-avatars.com/api/?name=${userData.user?.display_name}&background=FF0000&color=fff&size=50&rounded=true`}
  alt="User Avatar"
  className="avatars mx-2"
/>  */}
          </h2> 
      
        </div>
      </div>
       {/*  */}
      {/* <Logoutnotfictions/> */}
      <QuestionList />
      <hr />
    </div>
  );
};

export default Home;
