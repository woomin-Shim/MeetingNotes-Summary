import React, { useState, useHistory, useCallback } from 'react';
import '../routes/Home.css';
import { Modal, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import io from 'socket.io-client';
import queryString from 'query-string';

let socket;

const ENDPOINT = 'http://localhost:3030';  // or ngrok forwading ip 
//const ENDPOINT = 'https://abc2-116-122-243-181.ngrok.io';  // or ngrok forwading ip 

const Timer = () => {
  const [currentState, setCurrentState] = useState(false);
  const [currentHours, setCurrentHours] = useState(0);
  const [currentMinutes, setCurrentMinutes] = useState(0);
  const [currentSeconds, setCurrentSeconds] = useState(0);

  let Time = 0;
  let cron;

  const startButton = () => {
    SpeechToText(); //음성인식, 변환 기능 호출 
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
        
          
            <a href='/SpeechtoTextEnd'>
            <button className='icon stop' onMouseOver={showDiv2} onMouseOut={hideDiv2} >
              <i className='fas fa-stop fa-2x'></i>
            </button> 
            </a>
            
          
         
        </div>
      </div>
    </div>
  );
};


/*---------------------------------------------음성 인식 ---------------------------------*/

function SpeechToText () {
  
    socket = io(ENDPOINT);
    
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
  
    recognition.continuous = false;  // mobile에서 false로 해야지 정상적인 문장 출력, web 환경은 True가 better 
    recognition.interimResults = true; 
    recognition.maxAlternatives =100;
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
        recognition.start();  // mobile 한 문장 듣고 끊기는 현상 해결 
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
                socket.emit('message', {message:finalTranscript});
            } else {
                interimTranscript += transcript;
            }
        }
        
        
  
        console.log('번역중 : ', interimTranscript);
        console.log('최종번역 : ', finalTranscript);
        
        finalTranscript=' ';
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

export default Timer;