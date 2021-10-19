window.onload = function() {
    console.log('fired');
    if (typeof webkitSpeechRecognition !== 'function') {
        alert('크롬에서만 동작 합니다.');
        return false;
    }
    const recognition = new window.webkitSpeechRecognition();
    const language = 'ko-KR';
    const micBtn = document.querySelector('.mic');
    const saveBtn = document.querySelector('.save');
    const resultWrap = document.querySelector('.result');
    const recognizedTextarea = document.querySelector('.recognized-textarea');
    const recording_state = document.querySelector('#recording-state');
    
    const final_span = document.querySelector('#final_span');
    const interim_span = document.querySelector('#interim_span');

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
        recording_state.className = 'on';
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
        recording_state.className = 'off';
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
        
        final_span.innerHTML = finalTranscript;
        interim_span.innerHTML = interimTranscript;
        final_span_Handler();

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

        micBtn.classList.add();
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
        final_span.innerHTML = '';
        interim_span.innerHTML = '';
    }
    /**
     * 초기 바인딩
     */
    function resultWordHandler(event) {
        console.log('clicked id : ' + event.target.value);
    }

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
    function initialize() {
        micBtn.addEventListener('click', start);
        
        //마이크 버튼 누르면 시작
    }
    
    initialize();
}