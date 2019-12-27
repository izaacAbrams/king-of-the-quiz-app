// sets the default values for the quiz

let currentScore = 0;
let currentQuestion = 0;
// array where all questions and answers are stored
let questions = [
  {
    title: "What is the name of Dale's main alter ego?",
    selections: ["Dusty Paddleford", "Rusty Shackleford", "John Redcorn",
    "Who said Dale isn't the alter ego?"],
    answer: 1
  },
  {
      title: "Who is Hank",
      selections: ["Propane salesman", "Son of propane salesman"],
      answer: 0
  }
];
let sidePicture = [{
    source: "images/hank.png", 
    alt: "Hank Hill",
},{
    source: "images/bill.png", 
    alt: "Bill from King of the Hill"
},{
    source: "images/boomhaur.png",
    alt: "Boomhaur from King of the Hill"
},{
    source: "images/dale.png",
    alt: "Dale from King of the Hill"
}]

// function to start the quiz
function startQuiz(){
$('.start-btn').on('click', function(e){
    e.preventDefault();
    $(".start-page").hide();
    $(".question-page").show();
})

}
//listens for user to select an item on the label
$(".question-page form" ).on('click', '.selections',function(){
    $('.selected').removeClass('selected');
    $(this).addClass('selected');
    if ($(this).hasClass('selected')){
        $(this).children('input').prop('checked', true);
    }else {
        $(this).children('input').removeProp('checked'); 
    }
});

// listens for user to submit selection
function submitAnswer(){
$(".submit-btn").click(function(e){
    e.preventDefault();
    if($('.selections.selected').length){
        let userChoice = parseInt($('.selections.selected').children('input').attr('id'));
        console.log(userChoice);
        checkAnswer(userChoice);
    }else{
        console.log("no answer chosen")
    }
});
}

// listens for restart button

$('.final-page button').click(function(e){
    e.preventDefault();
    restartQuiz();
});

$('.btn').on('click', makeImage());
//function to display current question

function showQuestion(){
    let question = questions[currentQuestion];
    $('.question-page form').html(`<h1 class="q-title">${question.title}</h1>`);
    $('.question-page form').append(`<div class="number-and-score">
  
    </div>`);
    for(let i=0; i < question.selections.length; i++){
        $('.question-page form').append(`
        <div class="selections">
        <input type="radio" id="${i}" name="question${currentQuestion}">
        <label for="${i}" id="${i}">${question.selections[i]}</label></div>`);
    }
    showScoreandNumber();
    // $('.question-page form').append('<br><button type="submit" class="btn submit-btn">Submit</button>')
}

function makeImage(){
    $('.question-page .side-pic').html(`<img src=
    ${sidePicture[Math.floor(Math.random() * sidePicture.length)].source} alt="${sidePicture.alt}">`);

}
//function to check answer
function checkAnswer(userChoice){
    let question = questions[currentQuestion];
    if (question.answer === userChoice){
        console.log("correct")
        currentScore++;

    }else{
        //displays correct answer when wrong 
        console.log("not correct")
    }
    //continue to next question
    currentQuestion++;
    if (currentQuestion >= questions.length){
        showResults();
    }else {
    showQuestion();   
    } 
}

//render score and question number

function showScoreandNumber(){
    $('.question-page .number-and-score').html(`<h2>Score: ${currentScore}</h2>
    <h2>Question: ${currentQuestion}/${questions.length}</h2>`);    
}

//function to render final score
function showResults() {
    $('.question-page').hide();
    $('.final-page').show();
    $('.final-page h2').html(`You got ${currentScore} out of ${questions.length} correct!`)
}

// function to restart the quiz

function restartQuiz(){
    $('.final-page').hide();
    $('.question-page').show();
    currentScore = 0;
    currentQuestion = 0;
    showQuestion();
}

// main function called to run the functions
function constQuiz(){
    startQuiz();
    showQuestion();
    showScoreandNumber();
    submitAnswer();
    makeImage();
}
//starting quiz on page load
$(constQuiz);