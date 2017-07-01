'use strict';

const SpeechToTextV1 = require('watson-developer-cloud/speech-to-text/v1');
const fs = require('fs');
const func = require('./patternMatching.js');

const speech_to_text = new SpeechToTextV1({
  username: 'a515ed5c-bcb7-4d62-90cf-6cc238c844aa',
  password: 'BoFJIyEVi0CI'
});

const params = {
  content_type: 'audio/flac',
  interim_results: true
};

// create the stream
const recognizeStream = speech_to_text.createRecognizeStream(params);

// pipe in some audio
fs.createReadStream('C:/Users/jalil/Desktop/Stuttering_Girl_Makes_A_Call.flac').pipe(recognizeStream);

// and pipe out the transcription
recognizeStream.pipe(fs.createWriteStream('transcription.txt'));

// listen for 'data' events for just the final text
// listen for 'results' events to get the raw JSON with interim results, timings, etc.

recognizeStream.setEncoding('utf8'); // to get strings instead of Buffers from `data` events

//['data', 'results', 'speaker_labels', 'error', 'close'].forEach(function(eventName) {
  //recognizeStream.on(eventName, console.log.bind(console, eventName + ' event: '));
//});
let preResultIndex  = -1;
const repetitions = [];

['data','results'].forEach(function (eventName) {
  recognizeStream.on(eventName, (x) => {
    if (eventName === 'data') {
      repetitions.push(func.stringRepeatCheck(x));
    } else if (eventName === 'result' && x.result_index !== preResultIndex){
        preResultIndex = x.result_index;
  }
    //const currentTimeStamps = x.results[0].alternatives[0].timestamps;
    //console.log(x.result_index)
    //let temp = x.results[0].alternatives[0].timestamps;

    //currentTimeStamps.forEach( (x) => {
    //  if (x[0] === '%HESITATION') {
    //    console.log('Hesitation Detected');
    //  }
    //});
  });
});