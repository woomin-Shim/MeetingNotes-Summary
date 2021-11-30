import React, { useState } from 'react';
import '../routes/Home.css';
import { Link } from 'react-router-dom';

const Tmp2 = () => {
    const [currentState, setCurrentState] = useState(false);
    const [currentHours, setCurrentHours] = useState(0);
    const [currentMinutes, setCurrentMinutes] = useState(0);
    const [currentSeconds, setCurrentSeconds] = useState(0);
  
    let Time = 0;
    let cron;
  
    const startButton = () => {
      setCurrentState(false);
      updateTimer();
      cron = setInterval(updateTimer, 1000);
      console.log('start');
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
  
    const showDiv1 = () => {
      document.getElementById('btn1').style.visibility = 'visible';
    };
    const showDiv2 = () => {
      document.getElementById('btn2').style.visibility = 'visible';
    };
  
    const hideDiv1 = () => {
      document.getElementById('btn1').style.visibility = 'hidden';
    };
    const hideDiv2 = () => {
      document.getElementById('btn2').style.visibility = 'hidden';
    };
    return (
      <div>
        <div className='recode__button'>
          <div className='recode__button__result'>

          <div className='arrow_box' id='btn2'>
            회의록 변환
          </div>
          <Link to='/result'>
            <button className='icon stop' onMouseOver={showDiv2} onMouseOut={hideDiv2} >
              <i class="fas fa-book"></i>
            </button> 
          </Link>
        </div>
      </div>
      </div>
    );
  };
  
  export default Tmp2;