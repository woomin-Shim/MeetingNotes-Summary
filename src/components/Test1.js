import React, { useState } from 'react';
import '../routes/Home.css';
import { Link } from 'react-router-dom';

const Test1 = () => {
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
  const moveHome = () => {
    document.location.href = '/';
  };
  const moveResult = () => {
    document.location.href = '/result';
  };
  const onConfirm = () => {
    if (window.confirm('회의록을 만드시겠습니까?')) {
      console.log('확인');
      return moveResult();
    } else {
      return moveHome();
    }
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
        <div className='recode__button__div'>
          <div className='arrow_box' id='btn1'>
            녹음하기
          </div>
          <button className='icon mic' onClick={startButton} onMouseOver={showDiv1} onMouseOut={hideDiv1}>
            <i className='fas fa-microphone fa-2x'></i>
          </button>
        </div>
        <div className='recode__button__div'>
          <div className='arrow_box' id='btn2'>
            녹음중지
          </div>
          <button className='icon stop' onClick={onConfirm} onMouseOver={showDiv2} onMouseOut={hideDiv2}>
            <i className='fas fa-stop fa-2x'></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Test1;
