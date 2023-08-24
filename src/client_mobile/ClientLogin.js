import "../App.css";
import arkonet from "../images/Arkonet.jpg";
import style from "../style.module.css";
import React, { useState } from "react";
import {useNavigate} from 'react-router-dom';
import { url_ } from '../Config';
//import { useHistory } from 'react-router-dom';

function ClientLogin() {
  const [credentials, setCredentials] = useState({
    UID: "",
  });

  const Navigate=useNavigate();
  

  function handleChange(e) {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  }




  const handleLogin = async () => {


    var myHeaders = new Headers();
myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJQQVZBTjE5OTlKIiwiaWF0IjoxNjkyODY5MTI1LCJleHAiOjE2OTI4NzA5MjV9.4qcGO148T8nYxvUzGm2KBSNavMoEzZgWwEoHRPU1mng");

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

fetch(`${url_}/client/isPasswordNull?pan=${credentials.UID}`, requestOptions)
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("Login error");
    }
  })
  .then((data) => {
       
        Navigate(`/passwordcheck`,{ state: { isPasswordNull:data.isPasswordNull, clientid:credentials.UID }})
    
  })
  .catch(error => console.log('error', error));

   
  };

  return (
    // main class
    <div className={`${style.maincontainer}`}>
      {/* Header */}
      <div className={`${style.header}`}>
        <a href="previous link" id={`${style.welcome}`}>
          &lt;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Welcome to
        </a>
        <h2>TAXKO</h2>
      </div>

      {/* Main Content */}
      <div className={`${style.inputs}`}>
        <form className={`${style.form}`}>
          <label htmlFor="UID" className={`${style.labels}`}>
            Client ID
          </label>
          <input
            type="text"
            id="UID"
            name="UID"
            placeholder="&nbsp;&nbsp;&nbsp;&nbsp;Enter Your PAN"
            value={credentials.UID}
            onChange={handleChange}
          />
         
        </form>
      </div>

      {/* Button */}
      <div className={`${style.button}`}>
        <button type="button" ld={`${style.login}`} onClick={handleLogin}>
          Next
        </button>
        <a href="previous link" id={`${style.forgot}`}>
          <u>Forgot Password?</u>
        </a>
      </div>

      {/* Copyright */}
      <div className={`${style.copyright}`}>
        <a href="previous link" id={`${style.devs}`}>
          Developed & Managed by
        </a>
        <img src={arkonet} alt="" id={`${style.arkonet}`} />
        <a href="previous link" id={`${style.social}`}>
          Follow us on
        </a>
        <div className={`${style.handles}`}>
          <a href="previous link" id={`${style.instagram}`}>
            <i className="fa-brands fa-instagram" style={{ color: "#05022c" }}></i>
          </a>
          <a href="previous link" id={`${style.twitter}`}>
            <i className="fa-brands fa-twitter" style={{ color: "#05022c" }}></i>
          </a>
          <a href="previous link" id={`${style.facebook}`}>
            <i className="fa-brands fa-facebook-f" style={{ color: "#05022c" }}></i>
          </a>
        </div>
      </div>
    </div>
  );
}

export default ClientLogin;
