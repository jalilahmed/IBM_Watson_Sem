module.exports.stringRepeatCheck = function(string) {
  const repeats= [];
  const splitText = string.split(' ');
  splitText.forEach((x,i) => {
    const check = splitText[i + 1];
    if(x === check){
      repeats.push(
        { repeatWord: x,
          index: i}
      )
    }
  });
  return repeats;
}
