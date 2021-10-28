import React from 'react';
import logo from '../asset/logo.png';
import './Home.css';
import Timer from '../components/Timer';

const Home = () => {
  return (
    <div className='App'>
      <div className='header'>
        <div className='navbar'>
          <img src={logo} alt='' />
        </div>
        <div className='info'>
          <div className='info__textbox'>
            <p className='info__textbox__bigText'>회의록을 간편하게 만들어보세요.</p>
            <p className='info__textbox__smallText'>
              사용자가 녹음한 내용을 자동으로 요약하여
              <br />
              사용자가 원하는 양식에 맞춰
              <br />
              회의록으로 변환해 줍니다.
            </p>
          </div>
        </div>
      </div>
      <div className='recoder'>
        <div className='recoder__text'>
          <span>Record</span>
        </div>
        <div className='recoder__animation'>
          <div className='loader'>
            <div className='bar1'></div>
            <div className='bar2'></div>
            <div className='bar3'></div>
            <div className='bar4'></div>
            <div className='bar5'></div>
            <div className='bar6'></div>
          </div>
        </div>
        <Timer />
      </div>
    </div>
  );
};

export default Home;