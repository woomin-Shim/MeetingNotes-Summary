import React, { useState, useEffect } from 'react';
import '../routes/Home.css';
import { Link } from 'react-router-dom';
import logo from '../asset/logo.png';
import './Home.css';
import './test2.css';
import Tmp2 from './tmp2';
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";

const Test2 = () => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 6000)
  }, [])
  return (
    <div className='App'>
      {
        loading ?

        <div className='loading'>
        <ClimbingBoxLoader color={"#191820"} loading={loading} size={40} />
        </div>

        :

        <div className='header'>
            <div className='navbar'>
              <img src={logo} alt='' />
            </div>
            <div className='info'>
              <div className='info__textbox'>
                <p className='info__textbox__bigText'>회의록이 완성되었습니다.</p>
                <p className='info__textbox__smallText'>
                  아래 버튼을 눌러 
                  <br />
                  회의록을 확인해 보세요.
                  <br />
                  <br />
                  <Tmp2 />
                </p>
              </div>
            </div>
          </div>
      }
    </div>
  );
};

export default Test2;