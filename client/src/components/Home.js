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
          <Link to = "/speechtoText">
          <button onClick={SpeechToText}>Record</button>
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

/*----------------------------- 음성 인식 -----------------------------------------*/

function SpeechToText () {
  try{
      var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      var recognition = new SpeechRecognition();
    }
    catch(e) {
      console.error(e);
      ('.no-browser-support').show();
      alert('Google Chrome에서만 동작합니다.')
    }
    
    var speechContent = '';
  
    /*-----------------------------
          Voice Recognition 
    ------------------------------*/
    // If false, the recording will stop after a few seconds of silence.
    // When true, the silence period is longer (about 15 seconds),
    // allowing us to keep recording even when the user pauses. 
    recognition.continuous = true;
    recognition.lang = "ko-KR";
    var recognizing = false;
  
    // This block is called every time the Speech APi captures a line. 
    // 음성 인식 결과 처리
    recognition.onresult = function(event) {
      // event is a SpeechRecognitionEvent object.
      // It holds all the lines we have captured so far. 
      // We only need the current one.
      var current = event.resultIndex;
    
      // Get a transcript of what was said.
      var transcript = event.results[current][0].transcript;
  
      if(typeof(event.results) == 'undefined'){
        console.log("undefined start")
        recognition.stop()
        recognizing = false
        recognition.start()
        console.log("undefined end")
        return;  
      }
  
      // Add the current transcript to the contents of our Note.
      // There is a weird bug on mobile, where everything is repeated twice.
      // There is no official solution so far so we have to handle an edge case.
      var mobileRepeatBug = (current == 1 && transcript == event.results[0][0].transcript);
  
      if(!mobileRepeatBug) {
        speechContent += transcript;
        console.log(speechContent);
      }
  
    };
  
    recognition.onstart = function() {
      console.log('Voice recognition activated.')
      recognizing = true;
    }
  
    recognition.onend = function () {
      console.log("ONEND")
      recognition.stop()
      recognizing = false
    }
  
    recognition.onerror = function(event) {
      console.log("ERROR")
      recognizing = false
      recognition.stop()
      if (event.error == 'no-speech') {
        console.log("NO SPEECH")
      }
      if (event.error == 'audio-capture') {
          console.log("Capture Problem")
      }
    }
    // 음성 인식 트리거
    recognition.start();
  }

export default Home;

