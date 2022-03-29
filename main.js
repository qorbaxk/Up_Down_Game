//랜덤값으로 정답값 만들어 놓기
//사용자가 입력하는 값 받기
//사용자값이 1과 100 사이의 값일 것
//사용자값 > 정답값 down! 보여주기
//사용자값 < 정답값 up! 보여주기
//사용자값 = 정답값 정답입니다! 보여주기
//맞추고나면 게임 리셋하기
//게임의 기회는 총 5번 중간에 맞춰도 리셋, 기회를 다 써도 리셋
//같은 값을 입력하면 기회 줄지않고 다시 하라고 알림



//랜덤번호 지정
let answerNum = 0;

//document는 html, ById로 아이디 선택
let userInput = document.getElementById("user-input");
let playButton = document.getElementById("play-button");
let resetButton = document.getElementById("reset-button");
let resultArea = document.getElementById("result-area");
let chanceArea = document.getElementById("chance-area");

//기회몇번인지 저장
let chances = 5;
let gameOver = false;
//히스토리 배열 만들기
let history = [];

//버튼클릭시 play 이벤트 실행, 함수를 변수처럼 매개변수로 넘김 ()안붙이고 
playButton.addEventListener("click",play);
//리셋이벤트 실행
resetButton.addEventListener("click",reset);
//focus 두면 전에 입력한 숫자 자동으로 사라지도록함
userInput.addEventListener("focus",function(){userInput.value = "";});



//랜덤숫자 뽑기
function RandomNumber(){
    answerNum = Math.floor(Math.random()*100)+1 ;
    console.log("정답",answerNum);
}



//게임시작
function play(){

    let userValue = userInput.value;

    //유저가 범위 밖의 번호를 쓰면 알려준다 기회는 그대로 둔다
    if(userValue<1 || userValue>100){
        resultArea.textContent = "1과 100 사이의 값을 입력하세요";
        return;
    }
    //유저가 이미 입력한 숫자를 또 입력하면 알려준다. 기회는 그대로
    if(history.includes(userValue)){
        resultArea.textContent = "이미 입력한 값입니다 다른값을 입력하세요";
        return;
    }
    
    //play가 될때마다 1씩 줄어
    chances --;
    //남은기회 알려주기
    chanceArea.textContent = `남은기회: ${chances}번`;

    //유저가 랜덤번호를 맞추는 과정
    if(userValue<answerNum){
        resultArea.textContent = "올려!! UP!";
        changePic(0);
    }else if(userValue>answerNum){
        resultArea.textContent = "내려!! DOWN!";
        changePic(1);
    }else{
        resultArea.textContent = "정답!! ㅊㅋㅊㅋ";
        gameOver = true; //기회 다 쓰기 전에 맞춰도 go버튼 안눌리게
        changePic(2);
    }

    //유저가 여태까지 입력한 값을 배열에 저장
    history.push(userValue); 

    
    //기회가 0이 되면 게임오버되게
    if(chances<1){
        resultArea.textContent = `게임오버~! 정답은 ${answerNum}!`;
        gameOver = true;
        changePic(3);
    }

    //게임오버 되면 go버튼 안눌리게
    if(gameOver == true){
        playButton.disabled = true;
        
    }
}

//사진 바꾸는 함수
function changePic(idx){
    let imgTag = document.getElementById("img-area");
    if(idx == 0){ //up일때
        imgTag.setAttribute("src","https://i2.wp.com/i.giphy.com/media/DAHS9fXucRgBO/giphy.gif" );
    }else if(idx == 1){ //down일때
        imgTag.setAttribute("src","https://i.gifer.com/ahM.gif");
    }else if(idx == 2){ //정답일때
        imgTag.setAttribute("src","https://i.pinimg.com/originals/ce/49/13/ce49133a6db6014a67363409ff469952.gif");
    }else if(idx == 3){ //게임오버일때
        imgTag.setAttribute("src","https://media4.giphy.com/media/eJ4j2VnYOZU8qJU3Py/giphy.gif");
    }else{ //리셋시
        imgTag.setAttribute("src","https://blog.kakaocdn.net/dn/bG13CL/btq3GF7nKyH/MR6SQ3VAds7xYgWUdP5Ddk/img.gif");
    }
}



//리셋
function reset(){

    //input창 정리
    userInput.value = "";
    chances = 5;
    gameOver = false;
    playButton.disabled = false;
    chanceArea.textContent = `남은기회: ${chances}번`;
    resultArea.textContent = "죽기 싫다면 맞춰라";
    changePic(4);
    RandomNumber();

}

RandomNumber();