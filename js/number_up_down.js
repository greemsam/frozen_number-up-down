'use strict';

var randomNum;
var deathCount = 0;
var gameState = false;
var selectCharacter = true;
var gameMode = '';
var picture = document.querySelectorAll(".picture");
var elsaPicture = document.getElementById("elsa-pic");
var annaPicture = document.getElementById("anna-pic");
var gameInterface = document.getElementById("game-interface");
var numInputInterface = document.getElementById("number-input-interface");
var input = document.getElementById("input-num");
var gameStartBtn = document.getElementById("game-start-btn");
var submitNum = document.getElementById("submit-num");
var printInfo = document.getElementById("print-info");
var retry = document.getElementById("retry");

elsaPicture.addEventListener('click', setElsaMode)
annaPicture.addEventListener('click', setAnnaMode)
gameStartBtn.addEventListener('click', gameStart);
submitNum.addEventListener('click', playGame);
function executeGameByEnter(){
  if (window.event.keyCode == 13) {
    playGame();
  }
}
function init(){
  gameMode = '';
  selectCharacter = true;
  gameState = false;
  deathCount = 0;
  hideRetry();
  annaPicture.style.display = "block";
  elsaPicture.style.display = "block";
  annaPicture.style.float = "right";
  elsaPicture.style.float = "left";
  printInfo.innerHTML = "좋아하는 분을 선택해주세요.";
}

function greeting(mode){
  if(selectCharacter === true){
    switch(mode){
      case '엘사' : 
        printInfo.innerHTML = "엘붕이 안녕! <br> 나랑 숫자 업앤다운 할래?"
        break;
      case '안나' : 
        printInfo.innerHTML = "안붕이 안녕! <br> 나랑 숫자 업앤다운 할래?"
        break;
    }
  }
}
function showGame(){
  gameInterface.classList.replace('off', 'on');
}
function hideGame(){
  gameInterface.classList.replace('on', 'off');
}
function showInput(){
  numInputInterface.classList.replace('off', 'on');    
}
function hideNumInput(){
  numInputInterface.classList.replace('on', 'off');
}

function setPictureCenter(){
  picture.forEach(function(item){
    item.style.float = "none";
  })
}
function setElsaMode(){
  gameMode = "엘사";
  greeting(gameMode);
  selectCharacter = false;
  annaPicture.style.display = "none";
  setPictureCenter();
  showGame();
  console.log(gameMode);
  gameStartBtn.style.display = "block";
}
function setAnnaMode(){
  gameMode = "안나";
  greeting(gameMode);
  selectCharacter = false;
  elsaPicture.style.display = "none";
  setPictureCenter();
  showGame();
  console.log(gameMode);
  gameStartBtn.style.display = "block";
} 
function gameStart(){
  gameStartBtn.style.display = "none";
  showInput();
  gameState = true;
  deathCount = 5;
  randomNum = generateRandomNum(1, 100);
  printInfo.innerHTML = "1 ~ 100 사이의 숫자만 입력해.";
  console.log("정답: "+ randomNum); // 정답 출력
}
function generateRandomNum(min, max){
  return Math.floor(Math.random() * (max - min)) + min;
}

function playGame(){
  if(gameState === true){
    var inputValueToNum = Number(input.value);
    printGameResult(inputValueToNum, deathCount);
    checkTry(inputValueToNum);
    input.value = '';
  }
}
function printGameResult(val, count){
  if(randomNum === val && count>=0){
    gameState = false;
    printInfo.innerHTML = "<span>헉!</span><br> 내 마음을 꿰뚫어보다니 진짜 소오름...<br>정답: "+val;
    hideNumInput();
    showRetry();
  }
  else if(randomNum > val && 100 >= val && count>=0){
    printInfo.innerHTML = '<span>'+val+' 이면 업이야!</span><br>남은 횟수: '+count;
  }
  else if(randomNum < val && 100 >= val && count>=0){
    printInfo.innerHTML = '<span>'+val+' 이면 다운! 더 낮아!</span><br>남은 횟수: '+count;
  }
  else if(randomNum !== val && count<=0){
    count = 0;
    gameState = false;
    printInfo.innerHTML = "바보!! 못 맞추겠지? 메롱이다!! <br> 정답은 "+randomNum+"이었지롱!";
    hideNumInput();
    showRetry();
  }
}
function checkTry(inputVal){
  if (inputVal>0 && inputVal<=100){
    deathCount--;
  }
  else{
    printInfo.innerHTML = '응? 제대로 입력한 거 맞아? <br> 1~100 사이 숫자만 입력해줘.';
  }
}
function showRetry(){
  retry.style.display = "block";
}
function hideRetry(){
  retry.style.display = "none";
}