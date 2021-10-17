const record = document.getElementById("record")
const stop = document.getElementById("stop")
const soundClips = document.getElementById("sound-clips")
const chkHearMic = document.getElementById("chk-hear-mic")

const audioCtx = new(window.AudioContext || window.webkitAudioContext)() // 오디오 컨텍스트 정의

const analyser = audioCtx.createAnalyser()
//        const distortion = audioCtx.createWaveShaper()
//        const gainNode = audioCtx.createGain()
//        const biquadFilter = audioCtx.createBiquadFilter()

function makeSound(stream) {
    const source = audioCtx.createMediaStreamSource(stream)

    source.connect(analyser)
    //            analyser.connect(distortion)
    //            distortion.connect(biquadFilter)
    //            biquadFilter.connect(gainNode)
    //            gainNode.connect(audioCtx.destination) // connecting the different audio graph nodes together
    analyser.connect(audioCtx.destination)

}

var state = 0
var count = 0
if (navigator.mediaDevices) {
    console.log('getUserMedia supported.')

    const constraints = {
        audio: true
    }
    let chunks = []

    navigator.mediaDevices.getUserMedia(constraints)
        .then(stream => {

            const mediaRecorder = new MediaRecorder(stream)
                    
            chkHearMic.onchange = e => {
                if(e.target.checked == true) {
                    audioCtx.resume()
                    makeSound(stream)
                } else {
                    audioCtx.suspend()
                }
            }
                    
            record.onclick = () => {
                if(state == 0) {
                    mediaRecorder.start()
                    console.log(mediaRecorder.state)
                    console.log("recorder started")
                    record.style.background = "red"
                    record.style.color = "black"
                    record.innerText = "정지"
                    state = 1
                }
                else {
                    mediaRecorder.stop()
                    console.log(mediaRecorder.state)
                    console.log("recorder stopped")
                    record.style.background = ""
                    record.style.color = ""
                    record.innerText = "녹음"
                    state = 0
                    count ++
                }
            }

            /*
            stop.onclick = () => {
                mediaRecorder.stop()
                console.log(mediaRecorder.state)
                console.log("recorder stopped")
                record.style.background = ""
                record.style.color = ""
            }
            */

            mediaRecorder.onstop = e => {
                console.log("data available after MediaRecorder.stop() called.")

                // const clipName = prompt("오디오 파일 제목을 입력하세요.", "회의록 " + count)
                        
                const clipContainer = document.createElement('article')
                const clipLabel = document.createElement('p')
                const audio = document.createElement('audio')
                const deleteButton = document.createElement('button')

                clipContainer.classList.add('clip')
                audio.setAttribute('controls', '')
                deleteButton.innerHTML = "삭제"
                clipLabel.innerHTML = "회의록 " + count

                clipContainer.appendChild(clipLabel)
                clipContainer.appendChild(audio)
                clipContainer.appendChild(deleteButton)
                soundClips.appendChild(clipContainer)
                // saveSound(soundFile, 'file.mp3')
                        

                audio.controls = true
                const blob = new Blob(chunks, {
                    'type': 'audio/ogg codecs=opus'
                })
                chunks = []
                const audioURL = URL.createObjectURL(blob)
                audio.src = audioURL
                console.log("recorder stopped")

                deleteButton.onclick = e => {
                    evtTgt = e.target
                    evtTgt.parentNode.parentNode.removeChild(evtTgt.parentNode)
                }

                const blob = bucket.file(req.file.)
            }

            mediaRecorder.ondataavailable = e => {
                chunks.push(e.data)
            }
        })
        .catch(err => {
            console.log('The following error occurred: ' + err)
        })
}