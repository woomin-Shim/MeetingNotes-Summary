import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../asset/logo.png';
import './Home.css';

const Timer = () => {
  const [visible, setVisible] = useState(true);
  const [currentHours, setCurrentHours] = useState(0);
  const [currentMinutes, setCurrentMinutes] = useState(0);
  const [currentSeconds, setCurrentSeconds] = useState(0);

  let Time = 0;
  let cron;

  const startButton = () => {
    updateTimer();
    cron = setInterval(updateTimer, 1000);
  };

  const updateTimer = () => {
    const checkMinutes = Math.floor(Time / 60);
    const hours = Math.floor(Time / 3600);
    const minutes = checkMinutes % 60;
    const seconds = Time % 60;
    setCurrentHours(hours);
    setCurrentSeconds(seconds);
    setCurrentMinutes(minutes);
    Time++;
  };
  return (
			<div className='recode__button'>
        
      <button onClick={() => { setVisible(!visible)  }}>
        {visible ? <i className='fas fa-microphone fa-2x'></i> : <i className='fas fa-stop fa-2x'></i>}
      </button>

    	</div>
  )
};
const Home = () => {
  return (
    <div className='App'>
      <div className='header'>
        <nav className='navbar'>
          <div className='navbar__logo'>
            <img src={logo} alt='123' />
          </div>
          <ul className='navbar__menu'>
            <li>HOME</li>
            <li>RECORD</li>
          </ul>
        </nav>
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
          <Link to = "./translate">
          <button>Record</button>
          </Link>
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

