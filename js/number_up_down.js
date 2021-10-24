'use strict';

var gameState = {
  modeName:'',
  selectCharacter:true,
  gameExecute:false,
  deathCount:5,
  answerRange:{
    min:1,
    max:100
  }
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
var characterSelect = document.getElementById("character-select");
var selectedCharacter = document.getElementById("selected-character")
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
  initCharacterSelect();
  numInputInterface.style.display = "none";
  gameStartBtn.style.display = "none";
  retry.style.display = "none";
  printInfo.innerHTML = "좋아하는 분을 선택해주세요.";
}
function initGameState(){
  gameState.selectCharacter = true;
  gameState.gameExecute = false;
  gameState.deathCount = 5;
}

function initCharacterSelect(){
  characterSelect.style.display = 'block';
  selectedCharacter.style.display = 'none';
  picture.forEach((item)=>{
    if(gameState.selectCharacter === true){
      item.addEventListener('click', setGameMode);
    }
  });
}
function setGameMode(e){
  if(gameState.selectCharacter === true){
    gameStartBtn.style.display = "block";
    switch(e.target){
      case elsaPicture : 
        modeSet('elsa');
        break;
      case annaPicture : 
        modeSet('anna');
        break;
    }
  }
  gameState.selectCharacter = false;
}
function modeSet(mode){
  gameState.modeName = mode;
  characterSelect.style.display = 'none';
  selectedCharacter.style.display = 'block'
  selectedCharacter.innerHTML = '<img class="picture" src="img/default_' + mode + '.jpg">';
  printInfo.innerHTML = gameMessages[mode].start;
  messagesByMode = gameMessages[mode];
  picturesByMode = statePictures[mode]; 
}

function gameStart(){
  gameState.gameExecute = true;
  numInputInterface.style.display = "block";  
  generateAnswer(gameState.answerRange.min, gameState.answerRange.max);
  gameStartBtn.style.display = "none";
  printInfo.innerHTML = gameState.answerRange.min+" ~ "+ gameState.answerRange.max+" 사이의 숫자만 입력해.<br>기회는 딱 여섯 번이야!";
  console.log("정답: "+ randomNum); // 정답 출력
  console.log(gameState.deathCount, gameState.gameExecute)
}
function generateAnswer(min, max){
  randomNum = Math.floor(Math.random() * (max - min)) + min;
}
function playGame(){
  if(gameState.gameExecute === true){
    var inputValueToNum = Number(input.value);
    if(gameState.deathCount > 0){
      inputValueToNum === randomNum ? showGameResult('win', inputValueToNum) : tryAgain(inputValueToNum, gameState.deathCount);
    }
    else if(gameState.deathCount <= 0){
      gameState.deathCount = 0;
      showGameResult('lost');
    }
    input.value = '';
  }
  console.log(gameState.deathCount, gameState.gameExecute)
}
function tryAgain(val, count){
  if(randomNum > val && gameState.answerRange.min <= val && gameState.answerRange.max >= val){
    gameState.deathCount--;
    printInfo.innerHTML = '<span>'+val+'? 업이야! 그거보다 커.</span><br>남은 횟수: '+count;
  }
  else if(randomNum < val && gameState.answerRange.min <= val && gameState.answerRange.max >= val){
    gameState.deathCount--;
    printInfo.innerHTML = '<span>'+val+'? 다운! 더 낮아!</span><br>남은 횟수: '+count;
  }
  else{
    printInfo.innerHTML = '응? 제대로 입력한 거 맞아? <br> 1~100 사이 숫자만 입력해줘.';
  }
}
function showGameResult(result, val = ''){
  gameState.gameExecute = false,
  selectedCharacter.childNodes[0].setAttribute('src', 'img/'+ result + '_' + gameState.modeName + '.jpg');
  numInputInterface.style.display = "none";
  retry.style.display = "block";
  switch(result){
    case 'win': printInfo.innerHTML = messagesByMode[result]+"정답: "+ val;
    break;
    case 'lost': printInfo.innerHTML = messagesByMode[result]+"정답: "+randomNum;
    break;  
  }
}