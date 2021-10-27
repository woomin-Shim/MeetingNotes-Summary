import React, { useState } from 'react';
import '../routes/Home.css';
import { Link } from 'react-router-dom';

const Timer = () => {
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

  return (
    <div>
      <div className='recoder__timer'>
        {currentState ? (
          <span>00 : 00 : 00</span>
        ) : (
          <span>
            {currentHours < 10 ? `0${currentHours}` : currentHours} : {currentMinutes < 10 ? `0${currentMinutes}` : currentMinutes} : {currentSeconds < 10 ? `0${currentSeconds}` : currentSeconds}
          </span>
        )}
      </div>
      <div className='recode__button'>
        <button className='icon mic' onClick={startButton}>
          <i className='fas fa-microphone fa-2x'></i>
        </button>
        <button className='icon stop'>
          <i className='fas fa-stop fa-2x'></i>
        </button>
      </div>
      <div class='sub-main'>
        <Link to={'/formWindow'}>
          <button class='button-two'>
            <span>회의록 만들기</span>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Timer;
