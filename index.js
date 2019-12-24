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

// function to start the quiz
function startQuiz(){
$('.start-btn').on('click', function(e){
    e.preventDefault();
    $(".start-page").hide();
    $(".question-page").show();
})

}
//listens for user to select an item
$(".question-page form" ).on('click', 'label', function(){
    $('.selected').removeClass('selected');
    $(this).addClass('selected');
});

// listens for user to submit selection
function submitAnswer(){
$(".submit-btn").click(function(e){
    e.preventDefault();
    if($('label.selected').length){
        let userChoice = parseInt($('label.selected').attr('id'));
        console.log(userChoice);
        checkAnswer(userChoice);
    }else{
        console.log("no answer chosen")
    }
});
}
//function to display current question

function showQuestion(){
    let question = questions[currentQuestion];
    $('.question-page .form-questions').text(question.title);
    // $('.question-page form').html('');
    for(let i=0; i < question.selections.length; i++){
        $('.question-page form').append(`
        <br>
        <input type="radio" id="${i}" name="question${currentQuestion}">
        <label for=${i} id="${i}">${question.selections[i]}</label>`)
    }
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
    currentQuestion++;
    if (currentQuestion >= questions.length){
        showResults();
    }else {
    showQuestion();   
    } 
}
//function to render current score
function showResults() {
    $('.question-page').hide();
    $('.final-page').show();
    $('.final-page h2').html(`You got ${currentScore} out of ${questions.length} correct!`)
}
//function to check if answer was correct

//function to continue to next question

//function to render results page


// function to restart the quiz
// main function called to run the functions
function constQuiz(){
    startQuiz();
    showQuestion();
    submitAnswer();
}
//starting quiz on page load
$(constQuiz);