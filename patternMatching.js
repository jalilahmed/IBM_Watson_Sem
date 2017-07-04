const fs = require('fs');

module.exports.stringRepeatCheck = function(data, file) {
  const repetitions = fs.createWriteStream(file, {
    flags: 'r+',
    defaultEncoding: Buffer
  });
    const string = data;
    const repeats= [];
    const splitText = string.split(' ');
    splitText.forEach((x,i) => {
      const check = splitText[i + 1];
      if(x === check){
          repeats.push(
            { repeatWord: x,
              index: i});
        repetitions.write(x + ',' + i + '\n');
      }
    });
}
