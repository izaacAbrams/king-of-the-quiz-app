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
      title: "What is the name of Hank's guitar?",
      selections: ["Sally", "LouAnne", "Betsy", "Ladybird"],
      answer: 2
  },
  {
     title: "What brand of beer do Hank, Dale, Bill and Boomhauer drink in the alley?",
     selections: ["Bud Light", "Duff", "Alamo", "Slurm"],
     answer: 2 
  },
  {
      title: "What scares Hank in the garage when building a boat with Bobby?",
      selections: ["A snake", "A clown", "A spider", "A bat"],
      answer: 3
  },
  {
      title: "How many men does Cotten claim to have killed in the war?",
      selections: ["100", "50", "1", "None"],
      answer: 1
  },
  {
      title: "What country are Khan, Mihn, and Connie from?",
      selections: ["Laos", "England", "China", "South Korea"],
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
}];

// function to start the quiz
$('.start-btn').on('click', function(e){
    e.preventDefault();
    $('.start-page').hide();
    $('.question-page').show();
})
//listens for user to select an item on the label
$('.question-page form' ).on('click', '.selections', function(){
    $('.selected').removeClass('selected');
    $(this).addClass('selected');
    if ($(this).hasClass('selected')){
        $(this).children('input').prop('checked', true);
    }else {
        $(this).children('input').removeProp('checked'); 
    }
});
// listens for user to submit selection
$('.submit-btn').click(function(e){
    e.preventDefault();
    submitAnswer();
});
// listens for restart button
$('.final-page button').click(function(e){
    e.preventDefault();
    restartQuiz();
    makeImage();
});
$('.cont-btn').click(function(e){
    e.preventDefault();
    $('.correct-page').hide();
    $('.incorrect-page').hide();
    if (currentQuestion < questions.length){
    $('.question-page').show();
    }
})
//function to display current question

function showQuestion(){
    let question = questions[currentQuestion];
    $('.question-page form').html(`<h1 class="q-title">${question.title}</h1>`);
    $('.question-page form').append(`<div class="number-and-score"></div>`);
    for(let i=0; i < question.selections.length; i++){
        $('.question-page form').append(`<div class="selections">
        <input type="radio" id="${i}" name="question${currentQuestion}" required>
        <label for="${i}" id="${i}">${question.selections[i]}</label></div>`);
    }
    showScoreandNumber();
    makeImage();
}

function makeImage(){
    $('.question-page .side-pic').html(`<img src=
    ${sidePicture[Math.floor(Math.random() * sidePicture.length)].source} alt="King of the Hill character image" class="side-img">`);

}

function submitAnswer(){
    if($('.selections.selected').length){
        let userChoice = parseInt($('.selections.selected').children('input').attr('id'));
        console.log(userChoice);
        checkAnswer(userChoice);
     }else{
     alert("Please select an answer.")
     }
}
//function to check answer
function checkAnswer(userChoice){
    let question = questions[currentQuestion];
    let currentAnswerNumber = question.answer;
    let currentAnswer = question.selections[currentAnswerNumber];
    console.log(currentAnswer)
    if (question.answer === userChoice){
        correctPage(currentAnswer);
        $('.question-page').hide();
        $('.correct-page').show();
        currentScore++;
    }else{
        //displays correct answer when wrong 
        console.log("not correct");
        incorrectPage(currentAnswer);
        $('.question-page').hide();
        $('.incorrect-page').show();
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
    <h2>Question: ${currentQuestion + 1}/${questions.length}</h2>`);    
}

//function to render correct/incorrect screens 
function correctPage(currentAnswer){
    $('.correct-page .correct-score-number').html(`<h2>Score: ${currentScore + 1}</h2>
    <h2>Question: ${currentQuestion + 1}/${questions.length}</h2>`);
    $('.correct-page p').append(`Correct! The answer is ${currentAnswer}`);
}

function incorrectPage(currentAnswer) {
    $('incorrect-page p').html('')
    $('.incorrect-page .incorrect-score-number').html(`<h2>Score: ${currentScore}</h2>
    <h2>Question: ${currentQuestion + 1}/${questions.length}</h2>`);
    $('.incorrect-page p').html(`Incorrect! The answer is actually ${currentAnswer}`);
}
//function to render final score
function showResults() {
        $('.cont-btn').click(function(){
            $('.correct-page').hide();
            $('.incorrect-page').hide();
            $('.final-page').show();
        })
    $('.question-page').hide();
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
    showQuestion();
    showQuestion();
    showScoreandNumber();
}
//starting quiz on page load
$(constQuiz);