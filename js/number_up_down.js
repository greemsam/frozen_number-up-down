'use strict';

var gameState = {
  selectCharacter:true,
  gameExecute:false,
  deathCount:5,
  answerRange:{
    min:1,
    max:100
  }
}
var gameMode = {
  modeName:'',
}
var gameMessages = {
  elsa:{
    start:"엘붕이 안녕!<br>나랑 숫자 업다운 할래?<br>1~100 사이에서 내가 생각한 숫자를 맞춰봐.",
    win:"<span>헉...</span><br>내 마음을 꿰뚫어보다니 소오름...<br>",
    lost:"<span>바보!! 못 맞추겠지?</span><br>어차피 기대도 안 했어.<br>"
  },
  anna:{
    start:"안붕이 안녕!<br>나랑 숫자 업다운 할래?<br>1~100 사이에서 내가 생각한 숫자를 맞춰봐.",
    win:"<span>헉...</span><br>내 마음을 꿰뚫어보다니 소오름...<br>",
    lost:"<span>바보!! 못 맞추겠지?</span><br>어차피 기대도 안 했어.<br>"
  }
}
var statePictures = {
  elsa:{
    default:'img/default_elsa.jpg',
    win:'img/win_elsa.jpg',
    lost:'img/lost_elsa.jpg',
  },
  anna:{
    default:'img/default_anna.jpg',
    win:'img/win_anna.jpg',
    lost:'img/lost_anna.jpg',
  }
}
var messagesByMode={};
var picturesByMode={};
var randomNum;
var picture = document.querySelectorAll(".picture");
var elsaPicture = document.getElementById("elsa-pic");
var annaPicture = document.getElementById("anna-pic");
var numInputInterface = document.getElementById("number-input-interface");
var input = document.getElementById("input-num");
var gameStartBtn = document.getElementById("game-start-btn");
var submitNum = document.getElementById("submit-num");
var printInfo = document.getElementById("print-info");
var retry = document.getElementById("retry");

init();

gameStartBtn.addEventListener('click', gameStart);
submitNum.addEventListener('click', playGame);

function executeGameByEnter(){
  if (window.event.keyCode == 13) {
    playGame();
  }
}
function init(){
  initGameState();
  initSelectPic();
  initButtons();
  hideRetry();
  printInfo.innerHTML = "좋아하는 분을 선택해주세요.";
}
function initGameState(){
  gameState.selectCharacter = true;
  gameState.gameExecute = false;
  gameState.deathCount = 5;
}
function initSelectPic(){
  picture.forEach(function(item){
    item.classList.remove('selected');
    item.classList.remove('not-selected');
    item.addEventListener('click', setGameMode);
  });
  elsaPicture.setAttribute('src', 'img/default_elsa.jpg');
  annaPicture.setAttribute('src', 'img/default_anna.jpg');
}
function initButtons(){
  numInputInterface.style.display = "none";
  gameStartBtn.style.display = "none";
}
function showInput(){
  numInputInterface.style.display = "block";    
}
function hideNumInput(){
  numInputInterface.style.display = "none";
}
function setGameMode(e){
  gameState.selectCharacter = false;
  gameStartBtn.style.display = "block";
  switch(e.target){
    case elsaPicture : 
      setElsaMode('elsa');
      break;
    case annaPicture : 
      setAnnaMode('anna');
      break;
  }
}
function setElsaMode(mode){
  gameMode.modeName = mode;
  printInfo.innerHTML = gameMessages.elsa.start;
  annaPicture.classList.add('not-selected');
  elsaPicture.classList.add('selected');
  messagesByMode = gameMessages.elsa;
  picturesByMode = statePictures.elsa; 
}
function setAnnaMode(mode){
  gameMode.modeName = mode;
  printInfo.innerHTML = gameMessages.anna.start;
  elsaPicture.classList.add('not-selected');
  annaPicture.classList.add('selected');
  messagesByMode = gameMessages.anna;
  picturesByMode = statePictures.anna; 
} 
function gameStart(){
  showInput();
  generateAnswer(gameState.answerRange.min, gameState.answerRange.max);
  gameState.gameExecute = true;
  gameStartBtn.style.display = "none";
  printInfo.innerHTML = gameState.answerRange.min+" ~ "+ gameState.answerRange.max+" 사이의 숫자만 입력해.<br>기회는 딱 여섯 번이야!";
  console.log("정답: "+ randomNum); // 정답 출력
}
function generateAnswer(min, max){
  randomNum = Math.floor(Math.random() * (max - min)) + min;
}
function playGame(){
  if(gameState.gameExecute === true){
    var inputValueToNum = Number(input.value);
    printGameResult(inputValueToNum, gameState.deathCount);
    checkTry(inputValueToNum);
    input.value = '';
  }
}
function printGameResult(val, count){
  if(randomNum === val && count>=0){
    youWin(val);
  }
  else if(randomNum > val && 100 >= val && count>=0){
    printInfo.innerHTML = '<span>'+val+'? 업이야! 그거보다 커.</span><br>남은 횟수: '+count;
  }
  else if(randomNum < val && 100 >= val && count>=0){
    printInfo.innerHTML = '<span>'+val+'? 다운! 더 낮아!</span><br>남은 횟수: '+count;
  }
  else if(randomNum !== val && count<=0){
    count = 0;
    youLost();
  }
}
function checkTry(inputVal){
  if (inputVal>0 && inputVal<=100){
    gameState.deathCount--;
  }
  else{
    printInfo.innerHTML = '응? 제대로 입력한 거 맞아? <br> 1~100 사이 숫자만 입력해줘.';
  }
}
function youWin(val){
  gameState.gameExecute = false;
  hideNumInput();
  picture.forEach(function(item){
    item.setAttribute('src', picturesByMode.win);   
  }) 
  printInfo.innerHTML = messagesByMode.win+"정답: "+val;
  showRetry();
}
function youLost(){
  gameState.gameExecute = false;
  hideNumInput();
  picture.forEach(function(item){
    item.setAttribute('src', picturesByMode.lost);   
  })  
  printInfo.innerHTML = messagesByMode.lost+"정답: "+randomNum;  
  showRetry();
}
function showRetry(){
  retry.style.display = "block";
}
function hideRetry(){
  retry.style.display = "none";
}