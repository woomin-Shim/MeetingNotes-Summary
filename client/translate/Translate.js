
function onclickHandle () {
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

export default Translate;