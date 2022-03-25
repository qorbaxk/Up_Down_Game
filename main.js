//랜덤번호 지정
let computerNum = 0;

//document는 html 자체 ById로 play-button인 아이디버튼 선택 
//getElementById으로 선택하는 것 뿐 아니라 
//getElementByClassName 클래스 이름으로도 선택 가능
//querySelector:id, class 태그 등 다양한 방식으로도 선택 된다
let playButton = document.getElementById("play-button");

//유저가 번호를 입력한다 그리고 go 라는 버튼을 누른다
//input태그의 아이디값 가져오기
let userInput = document.getElementById("user-input");

//결과 나오는 창 구역 지정
let resultArea = document.getElementById("result-area");

//리셋버튼 만들기
let resetButton = document.getElementById("reset-button");



//기회가 몇번인지 저장하기
let chances = 5;
let gameOver = false;
let chanceArea = document.getElementById("chance-area");

//히스토리 배열 만들기
let history = [];

//click 뿐 아니고 focus, mouseover등 다양한 이벤트 가능
//버튼 클릭시 play 이벤트 실행, 함수를 변수처럼 매개변수로 넘김 ()안붙이고 그냥
playButton.addEventListener("click",play);

//리셋이벤트 실행
resetButton.addEventListener("click",reset);

//숫자 쓰고 다음 숫자 넣을때 인풋에 focus 두면 알아서 전의 숫자가 사라지도록
//userinput만 쓸 것이기 때문에 간단하게 만들지 않고 익명함수로 정의함
userInput.addEventListener("focus",function(){userInput.value="";});


function pickRandomNum(){
    computerNum = Math.floor(Math.random() * 100)+1;
    //math.random()은 0부터 1 사이의 소수를 뽑는 함수
    //1은 포함되지 않아 그래서 0-99까지만 나와 그래서 +1 해야됨
    console.log("정답",computerNum);

}


//만약에 유저가 랜덤번호를 맞추면, 맞췄습니다!
//랜덤번호가 < 유저번호 Down!!
//랜덤번호가 > 유저번호 Up!!
//기회는 5번이고 다쓰면 게임이 끝난다 더이상 버튼이 disable
function play(){
    let userValue = userInput.value; //입력되는 값을 가져오는 것


//유저가 범위 밖의 번호를 쓰면 알려준다 기회는 그대로 둔다
    if(userValue<1 || userValue>100){
        resultArea.textContent="1과 100사이 숫자를 입력하세요";
        return;
    }
 //유저가 이미 입력한 숫자를 또 입력하면 알려준다. 기회는 그대로
    if(history.includes(userValue)){
        resultArea.textContent="이미 입력한 숫자입니다. 다른 숫자를 입력하세요";
        return;
    }

    chances --; //play가 될때마다 1씩 줄어
    chanceArea.textContent = `남은기회: ${chances} 번`; //남은기회 알려주기
    
    
    if(userValue < computerNum){
        resultArea.textContent = "UP!!!";
    }else if(userValue > computerNum){
        resultArea.textContent = "DOWN!!!";
    }else{
        resultArea.textContent = "정답!!!";
        gameOver=true;
    }

//유저가 여태까지 입력한 값을 배열에 저장한다
    history.push(userValue);
    console.log(history);

    if(chances < 1){
        gameOver = true;
    }


    if(gameOver == true){
        playButton.disabled = true;
    }
}

//리셋버튼을 누르면 게임이 리셋된다
function reset(){
    //user input창이 깨끗하게 정리
    userInput.value ="";
    //새로운 번호가 생성
    pickRandomNum();
    
    resultArea.textContent = "결과값이 여기 나옵니다!";
}


pickRandomNum();