
import React from 'react';
import styles from './DocFolder.module.css';
import { Link } from 'react-router-dom';
import { url_ } from '../Config';
import {useLocation} from 'react-router-dom'


const DocFolder = () => {
  const  id  = useLocation().state.clientid;
  //console.log(" client id : ",id)
  const user_id = window.localStorage.getItem('user_id');
  const storedToken = window.localStorage.getItem('jwtToken');

  function getLastFiveYears() {
    const currentYear = new Date().getFullYear();
    const lastFiveYears = [];

    for (let i = 0; i < 6; i++) { // Change 6 to 5 to get the last five years
      lastFiveYears.push(currentYear - i);
    }

    return lastFiveYears;
  }

  const lastFiveYearsArray = getLastFiveYears();

  const getFolderColor = (index) => {
    const colors = ['text-primary', 'text-danger', 'text-warning', 'text-success', 'text-secondary', 'text-info'];
    return colors[index % colors.length];
  };


  return (
    <div className="container">
      <div className="row" >
        <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 mt-5" id={styles.maindiv}>
          <h1><b>Income Tax</b></h1>
          <div className="row">
            {lastFiveYearsArray.map((year, index) => (
              <div key={index} className="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                <Link to={`/viewfile`}  
                className={`${styles.linktab}`} 
                state={{clientid:id,year:`${year - 1}-${year.toString().slice(-2)}`}}> {/* Pass the year to SendData */}
                  <div className={`${styles.card} ${styles[`card${index + 1}`]}`} id={styles.card1}>
                    <div className={styles.icon}>
                      <p className={styles.icons}>
                        <i className={`bi bi-folder-fill ${getFolderColor(index)}`} id={styles.icon_left}></i>
                        <i className={`fa-solid fa-ellipsis-vertical ${getFolderColor(index)}`} id={styles.icon_right}></i>
                      </p>
                    </div>
                    <div className={`${getFolderColor(index)} ${styles.cont} h6`}>
                      <h5>A.Y {year - 1}-{year.toString().slice(-2)}</h5>
                      <p>Financial Year {year - 1}-{year.toString().slice(-2)}</p>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DocFolder;
