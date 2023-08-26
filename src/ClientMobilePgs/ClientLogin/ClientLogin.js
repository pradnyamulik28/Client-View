import arkonet from "../../images/Arkonet.jpg";
import style from "./ClientLogin.module.css";
import React, { useState } from "react";
import {useNavigate} from 'react-router-dom';
import { url_ } from '../../Config';

function ClientLogin() {
  const [credentials, setCredentials] = useState({
    UID: "",
  });

  const Navigate=useNavigate();
  

  function handleChange(e) {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  }




  const handleLogin = async () => {

    const jwtToken="eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJQQVZBTjE5OTlKIiwiaWF0IjoxNjkzMDMxMzI5LCJleHAiOjE2OTMwMzMxMjl9.rM5ZIHXgnHHsv6DK1UUlmawClwuAW8DNVqlb9Tg1DR8"

    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${jwtToken}`);

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
       //Pass Password Status,clientid(PAN) to next page
        Navigate(`/clientpasscheck`,
        { state: { isPasswordNull:data.isPasswordNull, 
                   clientid:credentials.UID }}) 
    
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
