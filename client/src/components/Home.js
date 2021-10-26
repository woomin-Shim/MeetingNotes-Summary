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
  const language = 'ko-KR';
  
  let isRecognizing = false;
  let ignoreEndProcess = false;
  let finalTranscript = '';

  var a = '';
  var translate;

  recognition.continuous = true;
  recognition.interimResults = true; 
  //true : recognition이 result의 중간중간을 보고한다
  
  /**
   * 음성 인식 시작 처리
   */
  recognition.onstart = function (event) {
      console.log('onstart', event);
      isRecognizing = true;
      //recording_state.className = 'on';
  };

  /**
   * 음성 인식 종료 처리
   */
  recognition.onend = function () {
      console.log('onend', arguments);
      isRecognizing = false;

      if (ignoreEndProcess) {
          return false;
      }

      // Do end process
      console.log('off')
      if (!finalTranscript) {
      console.log('empty finalTranscript');
      return false;
      }
  };

  /**
   * 음성 인식 결과 처리
   * 밑의 코드는 SpeechRecognition 객체의 onresult Property인 이벤트 핸들러를 설정하는 것임.
   * API로부터 성공적으로 result를 받았을 때 밑에서 정의한 SpeechRecognition 객체의 onresult 이벤트가 핸들러가 호출됨.
   */
  recognition.onresult = function (event) {
      console.log('onresult', event);

      let finalTranscript = '';
      let interimTranscript = '';
      if (typeof event.results === 'undefined') {
          recognition.onend = null;
          recognition.stop();
          return;
      }

      for (let i = event.resultIndex; i < event.results.length; ++i) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
              finalTranscript += transcript;
          } else {
              interimTranscript += transcript;
          }
      }

      console.log('번역중 : ', interimTranscript);
      console.log('최종번역 : ', finalTranscript);
      // fireCommand(interimTranscript);
  };

  /**
   * 음성 인식 에러 처리
   */
  recognition.onerror = function (event) {
      console.log('onerror', event);

      if (event.error.match(/no-speech|audio-capture|not-allowed/)) {
      ignoreEndProcess = true;
      }
  };

  /**
   * 명령어 처리
   * @param string
   */

  /**
   * 음성 인식 트리거
   *  마이크 버튼 눌렀을때
   */
  function start() {
      if (isRecognizing) { //녹음 버튼을 두번 누른거니까 종료
          recognition.stop();
          console.log('종료');
          /* 번역 텍스트 파일 다운로드
          var hiddenElement = document.createElement('a');
          hiddenElement.href = 'data:attachment/text,' + encodeURI(recognizedTextarea.innerText);
          hiddenElement.target = '_blank';
          hiddenElement.download = 'translate.txt';
          hiddenElement.click();
          */
          /* 소켓 통신
          socket.emit('translate', {type: 'mymessage', message: translate});
          */
          return;
      }
      recognition.lang = language;
      recognition.start(); //이게 호출되면 음성인식 시작
      a = '';
      ignoreEndProcess = false;

      finalTranscript = '';
  }
  /**
   * 초기 바인딩
   */
  function resultWordHandler(event) {
      console.log('clicked id : ' + event.target.value);
  }

  /*
  function final_span_Handler() {
      if(final_span.innerHTML) {
          const final_span_text = final_span.innerHTML; 
          const final_arr = final_span_text.split(' '); //["안녕하세요", "저는"]
          
          let htmlEl = null;
          final_arr.forEach((value, index) => {
              if(index === 0) {
                  htmlEl = `<span class="resultWord" id=0>` + value + '<span/>';
              }else {
                  htmlEl = htmlEl + `<span class="resultWord" id=${index}>${value}<span/> ` 
              }
          });
          
          // console.log('htmlEl : ' + htmlEl);
          
          // const resultWord = document.querySelector('.resultWord');
          // resultWord.addEventListener('click', resultWordHandler);

          final_span.innerHTML = a + htmlEl;
          a = a + htmlEl + '<br/>';
          translate = recognizedTextarea.innerHTML; // translate 변수에 총 번역본 저장
      }else {
          return null;
      }
  }
  */
  
  start();
}


export default Home;

