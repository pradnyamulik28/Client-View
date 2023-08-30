import arkonet from "../../images/Arkonet.jpg";
import style from "./ClientLogin.module.css";
import React, { useState } from "react";
import {useNavigate} from 'react-router-dom';
import { url_ } from '../../Config';

function ClientLogin() {
  const Navigate=useNavigate();

  const [credentials, setCredentials] = useState({
    UID: "",
  }); 
  

  function handleChange(e) {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  }

  const handleLogin = async () => {


  //------------------Check the password status------------


var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
  "pan": credentials.UID
});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch(`${url_}/client/isPasswordNull`, requestOptions)
  .then(response => response.json())
  .then(result => {
    console.log(result)
    //Pass Password Status,clientpan) to next page
            Navigate(`/clientpasscheck`,
            { state: { isPasswordNull:result.isPasswordNull, 
                        clientpan:credentials.UID }}) 
  })
  .catch(error => console.log('error', error));

  };

  return (
    <div className={`${style.outercontainer}`}>
    {/*  main class */}
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
        <button type="button" className={`${style.login}`} onClick={handleLogin}>
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
    </div>
  );
}

export default ClientLogin;
